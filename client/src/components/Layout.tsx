import { Link } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid-container">
      <header className="sticky">
        <nav className="flex w-full h-full justify-between items-center max-w-[1280px] m-auto">
          <div className="flex justify-center items-center min-w-[20%]">
            <Link to="/">
              <h2 className="text-lg font-semibold cursor-pointer">
                Teater Mini
              </h2>
            </Link>
          </div>

          <ul className="flex justify-around items-center [&>*]:mr-3 md:[&>*]:mr-12  [&>*]:text-base [&>*]:cursor-pointer">
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
        </nav>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}

export default Layout;
