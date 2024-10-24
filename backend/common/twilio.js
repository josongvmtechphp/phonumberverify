import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import twilio from 'twilio';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envfile = path.join(__dirname, '../.env');
dotenv.config({ path: envfile });

/**
 * Get twilio client instance
 */
export function getTwilioClient() {
  const accountSid = process.env.TWILLIO_ACCOUNT_SID || 'your_account_sid';
  const authToken = process.env.TWILLIO_AUTH_TOKEN || 'your_auth_token';
  return twilio(accountSid, authToken);
}
