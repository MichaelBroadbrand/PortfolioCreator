import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },

    email: { type: String, required: true, unique: true, lowercase: true },
    displayName: { type: String, required: true },

    avatarUrl: { type: String, default: "" },
    bio: { type: String, default: "", maxlength: 500 },

    notificationPrefs: {
      contactEmails: { type: Boolean, default: true },
      weeklyDigest: { type: Boolean, default: false },
      productUpdates: { type: Boolean, default: true },
    },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },

    plan: { type: String, enum: ["free", "pro"], default: "free" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
