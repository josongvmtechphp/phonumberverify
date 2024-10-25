/* eslint-disable no-undef */
/**
 * This file contains phone number register codes
 */
import PhoneModal from '../../../models/phone.js';

/**
 * Create verification code
 *
 * @return {void}
 */
function createVerificationCode() {
  return Math.floor(10000 + Math.random() * 9000).toString();
}

/**
 * Handle input request
 *
 * @param {*} req Request object
 * @param {*} res Response object
 *
 * @return {any}
 */
async function handleRequest(req, res) {
  try {
    const phoneNumber =
      typeof req?.body?.phoneNumber === 'string' ? req.body.phoneNumber : '';
    // const smsClent = getTwilioClient();
    // await smsClent.messages.create({
    //   from: '+918281884375',
    //   to: '+919747624733',
    //   body: 'Message 1',
    // });
    const phoneTbl = new PhoneModal({
      phoneNumber,
      verificationCode: createVerificationCode,
    });

    phoneTbl.save();

    res.json({ message: 'Verification code send to your phone number' });
  } catch (errorObj) {
    console.log({ errorObj });
    const errMsg =
      typeof errorObj?.message === 'string'
        ? errorObj.message
        : 'Error occurred';
    res.status(500).json({ message: errMsg });
  }
}

export default handleRequest;
