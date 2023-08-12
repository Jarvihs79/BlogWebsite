import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Code from "@editorjs/code";
import axios from "axios";
import SimpleImage from "@editorjs/simple-image";
import Delimiter from "@editorjs/delimiter";

const availableCategories = [
  "AI",
  "ML",
  "Trending",
  "Learn",
  "Tech",
  "Web Development",
  "Cloud",
  "Cybersecurity",
];

const TextEditor = () => {
  const editorRef = useRef(null);
  const [editorInstance, setEditorInstance] = useState(null);
  const [showEditor, setShowEditor] = useState(false); 
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (showEditor) {
      const editor = new EditorJS({
        holder: editorRef.current,
        placeholder: "Write your story here...",
        tools: {
          header: {
            class: Header,
            inlineToolbar: ["link"],
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          code: {
            class: Code,
          },
          image: SimpleImage,
          delimiter: Delimiter,
        },
      });
      setEditorInstance(editor);
    }

    return () => {
      if (editorInstance) {
        editorInstance.isReady.then(() => {
          editorInstance.destroy();
        });
      }
    };
  }, [showEditor]);

  const handleSave = () => {
    if (editorInstance) {
      editorInstance.save().then((savedData) => {
        const dataToSend = {
          time: Date.now(),
          blocks: savedData.blocks,
          version: savedData.version,
          categories: selectedCategories,
        };

        axios
          .post("http://localhost:27010/api/blogs", dataToSend)
          .then((response) => {
            console.log(response.data);
            console.log(savedData);
          })
          .catch((error) => {
            console.error("Error saving content:", error);
          });
      });
    }
  };

  const handleClear = () => {
    if (editorInstance) {
      editorInstance.clear();
    }
  };

  const handleOpenEditor = () => {
    setShowEditor(true);
  };

  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((c) => c !== category)
      );
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories((prevCategories) => [...prevCategories, category]);
      }
    }
  };

  return (
    <div>
      {!showEditor && (
        <button className="btn btn-primary mt-3" onClick={handleOpenEditor}>
          Write Blog
        </button>
      )}

      {showEditor && (
        <div>
          <div className="blog-title text-center">
            <h1>My blog here</h1>
          </div>
          <div className="container d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary mt-3 mr-2" onClick={handleSave}>
              Submit
            </button>
            <button className="btn btn-secondary mt-3" onClick={handleClear}>
              Clear
            </button>
          </div>
          <div className="container p-3">
            <div className="mb-3">
              <label htmlFor="categorySelect" className="form-label">
                Select 3 categories:
              </label>
              <select
                id="categorySelect"
                className="form-select"
                multiple
                value={selectedCategories}
                onChange={(e) =>
                  setSelectedCategories(
                    Array.from(e.target.selectedOptions, (option) => option.value)
                  )
                }
              >
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Selected categories:</label>
              <div className="selected-categories">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="badge bg-primary mr-2 mb-2"
                    onClick={() => handleCategorySelection(category)}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div id="editorjs" ref={editorRef} className="border"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;






// import React, { useEffect, useRef, useState } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// import Paragraph from "@editorjs/paragraph";
// import Code from "@editorjs/code";
// import axios from "axios";
// import ImageTool from "@editorjs/image";
// import Delimiter from "@editorjs/delimiter";
// const SimpleImage = require('@editorjs/simple-image');

// const TextEditor = () => {
//   const editorRef = useRef(null);
//   const [editorInstance, setEditorInstance] = useState(null);
//   const [showEditor, setShowEditor] = useState(false); // Track editor visibility

//   useEffect(() => {
//     if (showEditor) {
//       const editor = new EditorJS({
//         holder: editorRef.current,
//         placeholder: "Write your story here... ",
//         tools: {
//           header: {
//             class: Header,
//             inlineToolbar: ["link"],
//           },
//           list: {
//             class: List,
//             inlineToolbar: true,
//           },
//           quote: {
//             class: Quote,
//             inlineToolbar: true,
//             config: {
//               quotePlaceholder: "Enter a quote",
//               captionPlaceholder: "Quote's author",
//             },
//           },
//           paragraph: {
//             class: Paragraph,
//             inlineToolbar: true,
//           },
//           code: {
//             class: Code,
//           },
//           image: {
//             class: SimpleImage,
           
//           },
//           delimiter: {
//             class: Delimiter,
//           },
//         },
//       });
//       setEditorInstance(editor);
//     }

//     return () => {
//       if (editorInstance) {
//         editorInstance.isReady.then(() => {
//           editorInstance.destroy();
//         });
//       }
//     };
//   }, [showEditor]);

//   const handleSave = () => {
//     if (editorInstance) {
//       editorInstance.save().then((savedData) => {
//         axios
//           .post("http://localhost:27010/api/blogs", savedData)
//           .then((response) => {
//             console.log(response.data);
//             console.log(savedData);
//           })
//           .catch((error) => {
//             console.error("Error saving content:", error);
//           });
//       });
//     }
//   };

//   const handleClear = () => {
//     if (editorInstance) {
//       editorInstance.clear();
//     }
//   };

//   const handleOpenEditor = () => {
//     setShowEditor(true);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
  
//     // Create a FormData object to send the file to the server
//     const formData = new FormData();
//     formData.append("image", file);
  
//     // Send the image data to the server using axios or your preferred HTTP library
//     axios
//       .post("http://localhost:27010/api/blogs/image", formData)
//       .then((response) => {
//         const imageUrl = response.data.file.filename;
  
//         // Insert the image into the editor at the current selection or cursor position
//         if (editorInstance) {
//           editorInstance
//             .getBlockSelection()
//             .insert(imageUrl, { type: "image" });
//         }
//       })
//       .catch((error) => {
//         console.error("Error uploading image:", error);
//       });
//   };
  

//   return (
//     <div>
//       {!showEditor && ( // Render the button if editor is not visible
//         <button className="btn btn-primary mt-3" onClick={handleOpenEditor}>
//           Write Blog
//         </button>
//       )}

//       {showEditor && ( // Render the editor if it's visible
//         <div>
//           <div className="blog-title text-center">
//             <h1>My blog here</h1>
//           </div>
//           <div className="container d-grid gap-2 d-md-flex justify-content-md-end">
//             <button className="btn btn-primary mt-3 mr-2" onClick={handleSave}>
//               Submit
//             </button>
//             <button className="btn btn-secondary mt-3" onClick={handleClear}>
//               Clear
//             </button>
//             <input
//               type="file"
//               id="imageUploader"
//               style={{ display: "none" }}
//               onChange={handleImageUpload}
//             />
//           </div>
//           <div className="container p-3">
//             <div id="editorjs" ref={editorRef} className="border"></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextEditor;


