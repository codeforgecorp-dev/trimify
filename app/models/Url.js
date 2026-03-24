import mongoose from 'mongoose';
const UrlSchema = new mongoose.Schema({
  username: { type: String, default: null },
  LongUrl: { type: String, required: true },
  ShortName: { type: String, required: true, unique: true },
  fullShortUrl: { type: String, required: true },
  time: String,
  date: String,
  clicks: {
    type: Number,
    default: 0,
  },
  analytics: [
    {
      timestamp: { type: String, default: null },
      Browser: { type: String, default: null },
      Device: { type: String, default: null },
      City: { type: String, default: null },
      countryFlag: { type: String, default: null },
      countryCode: { type: String, default: null },
      countryName: { type: String, default: null },
      IP: { type: String, default: null },
    }
  ],
  utm: {
    source: { type: String, default: null, },
    source_raw: { type: String, default: null, },
    medium: { type: String, default: null, },
    medium_raw: { type: String, default: null, },
    campaign: { type: String, default: null },
    campaign_raw: { type: String, default: null }
  },
  Password:{ type: String, default: null },
  passwordProtected: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: String, default: null },
  maxClicks: { type: Number, default: null},
});
export const Url = mongoose.models.Url || mongoose.model("Url", UrlSchema);
