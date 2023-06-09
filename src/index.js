import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AutorPage, LoginPage, CategoriaPage, LivroPage, NotFoundPage, EditoraPage } from "./pages";
import { AuthProvider, RequireAuth } from "./context/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <LoginPage />,
    index: true
  },
  {
    path: "/admin",
    element: <RequireAuth />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/admin/autor",
        element: <AutorPage />,
      },
      {
        path: "/admin/categoria",
        element: <CategoriaPage />,
      },
      {
        path: "/admin/livro",
        element: <LivroPage />,
      },
      {
        path: "/admin/editora",
        element: <EditoraPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();