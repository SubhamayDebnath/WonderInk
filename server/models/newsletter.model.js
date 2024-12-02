
import { Schema, model } from "mongoose";
const newsletterSchema = new Schema(
  {
    email: {
      type: "String",
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill valid email address",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Newsletter = model("Newsletter", newsletterSchema);
export default Newsletter;
