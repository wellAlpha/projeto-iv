import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AutorPage, LoginPage, CategoriaPage, LivroPage } from "./pages";


const root = ReactDOM.createRoot(document.getElementById("root"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <h3 className="text-xl text-center text-roboto">Not Found</h3>
    ),
    children: [
      {
        path: "/",
        element: 
          <LoginPage/>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
