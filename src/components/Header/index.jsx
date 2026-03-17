import { useTheme } from "next-themes";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "../Button";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { name, showBlog, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Mobile nav */}
      <div className="block tablet:hidden mt-5">
        <div className="flex items-center justify-between p-2 laptop:p-0">
          <h1
            onClick={() => navigate({ to: "/" })}
            className="font-medium p-2 laptop:p-0 link cursor-pointer"
          >
            {name}.
          </h1>

          <div className="flex items-center">
            {data.darkMode && mounted && (
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                  alt="theme toggle"
                />
              </Button>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2"
            >
              <img
                className="h-5"
                src={`/images/${
                  !menuOpen
                    ? theme === "dark"
                      ? "menu-white.svg"
                      : "menu.svg"
                    : theme === "light"
                      ? "cancel.svg"
                      : "cancel-white.svg"
                }`}
                alt="menu"
              />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className={`absolute right-0 z-10 w-11/12 p-4 ${
              theme === "dark" ? "bg-slate-800" : "bg-white"
            } shadow-md rounded-md`}
          >
            {!isBlog ? (
              <div className="grid grid-cols-1">
                <Button onClick={() => { handleWorkScroll?.(); setMenuOpen(false); }}>Projects</Button>
                <Button onClick={() => { handleAboutScroll?.(); setMenuOpen(false); }}>About</Button>
                {showBlog && (
                  <Button onClick={() => navigate({ to: "/blog" })}>Blog</Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1">
                <Button onClick={() => navigate({ to: "/" })}>Home</Button>
                {showBlog && (
                  <Button onClick={() => navigate({ to: "/blog" })}>Blog</Button>
                )}
                {showResume && (
                  <Button onClick={() => navigate({ to: "/resume" })}>Resume</Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop nav */}
      <div
        className={`mt-10 hidden flex-row items-center justify-between sticky ${
          theme === "light" && "bg-white"
        } dark:text-white top-0 z-10 tablet:flex`}
      >
        <h1
          onClick={() => navigate({ to: "/" })}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {name}.
        </h1>
        {!isBlog ? (
          <div className="flex">
            <Button onClick={handleWorkScroll}>Work</Button>
            <Button onClick={handleAboutScroll}>About</Button>
            {showBlog && (
              <Button onClick={() => navigate({ to: "/blog" })}>Blog</Button>
            )}
            {showResume && (
              <Button onClick={() => navigate({ to: "/resume" })}>Resume</Button>
            )}
            {mounted && theme && data.darkMode && (
              <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                  alt="theme toggle"
                />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex">
            <Button onClick={() => navigate({ to: "/" })}>Home</Button>
            {showBlog && (
              <Button onClick={() => navigate({ to: "/blog" })}>Blog</Button>
            )}
            {showResume && (
              <Button onClick={() => navigate({ to: "/resume" })}>Resume</Button>
            )}
            {mounted && theme && data.darkMode && (
              <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                  alt="theme toggle"
                />
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
