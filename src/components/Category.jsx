import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Shop></Shop>
    },
  ]);
  
export const Category = () => {
  return (
    <RouterProvider router={router} />
  )
};

