"use client";
import { useEffect, useState } from "react";
import { projects } from "@/mock/projects";
// import { thaiNames } from "@/mock/thaiNames";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState([]);

  const [jsonInput, setJsonInput] = useState(JSON.stringify(projects));

  const handleCreateProjects = async () => {
    setLoading(true);
    setError(null);
    // setMessage("");

    let projectsToSend = [];

    // First, try to parse the user's input JSON.
    // try {
    //   if (jsonInput.trim() === "") {
    //     // If the textarea is empty, use the default mock data.
    //     projectsToSend = projects;
    //   } else {
    //     // Otherwise, parse the user's input.
    //     projectsToSend = JSON.parse(jsonInput);
    //     // Ensure the parsed data is an array.
    //     if (!Array.isArray(projectsToSend)) {
    //       throw new Error("Input must be a valid JSON array.");
    //     }
    //   }
    // } catch (err) {
    //   // If parsing fails, set an error message and stop.
    //   setLoading(false);
    //   setError("Invalid JSON input: " + err.message);
    //   return;
    // }

    // Now, send the validated projects data to the API.
    try {
      const response = await fetch("/api/project-create", {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(projects),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Something went wrong with the API call."
        );
      }

      const data = await response.json();
      console.log(data.data, 8888)

      setMessage(data.data);
    } catch (err) {
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=> {
    handleCreateProjects()
  }, [])
  // const sorted = projects.sort((a, b) =>
  //   a.projectNameEn.localeCompare(b.projectNameEn)
  // );

  // // const code = "P" + i.toString().padStart(4, "0");
  // let newxx = [];
  // for (let i = 1; i <= sorted.length; i++) {
  //   // Pad the number with leading zeros to make it 4 digits
  //   const code = "P" + i.toString().padStart(4, "0");
  //   // codes.push(code);
  //   newxx.push({
  //     ...sorted[i - 1],
  //     projectCode: code,
  //   });
  // }

  // const names = sorted.map((project) => {
  // return {
  //   ...project,
  //   projectCode: code,
  // }
  // });
  // console.log(newxx, 1111);

  // const uniqueArray = projects.filter((obj, index, self) =>
  //   index === self.findIndex((t) => t.projectNameEn === obj.projectNameEn)
  // );
  // console.log("uniqueArray::: ", uniqueArray);
  // const engNames = uniqueArray.map((project) => project.projectNameEn);
  // const newItems = uniqueArray.map((project,index) => ({
  //   ...project,
  //   projectNameTh: thaiNames[index]
  // }))

  // console.log("newItems::: ",newItems);
  // const sss = engNames.slice(0, 100)
  // console.log(sss)
  // const ttt = engNames.slice(100, 500)
  // console.log(ttt)
  // const uuu = engNames.slice(500)
  // console.log(uuu)
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Projects
        </h1>

        {message.map((name, index) => {
          return (
            <div key={index}>
              {name.projectCode} {name.projectNameEn} - {name.projectNameTh}
            </div>
          );
        })}

        {/* <button
          onClick={handleCreateProjects}
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? "Creating..." : "Send Data to API"}
        </button> */}
        {/* Textarea for JSON input */}
        {/* <p className="text-sm text-gray-600 mb-2">
          Paste your JSON array below. If the box is empty, the default data will be used.
        </p>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="10"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="[ { 'projectNameEn': 'Project A', ... }, { 'projectNameEn': 'Project B', ... } ]"
        ></textarea>

        // <button
        //   onClick={handleCreateProjects}
        //   disabled={loading}
        //   className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        // >
        //   {loading ? 'Creating...' : 'Send Data to API'}
        // </button> */}

        {/* Display messages based on the state */}
        {/* {loading && (
          <p className="mt-4 text-gray-600">Creating projects, please wait...</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 font-medium">Error: {error}</p>
        )}
        {message && (
          <p className="mt-4 text-green-600 font-medium">{message}</p>
        )} */}
      </div>
    </div>
  );
}
