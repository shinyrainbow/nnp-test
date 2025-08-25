"use client";
import { useState } from "react";
import { apifyJson } from "@/mock/apifyToJson";

export default function ApifyToProperty() {
  const [properties, setProperties] = useState<any[]>([]);

  const extractPostText = (message: string) => {
    const details = {
      projectPropertyCode: "",

      status: "pending",
      whenAvailable: "",
      isAcceptShortTerm: false,

      addressNumber: "",
      bedRoom: 0,
      bathRoom: 1,
      roomSize: "",
      floor: "",
      building: "",
      roomType: "",
      isPetFriendly: false,
      carPark: "",
      imageUrls: [],
      roomAmenities: [],

      rentalRate: null,
      sellPrice: null,

      phone: null,
      lineId: null,
      fbUser: null,

      isOwner: true,
      linkPost: "",

      note: "",
      originalMessage: message,
      messageToPost: "",

      projectCode: "",
    };

    // Regex helpers
    const sizeMatch = message.match(/(\d+\.?\d*)\s?(?:ตร\.ม\.|sqm|SQM)/i);
    if (sizeMatch) details.roomSize = sizeMatch[1] + " sqm";

    const floorMatch = message.match(/(?:ชั้น|Floor|FL)\s?:?\s?([\w\d]+)/i);
    if (floorMatch) details.floor = floorMatch[1];

    const bedMatch = message.match(/(\d+)\s?(?:ห้องนอน|bedroom|Bedrooms?)/i);
    if (bedMatch) details.bedRoom = parseInt(bedMatch[1]);
    else if (/studio/i.test(message)) {
      details.bedRoom = 0;
      details.roomType = "Studio";
    }

    const bathMatch = message.match(/(\d+)\s?(?:ห้องน้ำ|bathroom|Bathrooms?)/i);
    if (bathMatch) details.bathRoom = parseInt(bathMatch[1]);

    const rentMatch = message.match(
      /([0-9,]+)\s?(?:บาท|THB).{0,10}(?:month|ค่าเช่า|เช่า)/i
    );
    if (rentMatch)
      details.rentalRate = parseInt(rentMatch[1].replace(/,/g, ""));

    const sellMatch = message.match(/([0-9,]+)\s?(?:ลบ|MB|million|บาท|฿)/i);
    if (sellMatch && !details.rentalRate) {
      const price = sellMatch[1].replace(/,/g, "");
      details.sellPrice = /ลบ|MB/i.test(message)
        ? parseFloat(price) * 1_000_000
        : parseFloat(price);
    }

    const carMatch = message.match(/(\d+)\s?(?:ที่จอดรถ|parking)/i);
    if (carMatch) details.carPark = parseInt(carMatch[1]);

    const phoneMatch = message.match(/(0\d{8,9})/);
    if (phoneMatch) details.phone = phoneMatch[1];

    const lineMatch = message.match(
      /(?:Line|LINE|line).{0,4}(?:ID|:)?\s*[@]?\s*([\w\d_]+)/
    );
    if (lineMatch) details.lineId = lineMatch[1];

    // const projectMatch = message.match(
    //   /(Celes Asoke|Ashton|Noble|Rhythm|Ideo|Life)/i
    // );
    // if (projectMatch) details.building = projectMatch[1];

    if (message.includes("BTS") || message.includes("MRT")) {
      details.note = message
        .split("\n")
        .filter((l) => l.includes("BTS") || l.includes("MRT"))
        .join(" ");
    }

    details.isOwner = /owner|เจ้าของ/i.test(message);

    return details;
  };

  const apifyToProperty = async () => {
    const filteredPosts = apifyJson.filter((post) => {
      const lower = post?.text.toLowerCase();
      if (
        !!post?.attachments &&
        post?.attachments.length &&
        // lower.includes("owner") &&
        !lower.includes("บ้าน")
      ) {
        return post;
      }
    });

    const properties = filteredPosts.map((filteredPost) => {
      const extractedText = extractPostText(filteredPost.text);

      const filteredImages = filteredPost?.attachments.filter((attachment) => {
        if (
          typeof attachment?.image?.uri === "string" &&
          !!attachment &&
          !!attachment?.image?.uri &&
          !attachment?.is_playable &&
          attachment.image.uri !== undefined
        ) {
          return attachment;
        }
      });

      return {
        ...extractedText,
        linkPost: filteredPost.url,
        imageUrls: [],
        // filteredImages.map((attachment) => attachment.image.uri),
      };
    });

    setProperties(properties);

    const res = await fetch("/api/export-csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(properties),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("CSV export failed:", errorText);
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    // try {
    //   const res = await fetch("/api/apify-to-property", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       properties: properties,
    //     }),
    //   });
    //   const data = await res.json();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleDownload = async () => {
    const res = await fetch("/api/export-csv", {
      method: "POST",
      body: JSON.stringify(properties),
      headers: { "Content-Type": "application/json" },
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  console.log(properties);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <button onClick={apifyToProperty}>convert</button>
      <button onClick={handleDownload}>Download CSV</button>
    </div>
  );
}
