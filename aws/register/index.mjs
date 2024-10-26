import mongoose from "mongoose";
import twilio from 'twilio';

/**
 * This is used for connecting database
 */
async function connectDb() {
  await mongoose.connect(process.env.MONGODB_URL, { authSource: "admin" });
}

/**
 * Create verification code
 *
 * @return {void}
 */
function createVerificationCode() {
  return Math.floor(10000 + Math.random() * 9000).toString();
}

/**
 * Get twilio client instance
 *
 * @return {string}
 */
export function getTwilioClient() {
    const accountSid = process.env.TWILLIO_ACCOUNT_SID || 'your_account_sid';
    const authToken = process.env.TWILLIO_AUTH_TOKEN || 'your_auth_token';
    return twilio(accountSid, authToken);
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
 * Get phone number modal
 */
function getPhoneModal() {
  const schema = new mongoose.Schema({
    phoneNumber: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  });

  return mongoose.model("phoneNumbers", schema);
}

export const handler = async (event) => {
  console.log({ event });
  try {
    const phoneNumber =
      typeof event?.body?.phoneNumber === "string"
        ? event.body.phoneNumber
        : "";
    const verificationCode = createVerificationCode();
    await connectDb();
    const PhoneModal = getPhoneModal();
    sendSMS(verificationCode);
    const dataObj = await PhoneModal.findOne(
      { phoneNumber, isVerified: true },
      { _id: 0, phoneNumber: 1, isVerified: 1 }
    );
    if (dataObj) {
      throw new Error("This phone number is already verified.");
    }
    const phoneTbl = new PhoneModal({
      phoneNumber,
      verificationCode,
    });

    phoneTbl.save();

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message:
          "A verification code has been sent to your phone number. Please enter the code to proceed.",
      }),
    };
  } catch (errorObj) {
    console.log({ errorObj });
    const errMsg =
      typeof errorObj?.message === "string"
        ? errorObj.message
        : "Error occurred";
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        message: errMsg,
      }),
    };
  }

  return response;
};
