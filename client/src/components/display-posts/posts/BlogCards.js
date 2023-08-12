import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogCards = () => {
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

  const renderImage = (blog) => {
    if (blog.blocks.length > 2 && blog.blocks[2].type === "image" && blog.blocks[2].data.url) {
      return <img src={blog.blocks[2].data.url} className="card-img-top" alt="Blog Image" />;
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
      {blogs.map((blog) => (
        <div key={blog._id} className="col-lg-2 col-md-4 col-sm-6 mb-3">
          <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
            <div className="card">
              {renderImage(blog)}
              <div className="card-body">
                <div className="category-buttons">
                  {blog.categories.map((categories, index) => (
                    <button key={index} className="category-button">
                      {categories}
                    </button>
                  ))}
                </div>
                <h5 className="card-title">{truncateText(blog.blocks[0].data.text, 30)}</h5>
                {blog.blocks.map((block, index) => {
                  if (index === 0 || (block.type === "header" && block.data.level === 1)) {
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
          </Link>
        </div>
      ))}
    </div>
  );
  
  

  // return (
  //   <div className="row">
  //     {blogs.map((blog) => (
  //       <div key={blog._id} className="col-lg-2 col-md-4 col-sm-6 mb-3">
  //         <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
  //           <div className="card">
  //             {renderImage(blog)}
  //             <div className="card-body">
  //               <h5 className="card-title">{truncateText(blog.blocks[0].data.text, 30)}</h5>
  //               {blog.blocks.map((block, index) => {
  //                 if (index === 0 || (block.type === "header" && block.data.level === 1)) {
  //                   return null; // Skip the first block (title) and headers with level 1
  //                 }

  //                 if (block.type === "paragraph" && index === 1) {
  //                   return (
  //                     <p key={index} className="card-text">
  //                       {truncateText(block.data.text, 80)}
  //                     </p>
  //                   );
  //                 }

  //                 return null;
  //               })}
  //             </div>
  //           </div>
  //         </Link>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default BlogCards;















