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
    // const smsClent = getTwilioClient();
    // await smsClent.messages.create({
    //   from: '+918281884375',
    //   to: '+919747624733',
    //   body: 'Message 1',
    // });
    const dataObj = await PhoneModal.findOne(
      { phoneNumber, isVerified: true },
      { _id: 0, phoneNumber: 1, isVerified: 1 }
    );
    console.log({ dataObj1: dataObj });
    if (dataObj) {
      throw new Error('This phone number is already verified.');
    }
    const phoneTbl = new PhoneModal({
      phoneNumber,
      verificationCode: createVerificationCode(),
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
