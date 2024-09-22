import { lazy, Suspense  } from "react";
import { createBrowserRouter  } from "react-router-dom";


import Loading from "@packages/shared/src/components/Loading";
import ErrorPage from "@packages/shared/src/components/ErrorPage";

const Gallery = lazy(() => import('@/components/Gallery'));

const routes = [
    {
      path: "/gallery",
      element: <Suspense fallback={<Loading />}><Gallery /></Suspense>,
      errorElement: <ErrorPage />
    },
    
];
export const router = createBrowserRouter(routes);
export default routes;
