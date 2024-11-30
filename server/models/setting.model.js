import { Schema, model } from "mongoose";
const settingSchema = new Schema(
  {
    post: {
        latestPostNumber:{
            type:String,
            default:'6'
        },
        postNumber:{
            type:String,
            default:'6'
        }
    },
    side: {
        categoryNumber:{
            type:String,
            default:'6'
        },
        tagNumber:{
            type:String,
            default:'6'
        }
    },
    dashboard: {
        postNumber:{
            type:String,
            default:'6'
        },
        categoryNumber:{
            type:String,
            default:'6'
        },
        userNumber:{
            type:String,
            default:'6'
        }
    },

  },
  {
    timestamps: true,
  }
);
const Setting = model("Setting", settingSchema);
export default Setting;
