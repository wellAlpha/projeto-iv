import { Outlet } from "react-router-dom";
import { Menu } from "./layout";

function App() {
  return (
    <div className="h-screen w-screen flex flex-row">
      <Menu />
      <div className="h-screen w-full flex flex-row justify-center mt-16">
       <Outlet />
      </div>
    </div>
  );
}

export default App;
