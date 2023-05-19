import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

function Show() {
  const [data, setData] = useState<any>([]);

  const params = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/api/scripts/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  const hydrateText = (text: string, i: number, to_fill: number) => {
    if (to_fill <= 1) {
      const splitted = text.split("<1>");

      const insert = (arr: any, index: number, ...newItems: any) => [
        ...arr.slice(0, index),
        ...newItems,
        ...arr.slice(index),
      ];

      let textToInsert;

      data[0].value.forEach((v: any) => {
        if (v.line - 1 === i && v.Sequence === 1) {
          textToInsert = v.Content;
        }
      });

      const result = insert(splitted, 1, textToInsert);

      return (
        <p className="text-xs md:text-base">
          <span>{result[0]}</span>
          <span className="font-bold underline md:text-lg text-base">
            {result[1]}
          </span>
          <span>{result[2]}</span>
        </p>
      );
    }

    if (to_fill === 2) {
      const splitted = text.split(/<[^>]*>/g);

      const insert = (arr: any, index: number, ...newItems: any) => [
        ...arr.slice(0, index),
        ...newItems,
        ...arr.slice(index),
      ];

      let textToInsert;
      let textToInsert2;

      data[0].value.forEach((v: any) => {
        if (v.line - 1 === i && v.Sequence === 1) {
          textToInsert = v.Content;
        }

        if (v.line - 1 === i && v.Sequence === 2) {
          textToInsert2 = v.Content;
        }
      });

      let result = insert(splitted, 1, textToInsert);
      result = insert(result, 3, textToInsert2);

      return (
        <p className="text-xs md:text-base mb-4">
          <span className="text">{result[0]}</span>
          <span className="font-bold underline md:text-lg text-base">
            {result[1]}
          </span>
          <span>{result[2]}</span>
          <span className="font-bold underline md:text-lg text-base">
            {result[3]}
          </span>
          <span>{result[4]}</span>
        </p>
      );
    }
  };

  const navigate = useNavigate();

  return (
    <div className="xl:w-full w-[90%] mx-auto bg-white p-4 pb-10 pt-8 mb-10">
      <p className="mb-10">Di Sekolah - Created by Nabil</p>

      {data.length > 0 &&
        data[0].content.map((d: any, i: number) => (
          <div className="flex mb-2" key={i}>
            <div className="min-w-[15%] flex justify-between mr-2 mt-0.5">
              <p className="text-xs md:text-base">
                {d.speaker === 1 ? data[0].speaker_1 : data[0].speaker_2}
              </p>
              <p className="text-xs md:text-base">:</p>
            </div>
            {hydrateText(d.text, i, d.to_fill)}
          </div>
        ))}

      <div className="h-10"></div>

      <Button variant="outlined" onClick={() => navigate("/")}>
        Kembali
      </Button>
    </div>
  );
}

export default Show;
