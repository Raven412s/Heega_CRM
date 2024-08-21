"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/BasicUser.ts
var mongoose_1 = require("mongoose");
var BasicUserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true },
});
exports.default = mongoose_1.default.models.BasicUser || mongoose_1.default.model('BasicUser', BasicUserSchema);
