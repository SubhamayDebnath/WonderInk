import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    postImage:{
        public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
        },
    }
    ,postTitle: {
      type: "String",
      required: [true, "Post Title is required"],
      trim: true,
    },
    postContent:{
        type: "String",
        required: [true, "Post Content is required"],
    },
    postCategory:{
        type: "String",
        required: [true, "Post Category is required"],
    },
    tags: {
        type: [String],
        default: [],
    },
    status: {
        type: "String",
        enum: ['PUBLISH', 'DRAFT']
    },
    author:{
        type: "String",
        required: [true, "Post Author is required"],
    }
  },
  {
    timestamps: true,
  }
);
const Post = model("Post", postSchema);
export default Post;
