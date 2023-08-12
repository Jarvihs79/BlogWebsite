import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogList = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:27010/api/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, [id]);

  const getHeadingClass = (level) => {
    switch (level) {
      case 1:
        return "display-1";
      case 2:
        return "display-2";
      case 3:
        return "display-3";
      case 4:
        return "display-4";
      case 5:
        return "display-5";
      case 6:
        return "display-6";
      default:
        return "";
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-0">
         
        </div>
        <div className="col-12">
         
          <h1>{blog.title}</h1>
          {blog.blocks.map((block, index) => (
            <div key={index}>
              {block.type === "header" && (
                <React.Fragment>
                  <h3 className={getHeadingClass(block.data.level)}>
                    {block.data.text}
                  </h3>
                </React.Fragment>
              )}
              {block.type === "paragraph" && <p>{block.data.text}</p>}
              {block.type === "code" && <pre>{block.data.code}</pre>}
              {block.type === "list" && (
                <ul>
                  {block.data.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
              {block.type === "quote" && (
                <blockquote>
                  <p>{block.data.text}</p>
                  {block.data.caption && <cite>{block.data.caption}</cite>}
                </blockquote>
              )}
              {block.type === "image" && (
                <div className="text-center">
                  <img
                    src={block.data.url}
                    alt={block.data.caption}
                    className="img-fluid"
                  />
                </div>
              )}
              {block.type === "delimiter" && (
                <div className="delimiter">***</div>
              )}

            </div>
          ))}
        </div>
        <div className="col-0">
          
        </div>
      </div>
    </div>
  );
};

export default BlogList;
