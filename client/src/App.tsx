import { Routes, Route, Outlet, Link } from "react-router-dom";
import About from "./pages/About";

export default function App() {
  return (
    <div className="grid-container">
      <header className="sticky shadow-sm">
        <nav className="flex w-full h-full">
          <ul className="flex w-full justify-around items-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-[#000] font-bold text-xl">
                About
              </Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/nothing-here">Nothing Here</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
