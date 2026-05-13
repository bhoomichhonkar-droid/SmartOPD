"use client";
import Papa from "papaparse";
import { useState,useEffect } from "react";


export default function AIPage() {

  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {

  Papa.parse("/data/disease.csv", {

    download: true,
    header: true,

    complete: (results) => {
      setData(results.data);
      console.log(results.data);
    },

  });

}, []);


const checkSymptoms = () => {

  const text = symptom
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const emergencySymptoms = [
    "chest pain",
    "breathing problem",
    "difficulty breathing",
    "unconscious",
    "blood vomiting",
    "severe bleeding",
    "heart attack",
  ];

  const emergencyFound =
    emergencySymptoms.some((item) =>
    text.includes(item)
  );

  if (emergencyFound) {

    setResult(
    "⚠ Emergency detected. Please contact hospital immediately."
    );

    return;
  }
  let diseaseScore = {};


  data.forEach((row) => {

    let score = 0;

    for (let i = 1; i <= 17; i++) {

      const symptomKey = 
          Object.keys(row).find(
          key => key.trim() === `Symptom_${i}`
        );
      if (!symptomKey) continue;
      const csvSymptom = row[symptomKey]
        ?.toString()
        .trim()
        .toLowerCase()
        .replace("_", " ")
        .replace(/\s+/g, " ");

      // DEBUG
      //console.log("CSV:", csvSymptom);
      //console.log("INPUT:", text);

      if (csvSymptom) {

        // for full symptoms match
        if (text.includes(csvSymptom)) {

          score += 3;
        }
        // for partial match (each word)}
        else{
          const symptomWords = csvSymptom.split(" ");

          symptomWords.forEach((word) => {

            if (text.includes(word)) {

              score += 1;
            }
              
          });
        }
      }
    }
    if (score > 0) {
      const disease = row["Disease"]
        ?.toString()
        .trim();

      if (!diseaseScore[disease]) {
        diseaseScore[disease] = 0;
      }

      diseaseScore[disease] += score;
    }

  });

  //console.log(diseaseScore);
  const totalScore =
    Object.values(diseaseScore)
      .reduce((a, b) => a + b, 0);

  const sortedDiseases =
  Object.entries(diseaseScore)
    .sort((a, b) => b[1] - a[1]);

  if (sortedDiseases.length > 0) {
    const topResults = 
      sortedDiseases.slice(0, 3);

    let output = "";
    topResults.forEach(([disease, score]) => {

      const confidence =
        Math.min(score * 15, 99);
      output +=
        `${disease} (${confidence}% match)\n`;
    });

    setResult(output);  
  } else {
    setResult(
    "No matching disease found. Please consult doctor."
    );
  }

};




  return (

    <div className="min-h-screen bg-blue-100 p-10">

      <h1 className="text-5xl font-bold text-center text-blue-700">
        AI Symptom Checker
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-2xl mt-10 ">

        <textarea
          value={symptom}
          onChange={(e) =>
            setSymptom(e.target.value)
          }
          placeholder="Describe your symptoms..."
          rows={5}
          className="w-full border border-black p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-300 text-black placeholder:text-black"
        />

        <button
          onClick={checkSymptoms}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl mt-6 w-full font-bold"
        >
          Check Symptoms
        </button>

        {result && (

          <div className="mt-8 bg-green-100 p-5 rounded-2xl animate-bounce">

            <h2 className="text-2xl font-bold text-green-700">
              Result
            </h2>

            <p className="mt-3 text-lg whitespace-pre-wrap font-semibold text-green-800 ">
              {result}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}