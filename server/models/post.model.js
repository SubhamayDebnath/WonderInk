import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    image: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String, 
      required: [true, "Post Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Post Description is required"],
    },
    content: {
      type: String, 
      required: [true, "Post Content is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, "Post Category is required"],
    },
    tags: { 
      type: [String], 
      required: [true, "Tags are required"],
    },
    isPublish: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "Post Author is required"],
    },
    slug:{
      type:String,
      required: [true, "Slug is required"],
    },
    likes: {
        type: Number,
        default: 0,
    }  
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
export default Post;
