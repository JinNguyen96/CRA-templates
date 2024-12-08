import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { Home } = (await import("../pages/Home"));
      return {
        element: <Home />,
      };
    },
  },
]);
