/**
 * phone number register and verify route module
 */
import express from 'express';
import Http from 'http';
import { getTwilioClient } from '../common/twilio.js';

const router = express.Router();

/**
 * This route is used for send phone code to input phone number
 */
router.post('/register', async function (req, res) {
  try {
    const phoneNumber =
      typeof req?.body?.phoneNumber === 'string' ? req.body.phoneNumber : '';
    const smsClent = getTwilioClient();
    await smsClent.messages.create({
      from: '+918281884375',
      to: '+919747624733',
      body: 'Message 1',
    });

    res.json({ message: 'Hi' });
  } catch (errorObj) {
    console.log({ errorObj });
    const errMsg =
      typeof errorObj?.message === 'string'
        ? errorObj.message
        : 'Error occurred';
    res.status(500).json({ message: errMsg });
  }
});

export default router;
