import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";

interface answer {
  key: number;
  value: string;
}

function Create() {
  const [questionList, setQuestionList] = useState([]);
  const [answerList, setAnswerList] = useState<Array<answer>>([]);

  useEffect(() => {
    axios.get("http://localhost:4444/api/key").then((res) => {
      const length = res.data.length;

      const array = [];

      for (let i = 0; i < length; i++) {
        array.push({ key: i, value: "" });
      }

      setAnswerList(array);
      setQuestionList(res.data);
    });
  }, []);

  interface list {
    Content: string;
  }

  return (
    <div className="xl:w-full w-[90%] mx-auto bg-white pb-10 pt-8 mb-10 px-10">
      <p className="mb-10 text-lg font-bold underline">Di Sekolah</p>
      {questionList.map((q: list, i) => (
        <div className="flex flex-col mb-6 md:flex-row" key={i}>
          <div className="w-full md:w-[40%] mb-2 md:mb-0 flex justify-between mr-2 h-10 items-center">
            <p>{q.Content}</p>
          </div>
          <TextField
            id="outlined-basic"
            label={q.Content}
            variant="outlined"
            className="flex-1"
            size="small"
            onChange={(e) => {
              const createNewList = answerList;

              createNewList.find((a) => {
                if (a.key === i) {
                  a.value = e.target.value;
                }
              });

              setAnswerList(createNewList);
            }}
          />
        </div>
      ))}

      <div className="h-20"></div>

      <div className="flex justify-center items-center">
        <Button
          variant="outlined"
          className="w-[10rem]"
          onClick={() => {
            // console.log(answerList);

            axios
              .post("http://localhost:4444/api/value", {
                script_master_id: 1,
                fields: answerList,
              })
              .then((res) => {
                console.log(res.data);
              });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Create;
