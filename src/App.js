import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Autor } from "./pages";



const routes = createBrowserRouter([
  {
    path: "/admin/autor",
    element: <Autor />,
  },
  {
    path: "*",
    element: <h3 className="text-xl text-center text-roboto">Not Found</h3>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
