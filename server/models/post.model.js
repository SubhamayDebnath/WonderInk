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
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Post Category is required"],
    },
    status: {
        type: "String",
        required: [true, "Status is required"],
        enum: ['PUBLISH', 'DRAFT'],
        default:'PUBLISH'
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Post Author is required"],
    }
  },
  {
    timestamps: true,
  }
);
const Post = model("Post", postSchema);
export default Post;
