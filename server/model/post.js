import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
  blocks: {
    type: Array,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;














// import mongoose from 'mongoose';

// const PostSchema = mongoose.Schema({
//     time: {
//         type: Number,
//         required: true,
//       },
//       blocks: {
//         type: Array,
//         required: true,
//       },
//       version: {
//         type: String,
//         required: true,
//       },
// });


// const post = mongoose.model('post', PostSchema);

// export default post;
