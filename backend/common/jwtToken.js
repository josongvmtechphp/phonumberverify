/* eslint-disable no-undef */
/**
 * This file includes functions for handling JWT tokens
 */
import jsonwebtoken from 'jsonwebtoken';

/**
 * Create jwt token
 *
 * @param {Object} payload - The body part data for creating jwt token
 * @param {string} payload.phoneNumber - The phone number
 * @param {string} payload.id - The identifier of the record (_id)
 *
 * @return {string}
 */
export function createJwtToken(payload = {}) {
  console.log({ jwt: process.env.JWT_TOKEN_SECRET_KEY });
  return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET_KEY, {
    expiresIn: '1h',
  });
}
