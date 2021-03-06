import { EmailEvent } from "../../../shared-models/email/email-event.model";
import { EmailRecord, EmailRecordWithClicks } from "../../../shared-models/email/email-record.model";
import { adminFirestore } from "../config/db-config";
import { AdminCollectionPaths } from "../../../shared-models/routes-and-paths/fb-collection-paths";
import { EmailEventType } from "../../../shared-models/email/email-event-type.model";
import { EmailSubscriber } from '../../../shared-models/subscribers/email-subscriber.model';
import { now } from 'moment';
import { UnsubscribeRecord } from '../../../shared-models/subscribers/group-unsubscribe-record.model';
import * as functions from 'firebase-functions';

let eventKey: EmailEventType | string;


// Update email record with clicks
const handleClickEvent = async (emailRecordDocRef: FirebaseFirestore.DocumentReference): Promise<Partial<EmailRecordWithClicks>> => {
  const emailRecordDoc = await emailRecordDocRef.get()
    .catch(err => {functions.logger.log(`Failed to fetch email record doc from admin database:`, err); throw new functions.https.HttpsError('internal', err);});
  const emailRecordData: EmailRecordWithClicks = emailRecordDoc.data() as EmailRecord;
  const emailRecordClickUpdates: Partial<EmailRecordWithClicks> = {};
  functions.logger.log('Click type detected, fetched this email record data', emailRecordData);

  // If click data exists, add a click count and modify key
  if (emailRecordData.clickCount) {
    functions.logger.log(`Click exists with ${emailRecordData.clickCount} click(s), adding new click data`,)
    const updatedClickCount = emailRecordData.clickCount + 1;
    emailRecordClickUpdates.clickCount = updatedClickCount;
    eventKey = `click_${updatedClickCount}`;
  } else {
    functions.logger.log('No click exists, setting click to 1');
    emailRecordClickUpdates.clickCount = 1;
  }

  // Update the email record with the click data
  return emailRecordClickUpdates;
}

// If group unsubscribe, add that to subscriber data
const handleGroupUnsubscribe = async (rawEventData: EmailEvent, subDocRef: FirebaseFirestore.DocumentReference) => {
  functions.logger.log('Group unsubscribe detected');
  
  const groupUnsubscribeObject: UnsubscribeRecord = {
    unsubscribeDate: now(),
    asm_group_id: rawEventData.asm_group_id
  }
  const unsubGroupId: number = groupUnsubscribeObject.asm_group_id as number;
  const subscriberUpdates: Partial<EmailSubscriber> = {
    groupUnsubscribes: {
      [unsubGroupId]: groupUnsubscribeObject
    }
  };

  functions.logger.log('Updating subscriber with group unsubscribe', subscriberUpdates);
  await subDocRef.set(subscriberUpdates, {merge: true}) // Set {merge: true} in case the subscriber doesn't exist yet
    .catch(err => {functions.logger.log(`Failed to update subscriber in admin database:`, err); throw new functions.https.HttpsError('internal', err);});
}

// If group resubscribe, remove that from subscriber data
const handleGroupResubscribe = async (rawEventData: EmailEvent, subDocRef: FirebaseFirestore.DocumentReference) => {
  const subscriberDoc = await subDocRef.get()
    .catch(err => {functions.logger.log(`Failed to fetch subscriber doc from admin database:`, err); throw new functions.https.HttpsError('internal', err);});
  const subscriberData: EmailSubscriber = subscriberDoc.data() as EmailSubscriber;
  functions.logger.log('Group resubscribe type detected, fetched this email record data', subscriberData);
  const unsubGroupId: number = rawEventData.asm_group_id as number;

  const updatedSubscriber = {
    ...subscriberData,
  }

  // Delete the specific group unsubscribe record from the subscriber
  delete updatedSubscriber.groupUnsubscribes![unsubGroupId];
  // Check if global unsubscribe, if exists, remove it
  if (updatedSubscriber.globalUnsubscribe) {
    delete updatedSubscriber.globalUnsubscribe;
  }

  functions.logger.log('Updating subscriber with group resubscribe', updatedSubscriber);
  await subDocRef.set(updatedSubscriber) // No merge here because purposefully removing the gropuUnsubscribe value (if merge it wouldn't get removed)
    .catch(err => {functions.logger.log(`Failed to update subscriber in admin database:`, err); throw new functions.https.HttpsError('internal', err);});
}

// If global unsubscribe, add that to subscriber data and remove optIn designation
const handleGlobalUnsubscribe = async (subDocRef: FirebaseFirestore.DocumentReference) => {
  functions.logger.log('Global unsubscribe detected');
  
  const globalUnsubscribeObject: UnsubscribeRecord = {
    unsubscribeDate: now(),
  }
  const subscriberUpdates: Partial<EmailSubscriber> = {
    globalUnsubscribe: globalUnsubscribeObject,
    optInConfirmed: false
  };
  
  functions.logger.log('Updating subscriber with global unsubscribe', subscriberUpdates);
  await subDocRef.set(subscriberUpdates, {merge: true})
    .catch(err => {functions.logger.log(`Failed to update subscriber in admin database:`, err); throw new functions.https.HttpsError('internal', err);});
}

const executeActions = async (emailEvents: EmailEvent[]) => {

  const subId = emailEvents[0].email;
  const recordId = emailEvents[0].sg_message_id;

  const db = adminFirestore;
  const subDocRef: FirebaseFirestore.DocumentReference = db.collection(AdminCollectionPaths.SUBSCRIBERS).doc(subId);
  const emailRecordDocRef: FirebaseFirestore.DocumentReference = subDocRef.collection(AdminCollectionPaths.EMAIL_RECORDS).doc(recordId);

  // Log all events provided by webhook
  const logEvents = emailEvents.map( async rawEventData => {
    let emailRecordUpdates: Partial<EmailRecordWithClicks> = {};
    eventKey = rawEventData.event as EmailEventType;

    // Handle event-specific actions
    switch (eventKey) {
      case EmailEventType.CLICK:
        emailRecordUpdates = await handleClickEvent(emailRecordDocRef);
        break;
      case EmailEventType.GROUP_UNSUBSCRIBE:
        await handleGroupUnsubscribe(rawEventData, subDocRef);
        break;
      case EmailEventType.GROUP_RESUBSCRIBE:
        await handleGroupResubscribe(rawEventData, subDocRef);
        break;
      case EmailEventType.UNSUBSCRIBE:
        await handleGlobalUnsubscribe(subDocRef);
        break;
      default:
        break;
    }
    
    // Add the event to the updated email record
    functions.logger.log('Updating record using this event key', eventKey);
    emailRecordUpdates[eventKey as EmailEventType] = rawEventData;

    // Update the email record in database
    functions.logger.log('Updating email record with this event object', emailRecordUpdates);
    
    return emailRecordDocRef.set(emailRecordUpdates, {merge: true})
      .catch(err => {functions.logger.log(`Error updating email record with this event object ${emailRecordUpdates}:`, err); throw new functions.https.HttpsError('internal', err);});
;
  });

  const res = await Promise.all(logEvents);
  functions.logger.log('All events logged in email record', res);

  return res;
}




/////// CORE FUNCTION ///////

export const updateEmailRecord = async (emailEvents: EmailEvent[]) => {

  if (emailEvents.length < 1) {
    return 'No events in email record';
  }

  return executeActions(emailEvents);
}