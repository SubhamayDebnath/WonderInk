import { Schema, model } from "mongoose";
const contactSchema = new Schema(
  {
    name: {
      type: "String",
      required: [true, "name is required"],
      minLength: [3, "Name must be greater than 3 character long"],
      maxLength: [26, "Name must be less than 26 character long"],
      lowercase: true,
      trim: true,
      unique: true,
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
    message: {
      type: "String",
      required: [true, "Message is required"],
    },
    isRead: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Contact = model("Contact", contactSchema);
export default Contact;
