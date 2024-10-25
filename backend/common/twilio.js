/* eslint-disable no-undef */
import twilio from 'twilio';

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
