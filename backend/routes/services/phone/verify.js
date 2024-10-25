/* eslint-disable no-undef */
/**
 * This file contains verify phone number codes
 */
import PhoneModal from '../../../models/phone.js';
import { createJwtToken } from '../../../common/jwtToken.js';

/**
 * Handle phone number register request
 *
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The body of the request, containing user data.
 * @param {string} req.body.phoneNumber - The phone number provided by the user.
 * @param {string} req.body.verificationCode - The verification code send by system.
 * @param {Object} res - The Express response object.
 *
 * @return {*}
 */
async function handleRequest(req, res) {
  try {
    const phoneNumber =
      typeof req?.body?.phoneNumber === 'string' ? req.body.phoneNumber : '';
    const verifyCode =
      typeof req?.body?.verificationCode === 'string'
        ? req.body.verificationCode
        : '';
    const dataObj = await PhoneModal.findOne({ phoneNumber });
    if (!dataObj || !dataObj?.createdAt) {
      throw new Error('No datas');
    }
    const date1 = dataObj?.createdAt;
    const date2 = new Date();
    let dateDiff = Math.abs(date2 - date1);
    dateDiff = Math.floor(dateDiff / (1000 * 60));
    if (dateDiff > 2) {
      throw new Error(
        'The verification code has expired. Please request a new code to proceed.'
      );
    } else if (
      !(
        typeof dataObj?.verificationCode === 'string' &&
        dataObj.verificationCode.trim() === verifyCode.trim()
      )
    ) {
      throw new Error('Please enter a valid verification code to continue.');
    } else if (dataObj?.isVerified) {
      throw new Error('This phone number has already been verified.');
    }
    await PhoneModal.updateOne({ phoneNumber }, { isVerified: true });

    res.json({
      message: 'Your phone number has been successfully verified. Thank you.',
      token: createJwtToken({ id: dataObj?._id, phoneNumber }),
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
