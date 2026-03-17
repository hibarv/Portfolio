import { useState } from "react";
import { useTheme } from "next-themes";
import DatePicker from "react-datepicker";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../Button";

import "react-datepicker/dist/react-datepicker.css";

const BlogEditor = ({ post, close, refresh }) => {
  const { theme } = useTheme();
  const [currentTabs, setCurrentTabs] = useState("BLOGDETAILS");
  const [blogContent, setBlogContent] = useState(post.content);
  const [blogVariables, setBlogVariables] = useState({
    date: post.date,
    title: post.title,
    tagline: post.tagline,
    preview: post.preview,
    image: post.image,
  });

  const savePost = () => {
    alert(
      "Direct saving is not available in a static deployment.\nEdit the markdown files in src/posts/ directly and redeploy."
    );
  };

  return (
    <div
      className={`fixed z-10 w-screen h-screen overflow-auto top-0 flex flex-col items-center ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="container my-20">
        <div className="mt-10">
          <div className="z-10 sticky top-12">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl">{blogVariables.title}</h1>
              <div className="flex items-center">
                <Button onClick={savePost} type="primary">
                  Save
                </Button>
                <Button onClick={close}>Close</Button>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                onClick={() => setCurrentTabs("BLOGDETAILS")}
                type={currentTabs === "BLOGDETAILS" ? "primary" : undefined}
              >
                Blog Details
              </Button>
              <Button
                onClick={() => setCurrentTabs("CONTENT")}
                type={currentTabs === "CONTENT" ? "primary" : undefined}
              >
                Content
              </Button>
            </div>
          </div>
        </div>
        {currentTabs === "BLOGDETAILS" && (
          <div className="mt-10">
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Date</label>
              <DatePicker
                selected={new Date(blogVariables.date)}
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                onChange={(date) =>
                  setBlogVariables({ ...blogVariables, date: date.toISOString() })
                }
              />
            </div>
            {[
              { label: "Title", field: "title" },
              { label: "Tagline", field: "tagline" },
            ].map(({ label, field }) => (
              <div key={field} className="mt-5 flex flex-col items-center">
                <label className="w-full text-sx opacity-50">{label}</label>
                <input
                  value={blogVariables[field]}
                  onChange={(e) =>
                    setBlogVariables({ ...blogVariables, [field]: e.target.value })
                  }
                  className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                  type="text"
                />
              </div>
            ))}
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Preview (SEO)</label>
              <textarea
                value={blogVariables.preview}
                onChange={(e) =>
                  setBlogVariables({ ...blogVariables, preview: e.target.value })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
              />
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Image</label>
              <input
                value={blogVariables.image}
                onChange={(e) =>
                  setBlogVariables({ ...blogVariables, image: e.target.value })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              />
            </div>
          </div>
        )}

        {currentTabs === "CONTENT" && (
          <div className="mt-10">
            <div className="flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Content</label>
              <TextareaAutosize
                className="w-full h-auto mt-5 p-4 border hover:border-blue-400 rounded-xl shadow-xl"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
