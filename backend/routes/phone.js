/* eslint-disable new-cap */
/**
 * phone number register and verify route module
 */
import express from 'express';
import handleRegister from './services/phone/register.js';
import handleVerify from './services/phone/verify.js';

const router = express.Router();

// sending verification code to input phone number
router.post('/register', handleRegister);
router.post('/verify', handleVerify);

export default router;
