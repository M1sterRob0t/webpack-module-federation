import { lazy, Suspense,  } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

import Loading from "@packages/shared/src/components/Loading";
import ErrorPage from "@packages/shared/src/components/ErrorPage";

const About = lazy(() => import('@/components/About'));

const routes: RouteObject[] = [
  {
    path: "/about",
    element: <Suspense fallback={<Loading />}><About /></Suspense>,
    errorElement: <ErrorPage />
  },
];

export const router = createBrowserRouter(routes);
export default routes;