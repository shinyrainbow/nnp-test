"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { InputForm } from "./rental-contract-builder";
import { languages } from "@/lib/i18n";

export function BuySellContractBuilder() {
  const { t } = useLanguage();

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();

  const handlePreview = async () => {
    const clausesEN = [
      `AGREEMENT TO PURCHASE AND SALE`,
      `       This Agreement is made at ${contractPlace}`,
      `on ${contractDate}, Between:`,
      `       Seller: Name: ${sellerName}, Age: ${sellerAge}, Address: ${sellerAddress}, ID No.: ${sellerId}, Phone: ${sellerPhone} (hereinafter referred to as "Seller")`,
      `       Buyer: Name: ${buyerName}, Age: ${buyerAge}, Address: ${buyerAddress}, ID No.: ${buyerId}, Phone: ${buyerPhone} (hereinafter referred to as "Buyer")`,
      `The parties agree to the following terms:`,

      `       Clause 1: Property to be Purchased and Sold`,
      `The Seller agrees to sell and the Buyer agrees to purchase the condominium unit: Land Title Deed No.: ${chanot}, Condominium Name: ${projectName}, Floor: ${projectFloor}, Unit Registration No.: ${projectAddressNo}, Located at: ${projectAddress}, Sub-District: ${subDistrict}, District: ${district}, Province: ${province}, Total Area: ${size} sq.m., Facilities: ${amenities}. (hereinafter referred to as the "Condominium Unit")`,

      `       Clause 2: Purchase Price and Payment`,
      `Total Purchase Price: ${sellPrice} Baht (${priceText})`,
      `Payment terms:`,
      `(1) On signing date, deposit of ${deposit} Baht (${depositText})`,
      `(2) On ownership transfer date, remaining balance of ${remainingPrice} Baht (${remainingPriceText}) within 15 days.`,

      `       Clause 3: Registration and Transfer Expenses at the Land Office`,
      `- Personal/Corporate Income Tax – paid by ${tax}`,
      `- Mortgage Fee (1%) – paid by ${mortgage}`,
      `- Transfer Fee (2%) – paid by ${transfer}`,
      `- Stamp Duty (0.5%) – paid by ${stamp}`,
      `- Specific Business Tax (3.3%) – paid by ${speTax}`,
      `- No-Debt Certificate – arranged by Seller`,

      `       Clause 4: Handover of Condominium Unit`,
      `- Buyer may inspect before transfer`,
      `- Seller to transfer electricity and water meters`,
      `- Seller to transfer one parking space (if any)`,

      `       Clause 5: Transfer of Rights and Seller’s Representations`,
      `- Buyer may transfer rights under this Agreement to another person`,
      `- Seller represents full ownership free of encumbrances`,
      `- Seller shall settle all debts before transfer`,

      `       Clause 6: Breach and Termination`,
      `- If Buyer defaults, Seller may terminate and retain deposit`,
      `- If Seller defaults, Buyer may terminate and claim full refund of deposit`,

      `       Clause 7: Other Terms and Conditions`,
      `(1) ${note1}`,
      `(2) ${note2}`,

      `This Agreement is made in two identical copies. Each party keeps one copy. Both have read and fully understood the contents.`,
      ``,
      ``,
      `__________________________________ Seller                        __________________________________ Purchaser`,
      `(                                                      )                                (                                                      )`,
      ``,
      ``,
      `__________________________________ Witness 1                  __________________________________ Witness 2`,
      `(                                                      )                                (                                                      )`,
    ];
    const clausesTH = [
      `สัญญาจะซื้อจะขาย`,
      `        สัญญานี้ทำขึ้นที่ ${contractPlace}`,
      `ณ วันที่ ${contractDate} ระหว่าง`,
      `       ชื่อ-นามสกุล ${sellerName} อายุ ${sellerAge} ปี อยู่บ้านเลขที่ ${sellerAddress} เลขที่บัตรประชาชน ${sellerId} หมายเลขโทรศัพท์ ${sellerPhone} ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะขาย"`,
      `       ชื่อ-นามสกุล ${buyerName} อายุ ${buyerAge} ปี อยู่บ้านเลขที่ ${buyerAddress} เลขที่บัตรประชาชน ${buyerId} หมายเลขโทรศัพท์ ${buyerPhone} ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะซื้อ"`,
      `ผู้จะขายและผู้จะซื้อตกลงทำสัญญากัน โดยมีข้อความดังต่อไปนี้`,

      `       ข้อ 1. อสังหาริมทรัพย์ที่จะซื้อจะขาย `,
      `ผู้จะขายตกลงจะขายและผู้จะซื้อตกลงจะซื้อห้องชุด โฉนดที่ดินเลขที่ ${chanot}, ชื่ออาคารชุด ${projectName}, ชั้นที่ ${projectFloor}, เลขทะเบียนห้องชุด ${projectAddressNo}, ตรอก/ซอย ${projectAddress}, ตำบล/แขวง ${subDistrict}, อำเภอ/เขต ${district}, จังหวัด ${province}, เนื้อที่ทั้งหมด ${size} ตารางเมตร พร้อมสิ่งอำนวยความสะดวก ได้แก่ ${amenities} (ต่อไปนี้เรียกว่า "ห้องชุด")`,

      `       ข้อ 2. ราคาซื้อขายและการชำระเงิน`,
      `ราคาซื้อขายห้องชุดรวมเป็นเงิน ${sellPrice} บาท (${priceText})`,
      `โดยผู้จะซื้อตกลงแบ่งชำระเป็นดังนี้:`,
      `(1) ในวันทำสัญญา ชำระเงินมัดจำ จำนวน ${deposit} บาท (${depositText})`,
      `(2) ในวันจดทะเบียนโอนกรรมสิทธิ์ ชำระเงินส่วนที่เหลือ ${remainingPrice} บาท (${remainingPriceText}) ภายใน 15 วัน นับจากวันทำสัญญา`,

      `       ข้อ 3. ค่าใช้จ่ายในการโอนกรรมสิทธิ์ ณ สำนักงานที่ดิน`,
      `(1) ภาษีเงินได้บุคคลธรรมดา/นิติบุคคล ชำระโดย ${tax}`,
      `(2) ค่าจดจำนอง 1% ชำระโดย ${mortgage}`,
      `(3) ค่าธรรมเนียมการโอน 2% ชำระโดย ${transfer}`,
      `(4) ค่าอากรแสตมป์ 0.5% ชำระโดย ${stamp}`,
      `(5) ภาษีธุรกิจเฉพาะ 3.3% ชำระโดย ${speTax}`,
      `(6) หนังสือปลอดหนี้ ผู้จะขายเป็นผู้ดำเนินการ`,

      `       ข้อ 4. การส่งมอบห้องชุด`,
      `(1) ผู้จะซื้อมีสิทธิ์ตรวจสอบห้องชุดก่อนวันโอน`,
      `(2) ผู้จะขายยินยอมโอนกรรมสิทธิ์มิเตอร์ไฟฟ้าและน้ำ`,
      `(3) ผู้จะขายยินยอมโอนสิทธิ์ที่จอดรถ 1 คัน (ถ้ามี)`,

      `       ข้อ 5. การโอนสิทธิ์และคำรับรองของผู้จะขาย`,
      `- ผู้จะซื้อมีสิทธิ์โอนสิทธิ์ตามสัญญาให้บุคคลอื่นได้`,
      `- ผู้จะขายรับรองว่ามีสิทธิ์ในห้องชุดโดยสมบูรณ์ ปราศจากภาระผูกพัน`,
      `- ผู้จะขายรับผิดชอบชำระหนี้ที่ติดพันทั้งหมดก่อนวันโอนกรรมสิทธิ์`,

      `       ข้อ 6. การผิดสัญญาและการระงับสัญญา`,
      `- หากผู้จะซื้อผิดสัญญา ไม่จดทะเบียนโอน ผู้จะขายมีสิทธิ์บอกเลิกสัญญาและริบเงินมัดจำ`,
      `- หากผู้จะขายผิดสัญญา ไม่โอนกรรมสิทธิ์ ผู้จะซื้อมีสิทธิ์เรียกเงินมัดจำคืน`,

      `       ข้อ 7. ข้อตกลงและเงื่อนไขอื่นๆ`,
      `(1) ${note1}`,
      `(2) ${note2}`,

      `สัญญานี้ทำขึ้นเป็นสองฉบับ คู่สัญญาต่างเก็บไว้ฝ่ายละฉบับ และได้อ่านเข้าใจข้อความโดยตลอดแล้ว`,
      ``,
      ``,
      `__________________________________ ผู้จะขาย                    __________________________________ ผู้จะซื้อ`,
      `(                                                      )                                (                                                      )`,
      ``,
      ``,
      `__________________________________ พยาน 1                    __________________________________ พยาน 2`,
      `(                                                      )                                (                                                      )`,
    ];

    try {
      const res = await fetch("/api/contract-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clauses: activeTab === "TH" ? clausesTH : clausesEN,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate PDF");

      // Get PDF as blob
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      alert("Error generating preview");
    }
  };

  const handleDownload = async () => {
    const clausesEN = [
      `AGREEMENT TO PURCHASE AND SALE`,
      `       This Agreement is made at ${contractPlace}`,
      `on ${contractDate}, Between:`,
      `       Seller: Name: ${sellerName}, Age: ${sellerAge}, Address: ${sellerAddress}, ID No.: ${sellerId}, Phone: ${sellerPhone} (hereinafter referred to as "Seller")`,
      `       Buyer: Name: ${buyerName}, Age: ${buyerAge}, Address: ${buyerAddress}, ID No.: ${buyerId}, Phone: ${buyerPhone} (hereinafter referred to as "Buyer")`,
      `The parties agree to the following terms:`,

      `       Clause 1: Property to be Purchased and Sold`,
      `The Seller agrees to sell and the Buyer agrees to purchase the condominium unit: Land Title Deed No.: ${chanot}, Condominium Name: ${projectName}, Floor: ${projectFloor}, Unit Registration No.: ${projectAddressNo}, Located at: ${projectAddress}, Sub-District: ${subDistrict}, District: ${district}, Province: ${province}, Total Area: ${size} sq.m., Facilities: ${amenities}. (hereinafter referred to as the "Condominium Unit")`,

      `       Clause 2: Purchase Price and Payment`,
      `Total Purchase Price: ${sellPrice} Baht (${priceText})`,
      `Payment terms:`,
      `(1) On signing date, deposit of ${deposit} Baht (${depositText})`,
      `(2) On ownership transfer date, remaining balance of ${remainingPrice} Baht (${remainingPriceText}) within 15 days.`,

      `       Clause 3: Registration and Transfer Expenses at the Land Office`,
      `- Personal/Corporate Income Tax – paid by ${tax}`,
      `- Mortgage Fee (1%) – paid by ${mortgage}`,
      `- Transfer Fee (2%) – paid by ${transfer}`,
      `- Stamp Duty (0.5%) – paid by ${stamp}`,
      `- Specific Business Tax (3.3%) – paid by ${speTax}`,
      `- No-Debt Certificate – arranged by Seller`,

      `       Clause 4: Handover of Condominium Unit`,
      `- Buyer may inspect before transfer`,
      `- Seller to transfer electricity and water meters`,
      `- Seller to transfer one parking space (if any)`,

      `       Clause 5: Transfer of Rights and Seller’s Representations`,
      `- Buyer may transfer rights under this Agreement to another person`,
      `- Seller represents full ownership free of encumbrances`,
      `- Seller shall settle all debts before transfer`,

      `       Clause 6: Breach and Termination`,
      `- If Buyer defaults, Seller may terminate and retain deposit`,
      `- If Seller defaults, Buyer may terminate and claim full refund of deposit`,

      `       Clause 7: Other Terms and Conditions`,
      `(1) ${note1}`,
      `(2) ${note2}`,

      `This Agreement is made in two identical copies. Each party keeps one copy. Both have read and fully understood the contents.`,
      ``,
      ``,
      `__________________________________ Seller                        __________________________________ Purchaser`,
      `(                                                      )                                (                                                      )`,
      ``,
      ``,
      `__________________________________ Witness 1                  __________________________________ Witness 2`,
      `(                                                      )                                (                                                      )`,
    ];
    const clausesTH = [
      `สัญญาจะซื้อจะขาย`,
      `        สัญญานี้ทำขึ้นที่ ${contractPlace}`,
      `ณ วันที่ ${contractDate} ระหว่าง`,
      `       ชื่อ-นามสกุล ${sellerName} อายุ ${sellerAge} ปี อยู่บ้านเลขที่ ${sellerAddress} เลขที่บัตรประชาชน ${sellerId} หมายเลขโทรศัพท์ ${sellerPhone} ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะขาย"`,
      `       ชื่อ-นามสกุล ${buyerName} อายุ ${buyerAge} ปี อยู่บ้านเลขที่ ${buyerAddress} เลขที่บัตรประชาชน ${buyerId} หมายเลขโทรศัพท์ ${buyerPhone} ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะซื้อ"`,
      `ผู้จะขายและผู้จะซื้อตกลงทำสัญญากัน โดยมีข้อความดังต่อไปนี้`,

      `       ข้อ 1. อสังหาริมทรัพย์ที่จะซื้อจะขาย `,
      `ผู้จะขายตกลงจะขายและผู้จะซื้อตกลงจะซื้อห้องชุด โฉนดที่ดินเลขที่ ${chanot}, ชื่ออาคารชุด ${projectName}, ชั้นที่ ${projectFloor}, เลขทะเบียนห้องชุด ${projectAddressNo}, ตรอก/ซอย ${projectAddress}, ตำบล/แขวง ${subDistrict}, อำเภอ/เขต ${district}, จังหวัด ${province}, เนื้อที่ทั้งหมด ${size} ตารางเมตร พร้อมสิ่งอำนวยความสะดวก ได้แก่ ${amenities} (ต่อไปนี้เรียกว่า "ห้องชุด")`,

      `       ข้อ 2. ราคาซื้อขายและการชำระเงิน`,
      `ราคาซื้อขายห้องชุดรวมเป็นเงิน ${sellPrice} บาท (${priceText})`,
      `โดยผู้จะซื้อตกลงแบ่งชำระเป็นดังนี้:`,
      `(1) ในวันทำสัญญา ชำระเงินมัดจำ จำนวน ${deposit} บาท (${depositText})`,
      `(2) ในวันจดทะเบียนโอนกรรมสิทธิ์ ชำระเงินส่วนที่เหลือ ${remainingPrice} บาท (${remainingPriceText}) ภายใน 15 วัน นับจากวันทำสัญญา`,

      `       ข้อ 3. ค่าใช้จ่ายในการโอนกรรมสิทธิ์ ณ สำนักงานที่ดิน`,
      `(1) ภาษีเงินได้บุคคลธรรมดา/นิติบุคคล ชำระโดย ${tax}`,
      `(2) ค่าจดจำนอง 1% ชำระโดย ${mortgage}`,
      `(3) ค่าธรรมเนียมการโอน 2% ชำระโดย ${transfer}`,
      `(4) ค่าอากรแสตมป์ 0.5% ชำระโดย ${stamp}`,
      `(5) ภาษีธุรกิจเฉพาะ 3.3% ชำระโดย ${speTax}`,
      `(6) หนังสือปลอดหนี้ ผู้จะขายเป็นผู้ดำเนินการ`,

      `       ข้อ 4. การส่งมอบห้องชุด`,
      `(1) ผู้จะซื้อมีสิทธิ์ตรวจสอบห้องชุดก่อนวันโอน`,
      `(2) ผู้จะขายยินยอมโอนกรรมสิทธิ์มิเตอร์ไฟฟ้าและน้ำ`,
      `(3) ผู้จะขายยินยอมโอนสิทธิ์ที่จอดรถ 1 คัน (ถ้ามี)`,

      `       ข้อ 5. การโอนสิทธิ์และคำรับรองของผู้จะขาย`,
      `- ผู้จะซื้อมีสิทธิ์โอนสิทธิ์ตามสัญญาให้บุคคลอื่นได้`,
      `- ผู้จะขายรับรองว่ามีสิทธิ์ในห้องชุดโดยสมบูรณ์ ปราศจากภาระผูกพัน`,
      `- ผู้จะขายรับผิดชอบชำระหนี้ที่ติดพันทั้งหมดก่อนวันโอนกรรมสิทธิ์`,

      `       ข้อ 6. การผิดสัญญาและการระงับสัญญา`,
      `- หากผู้จะซื้อผิดสัญญา ไม่จดทะเบียนโอน ผู้จะขายมีสิทธิ์บอกเลิกสัญญาและริบเงินมัดจำ`,
      `- หากผู้จะขายผิดสัญญา ไม่โอนกรรมสิทธิ์ ผู้จะซื้อมีสิทธิ์เรียกเงินมัดจำคืน`,

      `       ข้อ 7. ข้อตกลงและเงื่อนไขอื่นๆ`,
      `(1) ${note1}`,
      `(2) ${note2}`,

      `สัญญานี้ทำขึ้นเป็นสองฉบับ คู่สัญญาต่างเก็บไว้ฝ่ายละฉบับ และได้อ่านเข้าใจข้อความโดยตลอดแล้ว`,
      ``,
      ``,
      `__________________________________ ผู้จะขาย                    __________________________________ ผู้จะซื้อ`,
      `(                                                      )                                (                                                      )`,
      ``,
      ``,
      `__________________________________ พยาน 1                    __________________________________ พยาน 2`,
      `(                                                      )                                (                                                      )`,
    ];

    try {
      setIsGeneratingPDF(true);
      const res = await fetch("/api/contract-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clauses: activeTab === "TH" ? clausesTH : clausesEN,
        }),
      });
      if (!res.ok) throw new Error("Failed to generate PDF");
      setIsGeneratingPDF(false);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "purchase-and-sell.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error generating preview");
    }
  };

  const savePurchaseAndSaleContract = async () => {
    const contractData = {
      language: activeTab,
      contractPlace,
      contractDate,
    
      sellerName,
      sellerAge,
      sellerId,
      sellerAddress,
      sellerPhone,
    
      buyerName,
      buyerAge,
      buyerId,
      buyerAddress,
      buyerPhone,
    
      projectName,
      projectFloor,
      projectAddressNo,
      projectAddress,
    
      amenities,
      chanot,
      deposit,
      depositText,
      size,
      sellPrice,
      priceText,
      remainingPrice,
      remainingPriceText,
    
      subDistrict,
      district,
      province,
    
      speTax,
      tax,
      mortgage,
      transfer,
      stamp,
    
      note1,
      note2,
    };
    try{
      const res = await fetch("/api/save-purchase-and-sale-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({contractData}),
      });

      if (!res.ok) throw new Error("Failed to save purchase and sale contract");
    }catch(error){
      console.error(error);
      alert("Error save purchase and sale contract");
    }
  }
  const [activeTab, setActiveTab] = useState("TH");
  const [contractPlace, setContractPlace] = useState("ซื้อCity Home Srinagarin");
  const [contractDate, setContractDate] = useState("1 กย 2568");
  const [sellerName, setSellerName] = useState("สิริยา วงผู้ดี");
  const [sellerAge, setSellerAge] = useState("34");
  const [sellerId, setSellerId] = useState("2315784612");
  const [sellerAddress, setSellerAddress] = useState(
    "1/234 บางจาก พระโขนง กทม"
  );
  const [sellerPhone, setSellerPhone] = useState("0234785254");
  const [buyerName, setBuyerName] = useState("ฮัลเลย์ ดูโอ");
  const [buyerAge, setBuyerAge] = useState("45");
  const [buyerId, setBuyerId] = useState("2463897617824");
  const [buyerAddress, setBuyerAddress] = useState(
    "34/1234 บ้านบางกระเจ้า วัฒนา กทม "
  );
  const [buyerPhone, setBuyerPhone] = useState("02352345235");
  const [projectName, setProjectName] = useState("City Home Bangna");
  const [projectFloor, setProjectFloor] = useState("5");
  const [projectAddressNo, setProjectAddressNo] = useState("35/2 ");
  const [projectAddress, setProjectAddress] = useState("สุขุมวิท ุ66/1");
  const [amenities, setAmenities] = useState("สระว่ายน้ำ ไมโครเวฟ");
  const [chanot, setChanot] = useState("35,000, 89273184,1234819234");
  const [deposit, setDeposit] = useState("70,0000");
  const [depositText, setDepositText] = useState("70,0000");
  const [size, setSize] = useState("0");
  const [sellPrice, setSellPrice] = useState("2,000,000");
  const [priceText, setPriceText] = useState("สองล้านบาทถ้วน");
  const [remainingPrice, setRemainingPrice] = useState("2,000,000");
  const [remainingPriceText, setRemainingPriceText] =
    useState("สองล้านบาทถ้วน");
  const [subDistrict, setSubDistrict] = useState("บางนา");
  const [district, setDistrict] = useState("บางนา");
  const [province, setProvince] = useState("กรุงเทพฯ");
  const [speTax, setSpeTax] = useState("");
  const [tax, setTax] = useState("");
  const [mortgage, setMortgage] = useState("");
  const [transfer, setTransfer] = useState("");
  const [stamp, setStamp] = useState("");
  const [note1, setNote1] = useState("กรุงเทพฯ");
  const [note2, setNote2] = useState("1");

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val)}
        className="space-y-4 mt-4"
      >
        <TabsList>
          <TabsTrigger value="TH">ภาษาไทย</TabsTrigger>
          <TabsTrigger value="EN">English</TabsTrigger>
        </TabsList>

        <TabsContent value="TH" className="space-y-4">
          <div className="grid xl:grid-cols-2 gap-8">
            <Card className="lg:col-span-2">
              <CardContent className="space-y-4">
                <div>
                  <br />
                  <br />
                  <div className="text-center font-bold">สัญญาจะซื้อจะขาย</div>
                  <br />
                  <br />
                  &ensp;&ensp;&ensp; สัญญานี้ทําขึ้นที่
                  <InputForm
                    value={contractPlace}
                    onChange={setContractPlace}
                    minWidth={300}
                  />
                  <br />ณ วันที่{" "}
                  <InputForm
                    value={contractDate}
                    onChange={setContractDate}
                    minWidth={200}
                  />
                  ระหว่าง <br />
                  <br />
                  {/* Seller */}
                  &ensp;&ensp;&ensp; ชื่อ-นามสกุล
                  <InputForm
                    value={sellerName}
                    onChange={setSellerName}
                    minWidth={360}
                  />
                  อายุ{" "}
                  <InputForm
                    value={sellerAge}
                    onChange={setSellerAge}
                    minWidth={50}
                  />
                  ปี
                  <br />
                  อยู่บ้านเลขที่{" "}
                  <InputForm
                    value={sellerAddress}
                    onChange={setSellerAddress}
                    minWidth={460}
                  />
                  <br />
                  เลขที่บัตรประชาชน{" "}
                  <InputForm
                    value={sellerId}
                    onChange={setSellerId}
                    minWidth={180}
                  />
                  หมายเลขโทรศัพท์{" "}
                  <InputForm
                    value={sellerPhone}
                    onChange={setSellerPhone}
                    minWidth={180}
                  />
                  ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะขาย” ฝ่ายหนึ่ง <br /> <br />
                  &ensp;&ensp;&ensp; ชื่อ-นามสกุล{" "}
                  <InputForm
                    value={buyerName}
                    onChange={setBuyerName}
                    minWidth={360}
                  />
                  อายุ{" "}
                  <InputForm
                    value={buyerAge}
                    onChange={setBuyerAge}
                    minWidth={50}
                  />
                  ปี <br />
                  อยู่บ้านเลขที่{" "}
                  <InputForm
                    value={buyerAddress}
                    onChange={setBuyerAddress}
                    minWidth={460}
                  />{" "}
                  <br />
                  เลขที่บัตรประชาชน{" "}
                  <InputForm
                    value={sellerId}
                    onChange={setSellerId}
                    minWidth={180}
                  />
                  หมายเลขโทรศัพท์{" "}
                  <InputForm
                    value={buyerPhone}
                    onChange={setBuyerPhone}
                    minWidth={180}
                  />
                  ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะซื้อ” ฝ่ายหนึ่ง <br /> <br />
                  ผู้จะขายและผู้จะซื้อตกลงทําสัญญากัน โดยมีข้อความดังต่อไปนี้{" "}
                  <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">
                    ข้อ 1.{" "}
                  </span>{" "}
                  อสังหาริมทรัพย์ที่จะซื้อจะขาย
                  <br />
                  ผู้ขายตกลงจะขายและผู้ซื้อตกลงจะซื้อห้องชุด โฉนดที่ดินเลขที่{" "}
                  <InputForm
                    value={chanot}
                    onChange={setChanot}
                    minWidth={300}
                  />{" "}
                  <br />
                  ชื่ออาคารชุด{" "}
                  <InputForm
                    value={projectName}
                    onChange={setProjectName}
                    minWidth={300}
                  />
                  ชั้นที่{" "}
                  <InputForm
                    value={projectFloor}
                    onChange={setProjectFloor}
                    minWidth={50}
                  />{" "}
                  ทะเบียน อาคารชุดเลขที่{" "}
                  <InputForm
                    value={projectAddressNo}
                    onChange={setProjectAddressNo}
                    minWidth={120}
                  />{" "}
                  ตรอก/ซอย{" "}
                  <InputForm
                    value={projectAddress}
                    onChange={setProjectAddress}
                    minWidth={280}
                  />{" "}
                  ตําบล/แขวง{" "}
                  <InputForm
                    value={subDistrict}
                    onChange={setSubDistrict}
                    minWidth={160}
                  />
                  อำเภอ/เขต
                  <InputForm
                    value={district}
                    onChange={setDistrict}
                    minWidth={160}
                  />
                  จังหวัด{" "}
                  <InputForm
                    value={province}
                    onChange={setProvince}
                    minWidth={160}
                  />{" "}
                  เนื้อที่ทั้งหมดพร้อมระเบียง{" "}
                  <InputForm value={size} onChange={setSize} /> ตารางเมตร
                  พร้อมสิ่งอํานวยความสะดวกได้แก่{" "}
                  <InputForm
                    value={amenities}
                    onChange={setAmenities}
                    minWidth={460}
                  />{" "}
                  <br />
                  และให้ถือเป็นส่วนหนึ่งของสัญญา ซึ่งต่อไปจะเรียกว่า “ห้องชุด"{" "}
                  <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">
                    ข้อ 2.{" "}
                  </span>{" "}
                  ราคาซื้อขายและการชําระเงิน <br />
                  ผู้จะขายตกลงจะขาย
                  และผู้ซื้อตกลงจะซื้อห้องชุดตามรายละเอียดในข้อ 1. <br />
                  ในราคา{" "}
                  <InputForm
                    value={sellPrice}
                    onChange={setSellPrice}
                    minWidth={120}
                  />{" "}
                  บาท ({" "}
                  <InputForm
                    value={priceText}
                    onChange={setPriceText}
                    minWidth={280}
                  />
                  ) โดยผู้จะซื้อตกลงจะซื้อตกลงแบ่งชําระเงินให้ผู้จะขาย ดังนี้{" "}
                  <br />
                  (1) ในวันทําสัญญา ชําระเงินมัดจํา จํานวน{" "}
                  <InputForm
                    value={deposit}
                    onChange={setDeposit}
                    minWidth={120}
                  />{" "}
                  บาท ({" "}
                  <InputForm
                    value={depositText}
                    onChange={setDepositText}
                    minWidth={220}
                  />{" "}
                  ) <br />
                  โดยจ่ายเป็น
                  เงินสดให้แก่ผู้จะขายซึ่งผู้จะขายได้รับไว้แล้วเงินจํานวนนี้คือเงินมัดจําและเป็นส่วนหนึ่งของการชําระเงินตามสัญญานี้{" "}
                  <br />
                  (2) ในวันจดทะเบียน โอนกรรมสิทธิ์ห้องชุด ตามข้อ 1.
                  ชําระเงินส่วนที่เหลือ จํานวน{" "}
                  <InputForm
                    value={remainingPrice}
                    onChange={setRemainingPrice}
                    minWidth={120}
                  />{" "}
                  บาท (
                  <InputForm
                    value={remainingPriceText}
                    onChange={setRemainingPriceText}
                    minWidth={280}
                  />
                  ) ภายในระยะเวลา 15 วัน <br />
                  นับจากวันที่ทําสัญญานี้ผู้จะขายและผู้จะซื้อจะดําเนินการจดทะเบียนโอนกรรมสิทธิ์ห้องชุด
                  ณ สํานักงานที่ดิน <br />
                  จังหวัด กรุงเทพ <br />
                  <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">
                    ข้อ 3.{" "}
                  </span>{" "}
                  ค่าใช้จ่ายการจดทะเบียนโอนกรรมสิทธิ์ ณ สํานักงานที่ดิน <br />
                  (1) ค่าภาษีเงินได้บุคคลธรรมดา/นิติบุคคล โดย{" "}
                  <InputForm value={tax} onChange={setTax} /> เป็นผู้ชําระ{" "}
                  <br />
                  (2) ค่าจดจํานอง ร้อยละ 1 โดย{" "}
                  <InputForm value={mortgage} onChange={setMortgage} />{" "}
                  เป็นผู้ชําระ (0.01%) <br />
                  (3) ค่าธรรมเนียมการโอน ร้อยละ 2 โดย{" "}
                  <InputForm value={transfer} onChange={setTransfer} />
                  เป็นผู้ชําระ
                  <br />
                  (4) ค่าอากรแสตมป์ ร้อยละ 0.5 โดย{" "}
                  <InputForm value={stamp} onChange={setStamp} />
                  เป็นผู้ชําระ
                  <br />
                  (5) ค่าภาษีธุรกิจเฉพาะ ร้อยละ 3.3 โดย{" "}
                  <InputForm value={speTax} onChange={setSpeTax} />
                  เป็นผู้ชําระ
                  <br />
                  (6) หนังสือปลอดหนี้ ผู้จะขายเป็นผู้ดําเนินการขอ
                  เพื่อใช้ในวันโอนกรรมสิทธิ์ให้กับผู้จะซื้อ ณ สํานักงานที่ดิน{" "}
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">
                    ข้อ 4.{" "}
                  </span>{" "}
                  การส่งมอบห้องชุด <br />
                  (1) ผู้จะขายยินยอมให้ผู้จะซื้อเข้าตรวจสอบห้องชุด
                  ก่อนวันจดทะเบียนโอนกรรมสิทธิ์ โดยหากห้องชุดตรง ตามที่ระบุในข้อ
                  1. ผู้จะซื้อจึงยอมให้มีการโอนกรรมสิทธิ์ และ
                  หลังจากการโอนกรรมสิทธิ์พร้อมชําระเงินส่วนที่ เหลือ
                  ผู้จะขายจะส่งมอมห้องชุดแก่ผู้จะซื้อทันที <br />
                  (2) ผู้จะขายยินยอม โอนกรรมสิทธิ์ มิเตอร์ไฟฟ้า และมิเตอร์น้ํา
                  ให้แก่ผู้จะซื้อในวันโอนกรรมสิทธิ์ <br />
                  (3) ผู้จะขายยินยอมโอนกรรมสิทธิ์ ที่จอดรถ 1 คัน (ถ้ามี)
                  ให้แก่ผู้จะซื้อในวันโอนกรรมสิทธิ์ ณ สํานักงาน ที่ดิน
                  หรือนิติบุคคลอาคารชุด <br />
                  <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">
                    ข้อ 5.{" "}
                  </span>{" "}
                  การโอนสิทธิ์ตามสัญญาและคํารับรองของผู้จะขาย <br />
                  (1) ในช่วงเวลาที่สัญญามีผลบังคับใช้
                  ผู้จะซื้อมีสิทธิ์จะซื้อจะขายห้องชุดนี้ให้แก่บุคคลอื่นได้{" "}
                  <br />
                  (2) ผู้จะขายรับรองว่ามีสิทธิ์ในการขายห้องชุดโดยสมบูรณ์
                  และรับรองว่าปราศจากภาระผูกพันใดๆ ภาระจํายอม
                  การรอนสิทธิ์หรือสิทธิ์เรียกร้องใดๆ
                  และไม่มีสิทธิ์ก่อภาระผูกพันเพิ่มขึ้นนับตั้งแต่สัญญานี้มีผล
                  บังคับใช้ <br />
                  (3) ผู้จะขายต้องรับผิดชอบหนี้สินใดๆ
                  ที่ติดพันอยู่โดยจะชําระหนี้ให้หมดสิ้นก่อนจดทะเบียนโอนกรรมสิทธิ์{" "}
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">
                    ข้อ 6.{" "}
                  </span>{" "}
                  การผิดสัญญาและการระงับสัญญา <br />
                  (1)
                  กรณีผู้จะซื้อผิดสัญญาไม่จดทะเบียนรับโอนกรรมสิทธิ์ตามรายละเอียดข้อ
                  3. และชําระเงินส่วนที่เหลือตาม รายละเอียดข้อ 2.
                  ผู้จะขายมีสิทธิบอกเลิกสัญญาและริบเงินมัดจําทั้งหมดได้
                  <br />
                  (2)
                  กรณีผู้จะขายผิดสัญญาไม่จดทะเบียนโอนกรรมสิทธิ์ให้ผู้จะซื้อหรือบุคคลอื่นที่ผู้จะซื้อกําหนด
                  หรือยกเลิก สัญญาฉบับนี้ ตามรายละเอียดข้อ 3.
                  ผู้จะซื้อมีสิทธิ์เรียกร้องเงินมัดจําทั้งหมดคืน
                  <br />
                  <br />
                  &ensp;&ensp;&ensp; <span className="font-bold">
                    ข้อ 7.{" "}
                  </span>{" "}
                  ข้อตกลงและเงื่อนไขอื่นๆ <br />
                  (1){" "}
                  <InputForm
                    value={note1}
                    onChange={setNote1}
                    minWidth={450}
                  />{" "}
                  <br />
                  (2){" "}
                  <InputForm
                    value={note2}
                    onChange={setNote2}
                    minWidth={450}
                  />{" "}
                  <br /> <br />
                  สัญญานี้ทำขึ้นเป็นสองฉบับ มีข้อความตรงกัน
                  คู่สัญญาต่างยึดถือไว้ฝ่ายละฉบับ
                  คู่สัญญาทั้งสองฝ่ายได้อ่านและเข้าใจข้อความในสัญญานี้โดยตลอดแล้ว
                  เห็นเป็นการถูกต้อง ตามเจตนา
                  จึงได้ลงลายมือชื่อไว้เป็นหลักฐานต่อหน้าพยาน <br /> <br />
                  <br />
                  <br />
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  ผู้จะขาย
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  ผู้จะซื้อ
                  <br />
                  (
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  (
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  <br />
                  <br />
                  <br />
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  พยาน 1
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  พยาน 2
                  <br />
                  (
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  (
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="EN" className="space-y-4">
          <div className="grid xl:grid-cols-2 gap-8">
            <Card className="lg:col-span-2">
              <CardContent className="space-y-4">
                <div>
                  <br />
                  <br />
                  <div className="text-center font-bold">
                    {" "}
                    AGREEMENT TO PURCHASE AND SALE
                  </div>
                  <br />
                  <br />
                  &ensp;&ensp;&ensp; This Agreement is made at{" "}
                  <InputForm
                    value={contractPlace}
                    onChange={setContractPlace}
                    minWidth={300}
                  />{" "}
                  <br />
                  on
                  <InputForm
                    value={contractDate}
                    onChange={setContractDate}
                    minWidth={220}
                  />{" "}
                  , Between:
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;Seller: Name:
                  <InputForm
                    value={sellerName}
                    onChange={setSellerName}
                    minWidth={360}
                  />{" "}
                  Age:{" "}
                  <InputForm
                    value={sellerAge}
                    onChange={setSellerAge}
                    minWidth={50}
                  />{" "}
                  years <br />
                  Address:
                  <InputForm
                    value={sellerAddress}
                    onChange={setSellerAddress}
                    minWidth={460}
                  />
                  <br />
                  Identification Card No.:{" "}
                  <InputForm
                    value={sellerId}
                    onChange={setSellerId}
                    minWidth={180}
                  />{" "}
                  Phone No.:{" "}
                  <InputForm
                    value={sellerPhone}
                    onChange={setSellerPhone}
                    minWidth={120}
                  />
                  (hereinafter referred to as the “Seller”) <br />
                  <br />
                  &ensp;&ensp;&ensp; Buyer: Name:{" "}
                  <InputForm
                    value={buyerName}
                    onChange={setBuyerName}
                    minWidth={360}
                  />{" "}
                  Age:{" "}
                  <InputForm
                    value={buyerAge}
                    onChange={setBuyerAge}
                    minWidth={50}
                  />{" "}
                  years Address:{" "}
                  <InputForm
                    value={buyerAddress}
                    onChange={setBuyerAddress}
                    minWidth={460}
                  />
                  <br />
                  Identification Card No.:{" "}
                  <InputForm
                    value={sellerId}
                    onChange={setSellerId}
                    minWidth={180}
                  />
                  Phone No.:
                  <InputForm
                    value={buyerPhone}
                    onChange={setBuyerPhone}
                    minWidth={120}
                  />{" "}
                  (hereinafter referred to as the “Buyer”) <br />
                  <br />
                  &ensp;&ensp;&ensp; The Seller and the Buyer hereby agree to
                  enter into this Agreement under the following terms:
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 1: </span> Property to be
                  Purchased and Sold The Seller agrees to sell, and the Buyer
                  agrees to purchase, the condominium unit described below:{" "}
                  <br />
                  Land Title Deed No.:{" "}
                  <InputForm
                    value={chanot}
                    onChange={setChanot}
                    minWidth={300}
                  />
                  Condominium Name:{" "}
                  <InputForm
                    value={projectName}
                    onChange={setProjectName}
                    minWidth={300}
                  />
                  Floor:{" "}
                  <InputForm
                    value={projectFloor}
                    onChange={setProjectFloor}
                    minWidth={50}
                  />{" "}
                  Unit Registration No.:{" "}
                  <InputForm
                    value={projectAddressNo}
                    onChange={setProjectAddressNo}
                    minWidth={120}
                  />{" "}
                  <br />
                  Located at:{" "}
                  <InputForm
                    value={projectAddress}
                    onChange={setProjectAddress}
                    minWidth={340}
                  />{" "}
                  Sub District{" "}
                  <InputForm
                    value={subDistrict}
                    onChange={setSubDistrict}
                    minWidth={160}
                  />
                  District
                  <InputForm
                    value={district}
                    onChange={setDistrict}
                    minWidth={160}
                  />
                  Province{" "}
                  <InputForm
                    value={province}
                    onChange={setProvince}
                    minWidth={160}
                  />
                  Total Area (including balcony):{" "}
                  <InputForm value={size} onChange={setSize} />
                  sq.m. Facilities:{" "}
                  <InputForm
                    value={amenities}
                    onChange={setAmenities}
                    minWidth={460}
                  />{" "}
                  <br /> This unit shall hereinafter be referred to as the
                  “Condominium Unit.”
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 2: </span> Purchase Price
                  and Payment The Buyer agrees to purchase, and the Seller
                  agrees to sell the Condominium Unit as described in Clause 1
                  for the total price of
                  <InputForm
                    value={sellPrice}
                    onChange={setSellPrice}
                    minWidth={120}
                  />
                  Baht (THB{" "}
                  <InputForm
                    value={priceText}
                    onChange={setPriceText}
                    minWidth={280}
                  />
                  ). The Buyer shall pay the Seller as follows: Deposit:{" "}
                  <InputForm
                    value={deposit}
                    onChange={setDeposit}
                    minWidth={120}
                  />{" "}
                  On the date of signing this Agreement, the Buyer shall pay a
                  deposit of Baht (THB{" "}
                  <InputForm
                    value={depositText}
                    onChange={setDepositText}
                    minWidth={220}
                  />
                  ), in cash, which has already been received by the Seller.
                  This deposit shall be part of the total purchase price.
                  Remaining Balance: On the date of registration for the
                  transfer of ownership of the Condominium Unit as described in
                  Clause 2, the Buyer shall pay the remaining balance of{" "}
                  <InputForm
                    value={remainingPrice}
                    onChange={setRemainingPrice}
                    minWidth={120}
                  />
                  ) Baht (THB{" "}
                  <InputForm
                    value={remainingPriceText}
                    onChange={setRemainingPriceText}
                    minWidth={280}
                  />
                  ) within 15 days from the date of this Agreement. The Seller
                  and Buyer shall jointly proceed to register the transfer of
                  ownership at the Land Office, Bangkok.
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 3: </span> Registration and
                  Transfer Expenses at the Land Office <br />
                  Personal/Corporate Income Tax – paid by{" "}
                  <InputForm value={tax} onChange={setTax} />
                  <br />
                  Mortgage – paid by{" "}
                  <InputForm value={mortgage} onChange={setMortgage} /> <br />
                  Transfer Fee, 0.01% – paid by{" "}
                  <InputForm value={transfer} onChange={setTransfer} />
                  <br />
                  Stamp Duty, 0.5% – paid by{" "}
                  <InputForm value={stamp} onChange={setStamp} />
                  <br />
                  Specific Business Tax, 3.3% – paid by{" "}
                  <InputForm value={speTax} onChange={setSpeTax} />
                  <br />
                  No-Debt Certificate – to be arranged by the Seller for use on
                  the transfer date <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 4: </span> Handover of
                  Condominium Unit The Seller agrees to allow the Buyer to
                  inspect the Condominium Unit before the transfer date. If the
                  unit matches the description in Clause 1, the Buyer shall
                  proceed with the transfer and pay the remaining balance. The
                  Seller shall deliver the Condominium Unit immediately after
                  full payment and transfer. The Seller agrees to transfer
                  ownership of the electricity and water meters to the Buyer on
                  the transfer date. The Seller agrees to transfer ownership of
                  one parking space (if any) to the Buyer on the transfer date
                  at the Land Office or Condominium Juristic Person. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 5: </span> Transfer of
                  Rights and Seller’s Representations During the term of this
                  Agreement, the Buyer may sell the Condominium Unit to another
                  person. The Seller represents that they have full rights to
                  sell the Condominium Unit, free from any encumbrances, liens,
                  claims, or obligations, and shall not create any new
                  encumbrances during the term of this Agreement. The Seller
                  shall be responsible for any existing debts related to the
                  Condominium Unit and shall settle them before the transfer of
                  ownership.
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 6: </span> Breach and
                  Termination If the Buyer fails to register the transfer or pay
                  the remaining balance as described in Clauses 2 and 3, the
                  Seller has the right to terminate this Agreement and retain
                  the full deposit. If the Seller fails to transfer ownership to
                  the Buyer or another person designated by the Buyer, or
                  cancels this Agreement as per Clause 3, the Buyer has the
                  right to claim a full refund of the deposit. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 7: </span> Other Terms and
                  Conditions
                  <br />
                  (1){" "}
                  <InputForm
                    value={note1}
                    onChange={setNote1}
                    minWidth={450}
                  />{" "}
                  <br />
                  (2){" "}
                  <InputForm
                    value={note2}
                    onChange={setNote2}
                    minWidth={450}
                  />{" "}
                  <br /> <br />
                  This Agreement is made in two identical copies, with each
                  party retaining one copy. Both parties have read and fully
                  understood the contents of this Agreement and agree to its
                  terms as evidence by signing below in the presence of
                  witnesses. <br />
                  <br />
                  <br />
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  Lessor
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  Lessee
                  <br />
                  (
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  (
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  <br />
                  <br />
                  <br />
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  Witness 1
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  Witness 2
                  <br />
                  (
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  (
                  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  <br />
                  <br />
                  <br />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button onClick={handlePreview}>Preview PDF</Button>

        <Button
          onClick={handleDownload}
          className="flex items-center gap-2"
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("newContract.generatingContract")}
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              {t("newContract.generateContract")}
            </>
          )}
        </Button>
        <Button onClick={savePurchaseAndSaleContract}>Save Contract</Button>
      </div>
    </div>
  );
}
