import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Show from "./pages/Show";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/create"
        element={
          <Layout>
            <Create />
          </Layout>
        }
      />
      <Route path="dashboard" element={<Dashboard />} />
      <Route
        path="story/:id"
        element={
          <Layout>
            <Show />
          </Layout>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NoMatch />} />
      {/* </Route> */}
    </Routes>
  );
}

function Login() {
  return (
    <div>
      <p>Login</p>
    </div>
  );
}

// function Home() {
//   return (
//     <Layout
//       component={
//         <div>
//           <p>Test</p>
//         </div>
//       }
//     />
//   );
// }

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
