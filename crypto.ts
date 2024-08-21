import * as crypto from 'crypto';

function generateJwtSecret() {
  return crypto.randomBytes(32).toString('hex');
}

const secret = generateJwtSecret();
console.log(`JWT secret: ${secret}`);
