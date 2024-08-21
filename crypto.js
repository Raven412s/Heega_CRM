"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
function generateJwtSecret() {
    return crypto.randomBytes(32).toString('hex');
}
var secret = generateJwtSecret();
console.log("JWT secret: ".concat(secret));
