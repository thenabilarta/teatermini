import { useEffect, useState } from "react";
import Story from "../components/Story";
import axios from "axios";

interface Result {
  id: string;
  created_at: number;
  created_by: string;
  created_by_id: number;
  script_master_id: number;
  speaker_1: string;
  speaker_2: string;
  title: string;
}

function Home() {
  const [scripts, setScripts] = useState<Result[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/api/scripts`).then((res) => {
      console.log(res.data);

      const result: Result[] = res.data;

      result.sort((a: Result, b: Result) => b.created_at - a.created_at);

      setScripts(result);
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
