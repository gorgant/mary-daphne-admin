import { getSgMail } from "./config";
import * as functions from 'firebase-functions';

const sendTest = async () => {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const sgMail = getSgMail();
  const msg = {
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  const response = await sgMail.send(msg)
    .catch(error => {
      console.log('Error sending email', error);
      return error;
    });
  return response;
}

/////// DEPLOYABLE FUNCTIONS ///////

export const sendGridTest = functions.https.onCall(async (data, context) => {
  console.log('Preparing to send test email');
  const outcome = await sendTest()
    .catch(error => {
      console.log('Error with send', error);
      return error;
    });
  console.log('Test email sent', outcome);
  return {outcome}
});
