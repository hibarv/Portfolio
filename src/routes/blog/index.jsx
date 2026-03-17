import { useRef, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { stagger } from "../../animations";
import Header from "../../components/Header";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/blog";
import data from "../../data/portfolio.json";

const posts = getAllPosts(["slug", "title", "image", "preview", "author", "date"]);

const Blog = () => {
  const text = useRef();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.title = "Blog";
    setMounted(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!data.showBlog) {
      navigate({ to: "/" });
      return;
    }
    stagger([text.current], { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" }, { y: 0, x: 0, transform: "scale(1)" });
    stagger([text.current], { y: 30 }, { y: 0 });
  }, []);

  if (!data.showBlog) return null;

  return (
    <>
      <div className="container mx-auto mb-10">
        <Header isBlog={true} />
        <div className="mt-10">
          <h1
            ref={text}
            className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
          >
            Blog.
          </h1>
          <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
            {posts &&
              posts.map((post) => (
                <div
                  className="cursor-pointer relative"
                  key={post.slug}
                  onClick={() => navigate({ to: `/blog/${post.slug}` })}
                >
                  <img
                    className="w-full h-60 rounded-lg shadow-lg object-cover"
                    src={post.image}
                    alt={post.title}
                  />
                  <h2 className="mt-5 text-4xl">{post.title}</h2>
                  <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                  <span className="text-sm mt-5 opacity-25">
                    {ISOToDate(post.date)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
