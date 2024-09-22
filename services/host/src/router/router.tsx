import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
// @ts-ignore
import shopRoutes from 'shop/router'; 
// @ts-ignore
import galleryRoutes from 'gallery/router';
// @ts-ignore 
import aboutRoutes from 'about/router'; 
import Loading from "@packages/shared/src/components/Loading";
import ErrorPage from "@packages/shared/src/components/ErrorPage";

import App from "@/components/App";

export const router =createBrowserRouter([
    {
      path: "/",
      element: <Suspense fallback={<Loading />}><App /></Suspense>,
      errorElement: <ErrorPage />,
       children: [
        ...shopRoutes,
        ...galleryRoutes,
        ...aboutRoutes,
      ]
    },   
]);
