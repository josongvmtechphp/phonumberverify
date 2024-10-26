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
 * Send verification code to entered phone number
 *
 * @param {string} verificationCode Verification code
 * @param {string} toPhone To phone number
 *
 * @return {void}
 */
async function sendSMS(verificationCode = '', toPhone = '') {
  const smsClent = getTwilioClient();
  await smsClent.messages.create({
    from: process.env.TWILIOFROMPHONE,
    to: toPhone,
    body: 'Your verification code: ' + verificationCode,
  });
}

/**
 * Handle phone number register request
 *
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The body of the request, containing user data.
 * @param {string} req.body.phoneNumber - The phone number provided by the user.
 * @param {Object} res - The Express response object.
 *
 * @return {*}
 */
async function handleRequest(req, res) {
  try {
    const phoneNumber =
      typeof req?.body?.phoneNumber === 'string' ? req.body.phoneNumber : '';
    const verificationCode = createVerificationCode();
    sendSMS(verificationCode, phoneNumber);
    const dataObj = await PhoneModal.findOne(
      { phoneNumber, isVerified: true },
      { _id: 0, phoneNumber: 1, isVerified: 1 }
    );
    if (dataObj) {
      throw new Error('This phone number is already verified.');
    }
    const phoneTbl = new PhoneModal({
      phoneNumber,
      verificationCode,
    });

    phoneTbl.save();

    res.json({
      message:
        'A verification code has been sent to your phone number. Please enter the code to proceed.',
    });
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
