import mongoose from "mongoose";
;
const OTPSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // 🔥 TTL index

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export const OTPdata = mongoose.models.otps || mongoose.model("otps", OTPSchema);