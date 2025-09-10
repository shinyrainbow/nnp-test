'use client'

export default function InsertDB() {
  // async function insertDB() {
  //   try {
  //       const res = await fetch("/api/insert-db", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: ""
  //       });
  //       if (!res.ok) throw new Error("Failed to insert");
  //     } catch (err) {
  //       console.error(err);
  //     }
  // }

  async function trigger() {
    try {
        const res = await fetch("/api/insert-image-url", {
          method: "GET",
          // headers: { "Content-Type": "application/json" },
          // body: ""
        });
        if (!res.ok) throw new Error("Failed to insert");
        
      } catch (err) {
        console.error(err);
      }
  }

  return (
   <div>
    <button onClick={trigger}>insert imageUrls to neon db</button>
   </div>
  );
}
