import Post from '../model/post.js';

export const newBlog = async (request, response) => {
  try {
    const contentData = request.body;
    const editorContent = new Post(contentData);
    const savedContent = await editorContent.save();
    console.log('Content saved to MongoDB:', savedContent);
    response.status(200).json({ message: 'Content saved successfully' });
  } catch (error) {
    console.error('Error saving content:', error);
    response.status(500).json({ message: 'Error saving content' });
  }
};

export const getBlogs = async (request, response) => {
  try {
    const blogs = await Post.find();
    response.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    response.status(500).json({ message: "Error fetching blogs" });
  }
};

export const getBlogById = async (request, response) => {
  try {
    const { id } = request.params;
    const blog = await Post.findById(id);

    if (!blog) {
      return response.status(404).json({ message: 'Blog not found' });
    }

    response.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    response.status(500).json({ message: 'Server error' });
  }
};








