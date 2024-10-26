import mongoose from "mongoose";

/**
 * This is used for connecting database
 */
async function connectDb() {
  await mongoose.connect(process.env.MONGODB_URL, { authSource: "admin" });
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
  try {
    const phoneNumber =
      typeof event?.body?.phoneNumber === "string"
        ? event.body.phoneNumber
        : "";
    const verifyCode =
      typeof event?.body?.verificationCode === "string"
        ? event.body.verificationCode
        : "";
    await connectDb();
    const PhoneModal = getPhoneModal();
    const dataObj = await PhoneModal.findOne({ phoneNumber });
    if (!dataObj || !dataObj?.createdAt) {
      throw new Error("No datas");
    }
    const date1 = dataObj?.createdAt;
    const date2 = new Date();
    let dateDiff = Math.abs(date2 - date1);
    dateDiff = Math.floor(dateDiff / (1000 * 60));
    if (dateDiff > 2) {
      throw new Error(
        "The verification code has expired. Please request a new code to proceed."
      );
    } else if (
      !(
        typeof dataObj?.verificationCode === "string" &&
        dataObj.verificationCode.trim() === verifyCode.trim()
      )
    ) {
      throw new Error("Please enter a valid verification code to continue.");
    } else if (dataObj?.isVerified) {
      throw new Error("This phone number has already been verified.");
    }
    await PhoneModal.updateOne({ phoneNumber }, { isVerified: true });

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
