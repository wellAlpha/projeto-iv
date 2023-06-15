import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AutorPage, LoginPage, CategoriaPage, LivroPage, NotFoundPage } from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <h1>Tela</h1>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
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
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

reportWebVitals();
