import { useEffect, useState } from "react";
import Story from "../components/Story";
import axios from "axios";

function Home() {
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4444/api/scripts").then((res) => {
      setScripts(res.data.reverse());
    });
  }, []);

  return (
    <div>
      {scripts.map((s, i) => (
        <Story data={s} key={i} />
      ))}
    </div>
  );
}

export default Home;
