import {
  createRouter,
  createRoute,
  createRootRoute,
  createHashHistory,
  Outlet,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import Home from "./routes/index";
import Resume from "./routes/resume";
import Edit from "./routes/edit";
import Blog from "./routes/blog/index";
import BlogPost from "./routes/blog/$slug";

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class">
      <Outlet />
    </ThemeProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resume",
  component: Resume,
});

const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit",
  component: Edit,
});

const blogIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: BlogPost,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  resumeRoute,
  editRoute,
  blogIndexRoute,
  blogPostRoute,
]);

const hashHistory = createHashHistory();

export const router = createRouter({
  routeTree,
  history: hashHistory,
});
