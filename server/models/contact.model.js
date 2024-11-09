import { Schema, model } from "mongoose";
const contactSchema = new Schema(
  {
    name: {
      type: "String",
      required: [true, "name is required"],
      lowercase: true,
      trim: true,
    },
    email:{
        type: "String",
        required: [true, "email is required"],
        lowercase: true,
        trim: true,
    },
    message:{
        type: "String",
        required: [true, "message is required"],
    }
  },
  {
    timestamps: true,
  }
);
const Contact = model("Contact", contactSchema);
export default Contact;
