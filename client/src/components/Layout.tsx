import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(false);
    };

  const navigate = useNavigate();

  return (
    <div className="grid-container">
      <header className="sticky">
        <nav className="flex w-full h-full justify-between items-center max-w-[1280px] md:m-auto px-4 xl:px-0">
          <div className="flex items-center min-w-[20%]">
            <Link to="/">
              <h2 className="text-lg font-semibold cursor-pointer">
                Teater Mini
              </h2>
            </Link>
          </div>

          <ul className="justify-around items-center [&>*]:mr-3 md:[&>*]:mr-12  [&>*]:text-base [&>*]:cursor-pointer hidden md:flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

          <div className="md:hidden">
            <Menu
              onClick={() => {
                setOpen(true);
                console.log("hehe");
              }}
              style={{ fontSize: "2.2rem" }}
            />
          </div>
        </nav>
      </header>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer()}>
        <div className="w-60 flex flex-col items-center py-10">
          <p
            className="text-xl mb-4"
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
          >
            Home
          </p>
          <p
            className="text-xl mb-4"
            onClick={() => {
              setOpen(false);
              navigate("/create");
            }}
          >
            Create
          </p>
          <p
            className="text-xl mb-4"
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
          >
            Login
          </p>
        </div>
      </Drawer>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}

export default Layout;
