import { useEffect, useState } from "react";
import Story from "../components/Story";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Show() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4444/api/scripts/cfef261af8cdcbd8")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  // return (
  //   <div>
  //     {scripts.map((s, i) => (
  //       <Story data={s} key={i} />
  //     ))}
  //   </div>
  // );
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
        <p>
          <span>{result[0]}</span>
          <span className="font-bold underline text-lg">{result[1]}</span>
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

      // console.log("regex", regex);
      console.log(result);

      return (
        <p>
          <span>{result[0]}</span>
          <span className="font-bold underline text-lg">{result[1]}</span>
          <span>{result[2]}</span>
          <span className="font-bold underline text-lg">{result[3]}</span>
          <span>{result[4]}</span>
        </p>
      );
    }
  };

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white p-4 pb-10 pt-8 mb-10">
      <p className="mb-10">Di Sekolah - Created by Nabil</p>

      {data.length > 0 &&
        data[0].content.map((d: any, i: number) => (
          <div className="flex mb-2" key={i}>
            <div className="min-w-[15%] flex justify-between mr-2">
              <p>{d.speaker === 1 ? data[0].speaker_1 : data[0].speaker_2}</p>
              <p>:</p>
            </div>
            {hydrateText(d.text, i, d.to_fill)}
          </div>
        ))}
    </div>
  );
}

export default Show;
