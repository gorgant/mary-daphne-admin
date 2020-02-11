import { EmailSubscriber } from "../../../../shared-models/subscribers/email-subscriber.model";
import { getSgMail, EmailWebsiteLinks } from "../config";
import { EmailSenderAddresses, EmailSenderNames, EmailTemplateIds, EmailUnsubscribeGroupIds, EmailCategories, AdminEmailAddresses } from "../../../../shared-models/email/email-vars.model";
import { BillingDetails } from "../../../../shared-models/billing/billing-details.model";
import { currentEnvironmentType } from "../../environments/config";
import { EnvironmentTypes } from "../../../../shared-models/environments/env-vars.model";
import { MailData } from "@sendgrid/helpers/classes/mail";


export const sendSubOptInConfirmationEmail = async (subscriber: EmailSubscriber) => {
  
  console.log('Sending Sub Opt In Confirmation Email to this subscriber', subscriber.id);
  
  const sgMail = getSgMail();
  const fromEmail: string = EmailSenderAddresses.MARY_DAPHNE_NEWSLETTER;
  const fromName: string = EmailSenderNames.MARY_DAPHNE_NEWSLETTER;
  const toFirstName: string = (subscriber.publicUserData.billingDetails as BillingDetails).firstName;
  let toEmail: string;
  let bccEmail: string;
  const templateId: string = EmailTemplateIds.MARY_DAPHNE_OPT_IN_CONFIRMATION;
  const unsubscribeGroupId: number = EmailUnsubscribeGroupIds.MARY_DAPHNE_COMMUNICATIONS_STRATEGIES;
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
    trackingSettings: {
      subscriptionTracking: {
        enable: true, // Enable tracking in order to catch the unsubscribe webhook
      },
    },
    asm: {
      groupId: unsubscribeGroupId, // Set the unsubscribe group
    },
    categories
  };
  await sgMail.send(msg)
    .catch(err => console.log(`Error sending email: ${msg} because `, err));

  console.log('Email sent', msg);
}