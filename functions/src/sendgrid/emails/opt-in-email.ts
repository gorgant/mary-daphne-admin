import { EmailSubscriber } from "../../../../shared-models/subscribers/email-subscriber.model";
import { getSgMail, EmailWebsiteLinks } from "../config";
import { EmailSenderAddresses, EmailSenderNames, EmailTemplateIds, EmailCategories, AdminEmailAddresses } from "../../../../shared-models/email/email-vars.model";
import { BillingDetails } from "../../../../shared-models/billing/billing-details.model";
import { currentEnvironmentType } from "../../config/environments-config";
import { EnvironmentTypes } from "../../../../shared-models/environments/env-vars.model";
import { MailData } from "@sendgrid/helpers/classes/mail";
import * as functions from 'firebase-functions';


export const sendSubOptInConfirmationEmail = async (subscriber: EmailSubscriber) => {
  
  functions.logger.log('Sending Sub Opt In Confirmation Email to this subscriber', subscriber.id);
  
  const sgMail = getSgMail();
  const fromEmail: string = EmailSenderAddresses.MARY_DAPHNE_NEWSLETTER;
  const fromName: string = EmailSenderNames.MARY_DAPHNE_NEWSLETTER;
  const toFirstName: string = (subscriber.publicUserData.billingDetails as BillingDetails).firstName;
  let toEmail: string;
  let bccEmail: string;
  const templateId: string = EmailTemplateIds.MARY_DAPHNE_OPT_IN_CONFIRMATION;
  let categories: string[];
  const optInConfirmationUrl = `${EmailWebsiteLinks.OPT_IN_CONFIRMATION_URL_NO_PARAMS}/${subscriber.publicUserData.id}/${subscriber.id}`;
  
  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      toEmail = subscriber.id;
      categories = [EmailCategories.OPT_IN_CONFIRMATION, EmailCategories.MARKETING_NEWSLETTER];
      bccEmail = AdminEmailAddresses.MARY_DAPHNE_DEFAULT;
      break;
    case EnvironmentTypes.SANDBOX:
      toEmail = AdminEmailAddresses.MARY_DAPHNE_GREG_ONLY;
      categories = [EmailCategories.OPT_IN_CONFIRMATION, EmailCategories.MARKETING_NEWSLETTER, EmailCategories.TEST_SEND];
      bccEmail = '';
      break;
    default:
      toEmail = AdminEmailAddresses.MARY_DAPHNE_GREG_ONLY;
      categories = [EmailCategories.OPT_IN_CONFIRMATION, EmailCategories.MARKETING_NEWSLETTER, EmailCategories.TEST_SEND];
      bccEmail = '';
      break;
  }

  const msg: MailData = {
    to: {
      email: toEmail,
      name: toFirstName
    },
    from: {
      email: fromEmail,
      name: fromName,
    },
    bcc: bccEmail,
    templateId,
    dynamicTemplateData: {
      firstName: toFirstName, // Will populate first name greeting if name exists
      optInConfirmationUrl // Unique to subscriber
    },
    categories
  };
  await sgMail.send(msg)
    .catch(err => {functions.logger.log(`Error sending email: ${msg} because:`, err); throw new functions.https.HttpsError('internal', err);});

  functions.logger.log('Email sent', msg);
}