import { Order } from "../../../../shared-models/orders/order.model";
import { ProductEmailTemplates, EmailSenderAddresses, EmailSenderNames, EmailCategories, AdminEmailAddresses } from "../../../../shared-models/email/email-vars.model";
import { getSgMail } from "../config";
import { getProductUrlById, currentEnvironmentType } from "../../config/environments-config";
import { EnvironmentTypes } from "../../../../shared-models/environments/env-vars.model";
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import * as functions from 'firebase-functions';

const getProductEmailTemplateIdFromProductId = (order: Order): string => {
  try {
    // Fetch the template based on the product ID
    const template = ProductEmailTemplates[order.productId].templateId;
    return template;
  } catch(error) {
    functions.logger.log(`Error fetching email template from product id ${order.productId}`, error);
    return error;
  }
}

export const sendPurchaseConfirmationEmail = async (order: Order) => {

  functions.logger.log('Sending Purchase Confirmation Email to this subscriber', order.email);

  const sgMail = getSgMail();
  const fromEmail = EmailSenderAddresses.MDLS_ORDERS;
  const fromName = EmailSenderNames.MDLS_DEFAULT;
  const toFirstName = order.firstName;
  let toEmail: string;
  let bccEmail: string;
  const templateId = getProductEmailTemplateIdFromProductId(order);
  let categories: string[];
  const productUrl: string = getProductUrlById(order.productId);

  // Prevents test emails from going to the actual address used
  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      toEmail = order.email;
      categories = [EmailCategories.PURCHASE_CONFIRMATION];
      bccEmail = AdminEmailAddresses.MDLS_DEFAULT;
      break;
    case EnvironmentTypes.SANDBOX:
      toEmail = AdminEmailAddresses.MDLS_GREG_ONLY;
      categories = [EmailCategories.PURCHASE_CONFIRMATION, EmailCategories.TEST_SEND];
      bccEmail = '';
      break;
    default:
      toEmail = AdminEmailAddresses.MDLS_GREG_ONLY;
      categories = [EmailCategories.PURCHASE_CONFIRMATION, EmailCategories.TEST_SEND];
      bccEmail = '';
      break;
  }

  const msg: MailDataRequired = {
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
      orderNumber: order.orderNumber,
      productUrl
    },
    categories,
    customArgs: {
      productId: order.productId,
      orderId: order.id
    }
  };
  await sgMail.send(msg)
    .catch(err => {functions.logger.log(`Error sending email: ${msg} because:`, err); throw new functions.https.HttpsError('internal', err);});

  functions.logger.log('Email sent', msg);
}