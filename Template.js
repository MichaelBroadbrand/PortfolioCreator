import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Developer", "Designer", "Freelancer", "Minimal", "Creative"],
      required: true,
    },

    description: { type: String, default: "" },

    thumbnailUrl: { type: String, required: true },

    popularityScore: { type: Number, default: 0 },

    themeDefaults: {
      mode: { type: String, enum: ["light", "dark"], default: "light" },

      colors: {
        primary: { type: String, default: "#3b82f6" },
        secondary: { type: String, default: "#6366f1" },
        accent: { type: String, default: "#f59e0b" },
        background: { type: String, default: "#ffffff" },
        text: { type: String, default: "#111827" },
      },

      typography: {
        headingFont: { type: String, default: "Inter" },
        bodyFont: { type: String, default: "DM Sans" },
      },

      spacing: {
        density: { type: String, enum: ["compact", "normal", "spacious"], default: "normal" },
      },
    },

    sectionStructure: [
      {
        type: { type: String, required: true }, // hero, about, projects...
        isRequired: { type: Boolean, default: false },
        isVisible: { type: Boolean, default: true },
        order: { type: Number, required: true },
        defaultContent: { type: mongoose.Schema.Types.Mixed, default: {} },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);
