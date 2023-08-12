import express from 'express';

import { newBlog , getBlogs, getBlogById } from '../controller/post-controller.js';
import { uploadImage } from '../controller/image-controller.js';

const router = express.Router();

router.post('/api/blogs', newBlog);
router.post('/api/blogs/image', uploadImage);
router.get("/api/blogs", getBlogs);
router.get('/api/blogs/:id', getBlogById); 

export default router;