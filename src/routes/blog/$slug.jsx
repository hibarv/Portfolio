import { useRef, useState, useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import { getPostBySlug } from "../../utils/blog";

const BlogPost = () => {
  const { slug } = useParams({ strict: false });
  const [showEditor, setShowEditor] = useState(false);
  const textOne = useRef();
  const textTwo = useRef();

  const post = getPostBySlug(slug, [
    "date",
    "slug",
    "preview",
    "title",
    "tagline",
    "image",
    "content",
  ]);

  useEffect(() => {
    if (post) {
      document.title = `Blog - ${post.title}`;
    }
  }, [post]);

  useIsomorphicLayoutEffect(() => {
    stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
  }, []);

  if (!post) {
    return (
      <div className="container mx-auto mt-10">
        <Header isBlog={true} />
        <p className="mt-10">Post not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto mt-10">
        <Header isBlog={true} />
        <div className="mt-10 flex flex-col">
          <img
            className="w-full h-96 rounded-lg shadow-lg object-cover"
            src={post.image}
            alt={post.title}
          />
          <h1
            ref={textOne}
            className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold"
          >
            {post.title}
          </h1>
          <h2
            ref={textTwo}
            className="mt-2 text-xl max-w-4xl text-darkgray opacity-50"
          >
            {post.tagline}
          </h2>
        </div>
        <ContentSection content={post.content} />
        <Footer />
      </div>
      {import.meta.env.DEV && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => setShowEditor(true)} type="primary">
            Edit this blog
          </Button>
        </div>
      )}

      {showEditor && (
        <BlogEditor
          post={post}
          close={() => setShowEditor(false)}
          refresh={() => window.location.reload()}
        />
      )}
    </>
  );
};

export default BlogPost;
