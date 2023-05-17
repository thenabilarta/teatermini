import { useEffect } from "react";
import { useSelector } from "react-redux";

function About() {
  useEffect(() => {
    console.log("This is about page");
  }, []);

  const user = useSelector((state: any) => state);

  console.log("user", user);

  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

export default About;
