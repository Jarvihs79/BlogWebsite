import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import image1 from "./blkmndy.png";
import image2 from "./peshwa1.png";
const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:27010/api/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const categories = ["Trending", "Learn"];

  return (
    <div className="container">
      <div className="row mb-4">
        <div className=" d-flex align-items-center justify-content-center flex-column">
          <h1 className="display-1 custom-heading">Indian AI Learner</h1>
          <img
            src={image2}
            alt="Image 2"
            className="img-fluid mt-3 img-thumbnail"
            style={{ maxWidth: "250px" }}
          />
        </div>

        
      </div>
      {categories.map((category, index) => (
        <section key={index} className="py-5">
          <div className="container">
            <h2 className="mb-4">{category}</h2>
            <div className="row">
              <div className="col">
                <BlogCards blogs={blogs} category={category} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

const BlogCards = ({ blogs, category }) => {
  const filteredBlogs = blogs.filter((blog) =>
    blog.categories.includes(category)
  );

  const renderImage = (blog) => {
    if (
      blog.blocks.length > 2 &&
      blog.blocks[2].type === "image" &&
      blog.blocks[2].data.url
    ) {
      return (
        <img
          src={blog.blocks[2].data.url}
          className="card-img-top"
          alt="Blog Image"
        />
      );
    } else {
      return (
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/292/755/original/colorful-website-url-icon-set-free-vector.jpg"
          className="card-img-top"
          alt="Custom Image"
        />
      );
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
  };

  return (
    <div className="row">
      {filteredBlogs.map((blog) => (
        <div key={blog._id} className="col-lg-2 col-md-4 col-sm-6 mb-3">
          <a href={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
            <div className="card">
              {renderImage(blog)}
              <div className="card-body">
                <div className="category-buttons">
                  {blog.categories.map((category, index) => (
                    <button
                      key={index}
                      className="category-button"
                      style={{ borderRadius: "16px" }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <h5 className="card-title">
                  {truncateText(blog.blocks[0].data.text, 30)}
                </h5>
                {blog.blocks.map((block, index) => {
                  if (
                    index === 0 ||
                    (block.type === "header" && block.data.level === 1)
                  ) {
                    return null; 
                  }

                  if (block.type === "paragraph" && index === 1) {
                    return (
                      <p key={index} className="card-text">
                        {truncateText(block.data.text, 80)}
                      </p>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Home;
