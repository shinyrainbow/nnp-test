"use client";

import { useState, useEffect } from "react";
import { thai } from "@/mock/th-projects";
import { posts } from "@/mock/posts";
import { toLowerCase } from "zod/v4";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [imageUrl, setImageUrl] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (e, imageUrl) => {
    try {
      // console.log(filename, 777);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectURL;
      a.download = `filename-${Date.now()}`; // e.g., 'my_image.jpg'

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // const handleDownload = async (e, pathImage) => {
  //   e.preventDefault();
  //   setDownloadStatus('');
  //   setIsLoading(true);

  //   if (!pathImage) {
  //     setDownloadStatus('Please enter a valid image URL.');
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     // Make a fetch request to our Next.js API route
  //     const response = await fetch(
  //       `/api/download-image?url=${pathImage}`,
  //       {method: 'GET'}
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to download image from the provided URL.');
  //     }

  //     // Get the filename from the Content-Disposition header, if available
  //     const contentDisposition = response.headers.get('Content-Disposition');
  //     let filename = `downloaded_image-${Date.now()}.jpg`
  //     if (contentDisposition) {
  //       const match = contentDisposition.match(/filename="?(.+)"?/);
  //       if (match && match.length > 1) {
  //         filename = match[1];
  //       }
  //     }

  //     // Create a blob from the response to handle the binary data
  //     const blob = await response.blob();
      
  //     // Create a temporary link element to trigger the download
  //     const a = document.createElement('a');
  //     a.href = URL.createObjectURL(blob);
  //     a.download = filename;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
      
  //     URL.revokeObjectURL(a.href);
  //     setDownloadStatus('Image downloaded successfully!');

  //   } catch (error) {
  //     console.error('Download error:', error);
  //     setDownloadStatus(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  const insertThaiNames = async () => {
    try {
      const response = await fetch("/api/insert-thai-names", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thai),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Thai names inserted successfully");
      } else {
        console.error("Failed to insert Thai names:", result.error);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects-list");
        const result = await response.json();

        if (result.success) {
          setProjects(result.data);
        } else {
          setError(result.error || "Failed to fetch projects");
        }
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const names = projects.map((project) => project.projectNameEn);
  // console.log(names);
  // const first = names.slice(0, 100);
  // console.log("first:", first);
  // const second = names.slice(100, 200);
  // console.log("second:", second);


// let xxx = []
//   const newPosts = posts.map((post) => {
//     const lower = post?.text.toLowerCase()
//     if (post.attachments && lower.includes("owner")) {
//       const ddd = {
//         facebookUrl: post.url,
//         projectPropertyCode: null,
//         status: null,
//         whenAvailable: null,
//         isAcceptShortTerm: null,
//         addressNumber: null,
//         bedRoom: null,
//         bathRoom: null,
//         roomSize: null,
//         floor: null,
//         building: null,
//         roomType: null,
//         isPetFriendly: null,
//         carPark: null,
//         imageUrls: [],
//         roomAmenities: [],
//         rentalRate: null,
//         sellPrice: null,
//         phone: null,
//         lineId: null,
//         fbUrl: null,
//         isOwner: null,
//         postUserFb: post.user.name,
//         note: null,
//         originalMessage: post.text,
//         messageToPost: null,
//         createdAt: null,
//         updatedAt: null,
//         projectCode: null,
//         postAttachments: post.attachments.map((attachment) => {
//           if (!!attachment && !!attachment?.image?.uri && !attachment?.is_playable && attachment.image.uri !== undefined) {
//             return {
//               url: attachment.image.uri,
//             };
//           }
//         }),
//       };

//       xxx.push(ddd);
//     }else {
//       return;
//     }
//   });

//   console.log(xxx, 55555);
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <button onClick={insertThaiNames}>import thainames</button>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.projectCode} className="flex gap-2">
            <span className="text-gray-600">{project.projectCode}</span>
            <span>{project.projectNameEn}</span>
          </li>
        ))}
      </ul>


     {/* <ul className="space-y-2">
        {xxx.map((post,index) => {
          console.log(post.postAttachments)
return (
          <li key={index} className="flex gap-2">
            <div className="border border-black">

            <div className="text-gray-600">{post.facebookUrl}</div>
            <div>{post.originalMessage}</div>
            </div>
            {post.postAttachments.map((a, i) =>{
              console.log(a)
              if(a && a.url){
                return (
                  <button key={i} onClick={(e) => handleDownload(e, a.url)}>save</button>
                )
              }
            })}
          </li>
)

})}
      </ul>  */}
    </main>
  );
}
