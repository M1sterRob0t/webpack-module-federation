import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loading from "@packages/shared/src/components/Loading";
import ErrorPage from "@packages/shared/src/components/ErrorPage";

const Shop = lazy(() => import('@/components/Shop'));

const routes = [
  {
    path: "/shop",
    element: <Suspense fallback={<Loading />}><Shop /></Suspense>,
    errorElement: <ErrorPage />
  } 
];

export const router = createBrowserRouter(routes);
export default routes;