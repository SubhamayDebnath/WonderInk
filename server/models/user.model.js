import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: "String",
      required: [true, "Username is required"],
      minLength: [3, "Name must be greater than 3 character long"],
      maxLength: [26, "Name must be less than 26 character long"],
      trim: true,
    },
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
    password: {
      type: "String",
      required: [true, "Password is required"],
      minLength: [6, "Password must be greater than 6 character long"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    description: {
      type: String,
    },
    socialLinks: {
      email: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },

    isSocialLinksVisible: {
      github: { type: Boolean, default: false },
      twitter: { type: Boolean, default: false },
      instagram: { type: Boolean, default: false },
      facebook: { type: Boolean, default: false },
      linkedin: { type: Boolean, default: false },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
