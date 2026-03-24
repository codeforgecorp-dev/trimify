import mongoose from 'mongoose';
const TransactionSchema = new mongoose.Schema({
  transactionID: {
    type: String,
    unique: true,
    sparse: true
    // removed default: null
  },
  customerID: {
    type: String,
    unique: true,
    sparse: true
  },
  email: { type: String },
  transactionStatus: { type: String },
  amountPaid: { type: Number },
  currency: { type: String },
  premiumGranted: { type: Boolean, default: false },
}, { timestamps: true });
const Transactions= mongoose.models.Transactions || mongoose.model('Transactions', TransactionSchema);
export default Transactions;
