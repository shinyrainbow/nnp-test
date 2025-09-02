"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  Download,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { PDFPreview } from "@/components/pdf-preview";
import { useLanguage } from "@/contexts/language-context";
import ExpandableCard from "./expandableCard";
import { useToast } from "@/hooks/use-toast";
import { generateContractPDF } from "@/lib/pdf-generator";
import { buySellContract } from "@/mock/buySellContract";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { InputForm } from "./rental-contract-builder";

interface ContractData {
  // Tenant Information
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  tenantAddress: string;
  passportPhoto: File | null;

  // Property Information
  propertyAddress: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;

  // Lease Terms
  startDate: string;
  endDate: string;
  monthlyRent: string;
  securityDeposit: string;
  leaseTerm: string;

  // Additional Terms
  petPolicy: string;
  smokingPolicy: string;
  additionalTerms: string;
}


export function BuySellContractBuilder() {
  // const t = useTranslations("contractBuilder")
  // const locale = useLocale()
  const { t } = useLanguage();

  const [contractData, setContractData] = useState<ContractData>({
    tenantName: "",
    tenantEmail: "",
    tenantPhone: "",
    tenantAddress: "",
    passportPhoto: null,
    propertyAddress: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    startDate: "",
    endDate: "",
    monthlyRent: "",
    securityDeposit: "",
    leaseTerm: "",
    petPolicy: "",
    smokingPolicy: "",
    additionalTerms: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof ContractData, value: string) => {
    setContractData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setContractData((prev) => ({ ...prev, passportPhoto: file }));
  };

  const handleGenerateContract = async () => {
    setIsGenerating(true);

    // Simulate PDF generation
    setTimeout(() => {
      // In a real app, you would call an API to generate the PDF
      const blob = new Blob(["Sample PDF content"], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rental-contract-${contractData.tenantName
        .replace(/\s+/g, "-")
        .toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsGenerating(false);
    }, 2000);
  };
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();
  const [thaiVersion, setThaiVersion] = useState(true);
  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await generateContractPDF(contractData);
      toast({
        title: "success",
        description: "Your rental contract has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "PDF Generation Failed",
        description:
          "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePreview = async () => {
  // ==================== THAI ====================
const clausesTH = [
  `สัญญาจะซื้อจะขาย`,
  `    สัญญานี้ทำขึ้นที่ ${contractPlace}`,
  `ณ วันที่ ${contractDate} ระหว่าง`,
  `    ชื่อ-นามสกุล ${sellerName} อายุ ${sellerAge} ปี อยู่บ้านเลขที่ ${sellerAddress} เลขที่บัตรประชาชน ${sellerId} หมายเลขโทรศัพท์ ${sellerPhone} ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะขาย" ฝ่ายหนึ่ง`,
  `    ชื่อ-นามสกุล ${buyerName} อายุ ${buyerAge} ปี อยู่บ้านเลขที่ ${buyerAddress} เลขที่บัตรประชาชน ${buyerId} หมายเลขโทรศัพท์ ${buyerPhone} ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะซื้อ" ฝ่ายหนึ่ง`,
  `ผู้จะขายและผู้จะซื้อตกลงทำสัญญากัน โดยมีข้อความดังต่อไปนี้:`,

  // Clause 1
  `    ข้อ 1. อสังหาริมทรัพย์ที่จะซื้อจะขาย ผู้จะขายตกลงจะขาย และผู้จะซื้อตกลงจะซื้อ ห้องชุด โฉนดที่ดินเลขที่ ${chanot} ชื่ออาคารชุด ${projectName} ชั้นที่ ${projectFloor} ทะเบียนอาคารชุดเลขที่ ${projectAddress} ตั้งอยู่ที่ ${projectAddress} แขวง/ตำบล ${subDistrict} เขต/อำเภอ ${district} จังหวัด ${province} เนื้อที่ ${size} ตารางเมตร พร้อมสิ่งอำนวยความสะดวก ได้แก่ ${amenities} ซึ่งต่อไปจะเรียกว่า "ห้องชุด"`,

  // Clause 2
  `     ข้อ 2. ราคาซื้อขายและการชำระเงิน ราคาซื้อขายรวม ${sellPrice} บาท (${priceText}) โดยผู้จะซื้อตกลงชำระเป็นดังนี้: `,
   `(1) ชำระเงินมัดจำจำนวน ${deposit} บาท (${priceText}) ในวันทำสัญญา ซึ่งถือเป็นส่วนหนึ่งของราคาซื้อขาย `,
   `(2) ชำระเงินส่วนที่เหลือจำนวน ______ บาท ภายใน 15 วัน ณ วันจดทะเบียนโอนกรรมสิทธิ์ ณ สำนักงานที่ดิน`,

  // Clause 3
  `     ข้อ 3. ค่าใช้จ่ายในการจดทะเบียนโอนกรรมสิทธิ์ `,
   `(1) ค่าภาษีเงินได้บุคคลธรรมดา/นิติบุคคล ผู้จะขายเป็นผู้ชำระ `,
   `(2) ค่าจดจำนอง ร้อยละ 1 ผู้จะซื้อเป็นผู้ชำระ `,
   `(3) ค่าธรรมเนียมการโอน ร้อยละ 2 ____________ `,
   `(4) ค่าอากรแสตมป์ ร้อยละ 0.5 ____________ `,
  ` (5) ค่าภาษีธุรกิจเฉพาะ ร้อยละ 3.3 ____________ `,
   `(6) หนังสือปลอดหนี้ ผู้จะขายเป็นผู้ดำเนินการขอเพื่อใช้ในวันโอนกรรมสิทธิ์`,

  // Clause 4
  `       ข้อ 4. การส่งมอบห้องชุด `,
   `(1) ผู้จะขายยินยอมให้ผู้จะซื้อเข้าตรวจสอบห้องชุดก่อนวันโอนกรรมสิทธิ์ หากตรงตามที่ระบุ ผู้จะซื้อยินยอมโอนกรรมสิทธิ์และชำระเงินส่วนที่เหลือ `,
 `(2) ผู้จะขายยินยอมโอนกรรมสิทธิ์มิเตอร์ไฟฟ้าและน้ำให้แก่ผู้จะซื้อในวันโอนกรรมสิทธิ์ `,
   `(3) ผู้จะขายยินยอมโอนกรรมสิทธิ์ที่จอดรถ 1 คัน (ถ้ามี) ให้แก่ผู้จะซื้อในวันโอนกรรมสิทธิ์`,

  // Clause 5
  `    ข้อ 5. การโอนสิทธิ์ตามสัญญาและคำรับรองของผู้จะขาย `,
   `(1) ผู้จะซื้อมีสิทธิ์โอนสิทธิ์ห้องชุดตามสัญญานี้ให้บุคคลอื่นได้ `,
   `(2) ผู้จะขายรับรองว่ามีสิทธิ์เต็มที่ในการขาย ปราศจากภาระผูกพัน และจะไม่สร้างภาระใหม่ใดๆ `,
   `(3) ผู้จะขายต้องรับผิดชอบหนี้สินใดๆ ที่เกี่ยวข้อง และชำระให้หมดก่อนโอนกรรมสิทธิ์`,

  // Clause 6
  `    ข้อ 6. การผิดสัญญาและการระงับสัญญา`, 
  `(1) หากผู้จะซื้อผิดสัญญาไม่โอนกรรมสิทธิ์หรือไม่ชำระเงินตามข้อ 2-3 ผู้จะขายมีสิทธิ์บอกเลิกสัญญาและริบเงินมัดจำ `,
   `(2) หากผู้จะขายผิดสัญญาไม่โอนกรรมสิทธิ์ ผู้จะซื้อมีสิทธิ์เรียกร้องคืนเงินมัดจำทั้งหมด`,

  // Clause 7
  `     ข้อ 7. ข้อตกลงและเงื่อนไขอื่นๆ `,
  `(1) ${note1}`, 
   `(2) ${note2}`,

  `สัญญานี้ทำขึ้นเป็นสองฉบับ มีข้อความตรงกัน คู่สัญญาเก็บไว้ฝ่ายละฉบับ และได้อ่านเข้าใจข้อความแล้ว จึงลงลายมือชื่อเป็นหลักฐานต่อหน้าพยาน`,

  // Signatures
  ``,
  `_____________________________________ ผู้จะขาย`,
  `(                                                           )`,
  ``,
  `_____________________________________ ผู้จะซื้อ`,
  `(                                                           )`,
  ``,
  `_____________________________________ พยาน 1`,
  `(                                                           )`,
  ``,
  `_____________________________________ พยาน 2`,
  `(                                                           )`,
];

// ==================== ENGLISH ====================
const clausesEN = [
  `AGREEMENT TO PURCHASE AND SALE`,
  `This Agreement is made at ${contractPlace} on ${contractDate}, Between:`,
`          Seller: Name: ${sellerName}, Age: ${sellerAge}, Address: ${sellerAddress}, Identification Card No.: ${sellerId}, Phone No.: ${sellerPhone} (hereinafter referred to as the “Seller”)`,
`          Buyer: Name: ${buyerName}, Age: ${buyerAge}, Address: ${buyerAddress}, Identification Card No.: ${buyerId}, Phone No.: ${buyerPhone} (hereinafter referred to as the “Buyer”)`,
  `The Seller and the Buyer agree to the following terms:`,

  // Clause 1
  `        Clause 1: Property to be Purchased and Sold `,
  `The Seller agrees to sell and the Buyer agrees to purchase the condominium unit described as follows: Land Title Deed No.: ${chanot}, Condominium Name: ${projectName}, Floor: ${projectFloor}, Unit Registration No.: ${projectAddress}, Located at: ${projectAddress}, Sub-District: ${subDistrict}, District: ${district}, Province: ${province}, Total area: ${size} sq.m., with facilities including: ${amenities}. (hereinafter referred to as the "Condominium Unit")`,

  // Clause 2
  `         Clause 2: Purchase Price and Payment`, 
   `The purchase price is ${sellPrice} Baht (${priceText}). Payment shall be made as follows: `,
   `(1) A deposit of ${deposit} Baht (${priceText}) on the date of signing, paid in cash and acknowledged by the Seller. This deposit is part of the total price.`, 
   `(2) The remaining balance of ______ Baht to be paid within 15 days on the date of registration of ownership transfer at the Land Office.`,

  // Clause 3
  `          Clause 3: Registration and Transfer Expenses at the Land Office`, 
   `(1) Personal/Corporate Income Tax – paid by the Seller `,
   `(2) Mortgage Registration Fee (1%) – paid by the Buyer `,
   `(3) Transfer Fee (2%) – ____________ `,
   `(4) Stamp Duty (0.5%) – ____________ `,
   `(5) Specific Business Tax (3.3%) – ____________ `,
   `(6) No-Debt Certificate – to be arranged by the Seller for use on transfer date`,

  // Clause 4
  `          Clause 4: Handover of Condominium Unit `,
   `(1) The Seller allows the Buyer to inspect the unit prior to transfer. If it matches the description in Clause 1, the Buyer shall proceed with transfer and payment. `,
   `(2) The Seller agrees to transfer ownership of electricity and water meters to the Buyer on transfer date. `,
   `(3) The Seller agrees to transfer ownership of one parking space (if any) to the Buyer on transfer date.`,

  // Clause 5
  `          Clause 5: Transfer of Rights and Seller’s Representations `,
   `(1) During the Agreement term, the Buyer may transfer the rights under this Agreement to another person. `,
   `(2) The Seller represents that they have full legal rights to sell the unit, free of any encumbrances, liens, or claims, and will not create new encumbrances. `,
   `(3) The Seller shall settle any debts associated with the unit before transfer of ownership.`,

  // Clause 6
  `          Clause 6: Breach and Termination `,
   `(1) If the Buyer fails to register or pay the remaining balance as stated in Clauses 2–3, the Seller may terminate this Agreement and retain the deposit. `,
   `(2) If the Seller fails to transfer ownership to the Buyer or cancels this Agreement, the Buyer has the right to claim a full refund of the deposit.`,

  // Clause 7
  `          Clause 7: Other Terms and Conditions `,
   `(1) ${note1} `,
   `(2) ${note2}`,

  `This Agreement is executed in duplicate, with each party retaining one copy. Both parties have read and fully understood the contents of this Agreement and sign below in the presence of witnesses.`,

  // Signatures
  ``,
  `_____________________________________ Seller`,
  `(                                                           )`,
  ``,
  `_____________________________________ Buyer`,
  `(                                                           )`,
  ``,
  `_____________________________________ Witness 1`,
  `(                                                           )`,
  ``,
  `_____________________________________ Witness 2`,
  `(                                                           )`,
];

    try {
      const res = await fetch("/api/contract-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clauses: activeTab === "TH" ? clausesTH : clausesEN  }),
      });

      if (!res.ok) throw new Error("Failed to generate PDF");

      // Get PDF as blob
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank"); // open new tab with PDF
      
    } catch (err) {
      console.error(err);
      alert("Error generating preview");
    }
  };
  const [activeTab, setActiveTab] = useState('TH'); // default value

  const [contractPlace, setContractPlace] = useState("City Home Srinagarin");
  const [contractDate, setContractDate] = useState("1 กย 2568");
  const [sellerName, setSellerName] = useState("สิริยา วงผู้ดี");
  const [sellerAge, setSellerAge] = useState("34");
  const [sellerId, setSellerId] = useState("2315784612");
  const [sellerAddress, setSellerAddress] = useState("1/234 บางจาก พระโขนง กทม");
  const [sellerPhone, setSellerPhone] = useState("0234785254");
  const [buyerName, setBuyerName] = useState("ฮัลเลย์ ดูโอ");
  const [buyerAge, setBuyerAge] = useState("45");
  const [buyerId, setBuyerId] = useState("2463897617824");
  const [buyerAddress, setBuyerAddress] = useState("34/1234 บ้านบางกระเจ้า วัฒนา กทม ");
  const [buyerPhone, setBuyerPhone] = useState("02352345235");
  const [projectName, setProjectName] = useState("City Home Bangna");
  const [projectFloor, setProjectFloor] = useState("5");
  const [projectAddress, setProjectAddress] = useState("35/2 บางนา บางนา กทม");

  const [amenities, setAmenities] = useState("สระว่ายน้ำ ไมโครเวฟ");
  const [chanot, setChanot] = useState("35,000, 89273184,1234819234");
  const [deposit, setDeposit] = useState("70,0000");
  const [size, setSize] = useState("0");
  const [commonFee, setCommonFee] = useState("0");
  const [bills, setBills] = useState("0");
  const [dateReceive, setDateReceive] = useState("6 กย 2568");
  const [priceText, setPriceText] = useState("สองล้านบาทถ้วน");
  const [sellPrice, setSellPrice] = useState("2,000,000");
  const [subDistrict, setSubDistrict] = useState("บางนา");
  const [district, setDistrict] = useState("บางนา");
  const [province, setProvince] = useState("กรุงเทพฯ");
  const [rentDue, setRentDue] = useState("1");
  const [note1, setNote1] = useState("กรุงเทพฯ");
  const [note2, setNote2] = useState("1");
  return (
    <div className="space-y-6">
      <Tabs
       value={activeTab}
       onValueChange={(val) => setActiveTab(val)}
       className="space-y-4 mt-4">
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
                <InputForm value={contractPlace} onChange={setContractPlace} minWidth={300} />
                <br />
                ณ วันทีี่    <InputForm
                    value={contractDate}
                    onChange={setContractDate}
                    minWidth={100}
                  />ระหว่าง <br />
                <br />
                {/* Seller */}
                &ensp;&ensp;&ensp; ชื่อ-นามสกุล   
                <InputForm value={sellerName} onChange={setSellerName} minWidth={360} /> 
                อายุ   <InputForm value={sellerAge} onChange={setSellerAge} minWidth={360} />
                ปี 
                อยู่บ้านเลขที่ <InputForm value={sellerAddress} onChange={setSellerAddress} minWidth={460}/><br/>
                <br />
                เลขที่บัตรประชาชน <InputForm value={sellerId} onChange={setSellerId} minWidth={180}/>
                <br />
                
                หมายเลขโทรศัพท์ <InputForm value={sellerPhone} onChange={setSellerPhone} minWidth={180}/>
                ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะขาย” ฝ่ายหนึ่ง <br /> <br />

                &ensp;&ensp;&ensp; ชื่อ-นามสกุล  <InputForm value={buyerName} onChange={setBuyerName} minWidth={360} /> 
                อายุ  <InputForm value={buyerAge} onChange={setBuyerAge} minWidth={50}/>
                ปี 
                อยู่บ้านเลขที่ <InputForm value={buyerAddress} onChange={setBuyerAddress} minWidth={460}/>
                <br />
                เลขที่บัตรประชาชน <InputForm value={sellerId} onChange={setSellerId} minWidth={180}/>
                <br />
                หมายเลขโทรศัพท์ <InputForm value={buyerPhone} onChange={setBuyerPhone} minWidth={460}/>
                ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะซื้อ” ฝ่ายหนึ่ง <br /> <br />
                ผู้จะขายและผู้จะซื้อตกลงทําสัญญากัน โดยมีข้อความดังต่อไปนี้{" "}
                <br /> <br />
                &ensp;&ensp;&ensp;<span className="font-bold">
                  ข้อ 1.{" "}
                </span>{" "}
                อสังหาริมทรัพย์ที่จะซื้อจะขาย
                <br />
                ผู้ขายตกลงจะขายและผู้ซื้อตกลงจะซื้อห้องชุด โฉนดที่ดินเลขที่{" "}
                <InputForm value={chanot} onChange={setChanot}/> <br />
                ชื่ออาคารชุด <InputForm value={projectName} onChange={setProjectName} minWidth={300}/> 
                ชั้นที่ <InputForm value={projectFloor} onChange={setProjectFloor} minWidth={300}/> ทะเบียน
                อาคารชุดเลขที่ <InputForm value={projectAddress} onChange={setProjectAddress} minWidth={280}/> <br />
                ตั้งอยู่ที่  ตรอก/ซอย <InputForm value={projectAddress} onChange={setProjectAddress} minWidth={280}/> ถนน{" "}
                 ตําบล/แขวง{" "}
                  <InputForm value={subDistrict} onChange={setSubDistrict} minWidth={120} />
                  อำเภอ/เขต
                  <InputForm value={district} onChange={setDistrict} minWidth={120}/>
                  จังหวัด <InputForm value={province} onChange={setProvince} minWidth={120}/> เนื้อที่ทั้งหมดพร้อมระเบียง{" "}
                <InputForm value={size} onChange={setSize}/> ตารางเมตร พร้อมสิ่งอํานวยความสะดวกได้แก่{" "}
                <InputForm value={amenities} onChange={setAmenities}/> <br />
                และให้ถือเป็นส่วนหนึ่งของสัญญา ซึ่งต่อไปจะเรียกว่า “ห้องชุด"{" "}
                <br /> <br />
                &ensp;&ensp;&ensp;<span className="font-bold">
                  ข้อ 2.{" "}
                </span>{" "}
                ราคาซื้อขายและการชําระเงิน <br />
                ผู้จะขายตกลงจะขาย และผู้ซื้อตกลงจะซื้อห้องชุดตามรายละเอียดในข้อ
                1. <br />
                ในราคา <InputForm value={sellPrice}  onChange={setSellPrice}/> บาท ( <InputForm value={priceText} onChange={setPriceText}/>)
                โดยผู้จะซื้อตกลงจะซื้อตกลงแบ่งชําระเงินให้ผู้จะขาย ดังนี้ <br />
                (1) ในวันทําสัญญา ชําระเงินมัดจํา จํานวน <InputForm value={deposit} onChange={setDeposit}/> บาท ({" "}
                <InputForm value={priceText} onChange={setPriceText}/> ) <br />
                โดยจ่ายเป็น เงินสด <br />
                <br />
                ให้แก่ผู้จะขายซึ่งผู้จะขายได้รับไว้แล้ว
                เงินจํานวนนี้คือเงินมัดจําและเป็นส่วนหนึ่งของการชําระเงินตามสัญญานี้{" "}
                <br />
                (2) ในวันจดทะเบียน โอนกรรมสิทธิ์ห้องชุด ตามข้อ 1.
                ชําระเงินส่วนที่เหลือ จํานวน 490,000. ....... บาท ()
                ภายในระยะเวลา 15 วัน <br />
                นับจากวันที่ทําสัญญานี้ผู้จะขายและผู้จะซื้อจะดําเนินการจดทะเบียนโอนกรรมสิทธิ์ห้องชุด
                ณ สํานักงานที่ดิน <br />
                จังหวัด กรุงเทพ <br />
                <br />
                &ensp;&ensp;&ensp;<span className="font-bold">
                  ข้อ 3.{" "}
                </span>{" "}
                ค่าใช้จ่ายการจดทะเบียนโอนกรรมสิทธิ์ ณ สํานักงานที่ดิน <br />
                (1) ค่าภาษีเงินได้บุคคลธรรมดา/นิติบุคคล โดยผู้จะขายเป็นผู้ชําระ{" "}
                <br />
                (2) ค่าจดจํานอง ร้อยละ 1 โดย    <InputForm value={priceText} onChange={setPriceText}/> เป็นผู้ชําระ 0.011. <br />
                (3) ค่าธรรมเนียมการโอน ร้อยละ 2 โดย    <InputForm value={priceText} onChange={setPriceText}/> <br />
                (4) ค่าอากรแสตมป์ ร้อยละ 0.5 โดย    <InputForm value={priceText} onChange={setPriceText}/><br />
                (5) ค่าภาษีธุรกิจเฉพาะ ร้อยละ 3.3 โดย    <InputForm value={priceText} onChange={setPriceText}/><br />
                มารายง เป็นผู้ชําระ ผจา ง เป็นผู้ชําระ (ถ้ามี) เป็นผู้ชําระ
                (ถ้ามี) (6) หนังสือปลอดหนี้ ผู้จะขายเป็นผู้ดําเนินการขอ
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
                ผู้จะซื้อมีสิทธิ์จะซื้อจะขายห้องชุดนี้ให้แก่บุคคลอื่นได้ <br />
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
                (1) <InputForm value={note1} onChange={setNote1} /> <br />
                (2) <InputForm value={note2} onChange={setNote2} /> <br /> <br />
                สัญญานี้ทำขึ้นเป็นสองฉบับ มีข้อความตรงกัน
                คู่สัญญาต่างยึดถือไว้ฝ่ายละฉบับ
                คู่สัญญาทั้งสองฝ่ายได้อ่านและเข้าใจข้อความในสัญญานี้โดยตลอดแล้ว
                เห็นเป็นการถูกต้อง ตามเจตนา
                จึงได้ลงลายมือชื่อไว้เป็นหลักฐานต่อหน้าพยาน <br /> <br /><br />

                <input disabled className="outline-none border-b-2 border-black bg-white w-[280px]"/> ผู้จะซื้อ <br /> <br /><br />
                  <input disabled className="outline-none border-b-2 border-black bg-white w-[280px]"/> ผู้จะขาย<br /> <br /><br />
                  <input disabled className="outline-none border-b-2 border-black bg-white w-[280px]"/> พยาน 1<br /> <br /><br />
                   <input disabled className="outline-none border-b-2 border-black bg-white w-[280px]"/> พยาน 2<br /> <br /><br />
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
                &ensp;&ensp;&ensp; This Agreement is made at    <InputForm value={contractPlace} onChange={setContractPlace} minWidth={300} /> on this
                <InputForm
                    value={contractDate}
                    onChange={setContractDate}
                    minWidth={100}
                  /> ,  Between: Seller: Name:
                 <InputForm value={sellerName} onChange={setSellerName} minWidth={360} />  Age:  <InputForm value={sellerAge} onChange={setSellerAge} minWidth={360} /> years Identification
                 Address:
                 <InputForm value={sellerAddress} onChange={setSellerAddress} minWidth={460}/>
                Card No.: <InputForm value={sellerId} onChange={setSellerId} minWidth={180}/>  Phone No.: <InputForm value={sellerPhone} onChange={setSellerPhone} minWidth={180}/>
                 (hereinafter referred to as the
                “Seller”) <br/><br/>
                
                Buyer: Name: <InputForm value={buyerName} onChange={setBuyerName} minWidth={360} />  Age: <InputForm value={buyerAge} onChange={setBuyerAge} minWidth={50}/>    years
                Address: <InputForm value={buyerAddress} onChange={setBuyerAddress} minWidth={460}/>
             Identification Card No.: <InputForm value={sellerId} onChange={setSellerId} minWidth={180}/>
                Phone No.:
                <InputForm value={buyerPhone} onChange={setBuyerPhone} minWidth={460}/> (hereinafter referred to as the
                “Buyer”) <br/><br/>
                
                
                &ensp;&ensp;&ensp; The Seller and the Buyer hereby agree to enter into
                this Agreement under the following terms:<br/><br/>
                
                &ensp;&ensp;&ensp;<span className="font-bold">
                  Clause 1:{" "}
                </span>{" "}  Property to
                be Purchased and Sold The Seller agrees to sell, and the Buyer
                agrees to purchase, the condominium unit described below: Land
                Title Deed No.: <InputForm value={chanot} onChange={setChanot}/> <br />
                 Condominium Name: <InputForm value={projectName} onChange={setProjectName} minWidth={300}/> 
                 Floor:  <InputForm value={projectFloor} onChange={setProjectFloor} minWidth={300}/>  Unit Registration
                No.: <InputForm value={projectAddress} onChange={setProjectAddress} minWidth={280}/> <br />
                 Located at: <InputForm value={projectAddress} onChange={setProjectAddress} minWidth={280}/> ถนน{" "}
                 ตําบล/แขวง{" "}
                  <InputForm value={subDistrict} onChange={setSubDistrict} minWidth={120} />
                  อำเภอ/เขต
                  <InputForm value={district} onChange={setDistrict} minWidth={120}/>
                  จังหวัด <InputForm value={province} onChange={setProvince} minWidth={120}/>

                 Total Area (including balcony): <InputForm value={size} onChange={setSize}/>
                 sq.m. Facilities: <InputForm value={amenities} onChange={setAmenities}/> <br /> This unit
                shall hereinafter be referred to as the “Condominium Unit.”<br/><br/>
                
                &ensp;&ensp;&ensp;<span className="font-bold">
                  Clause 2:{" "}
                </span>{" "}  Purchase Price and Payment The Buyer agrees to
                purchase, and the Seller agrees to sell the Condominium Unit as
                described in Clause 1 for the total price of 
                <InputForm value={sellPrice}  onChange={setSellPrice}/> 
                Baht (THB <InputForm value={priceText} onChange={setPriceText}/>). The Buyer shall pay the Seller as
                follows: Deposit: <InputForm value={deposit} onChange={setDeposit}/> On the date of signing this Agreement, the
                Buyer shall pay a deposit of  Baht (THB ____________),
                in cash, which has already been received by the Seller. This
                deposit shall be part of the total purchase price. Remaining
                Balance: On the date of registration for the transfer of
                ownership of the Condominium Unit as described in Clause 2, the
                Buyer shall pay the remaining balance of __________ Baht (THB
                ____________) within 15 days from the date of this Agreement.
                The Seller and Buyer shall jointly proceed to register the
                transfer of ownership at the Land Office, Bangkok.<br/><br/>
                
                &ensp;&ensp;&ensp;<span className="font-bold">
                  Clause 3:{" "}
                </span>{" "} 
                Registration and Transfer Expenses at the Land Office
                Personal/Corporate Income Tax – paid by the Seller Mortgage <br/>
               
                Registration Fee, 1% – paid by the Buyer (0.011) <br/>
                Transfer Fee,
                2% – ___________________________<br/>
                 Stamp Duty, 0.5% –
                ___________________________<br/>
                 Specific Business Tax, 3.3% –
                ___________________________ <br/>
                No-Debt Certificate – to be arranged
                by the Seller for use on the transfer date <br/><br/>
                
                &ensp;&ensp;&ensp;<span className="font-bold">
                  Clause 4:{" "}
                </span>{" "}  Handover of
                Condominium Unit The Seller agrees to allow the Buyer to inspect
                the Condominium Unit before the transfer date. If the unit
                matches the description in Clause 1, the Buyer shall proceed
                with the transfer and pay the remaining balance. The Seller
                shall deliver the Condominium Unit immediately after full
                payment and transfer. The Seller agrees to transfer ownership of
                the electricity and water meters to the Buyer on the transfer
                date. The Seller agrees to transfer ownership of one parking
                space (if any) to the Buyer on the transfer date at the Land
                Office or Condominium Juristic Person. <br/><br/>

                &ensp;&ensp;&ensp;<span className="font-bold">
                  Clause 5:{" "}
                </span>{" "}  Transfer of
                Rights and Seller’s Representations During the term of this
                Agreement, the Buyer may sell the Condominium Unit to another
                person. The Seller represents that they have full rights to sell
                the Condominium Unit, free from any encumbrances, liens, claims,
                or obligations, and shall not create any new encumbrances during
                the term of this Agreement. The Seller shall be responsible for
                any existing debts related to the Condominium Unit and shall
                settle them before the transfer of ownership.<br/><br/>
                
                &ensp;&ensp;&ensp;<span className="font-bold">
                  Clause 6:{" "}
                </span>{" "}  Breach
                and Termination If the Buyer fails to register the transfer or
                pay the remaining balance as described in Clauses 2 and 3, the
                Seller has the right to terminate this Agreement and retain the
                full deposit. If the Seller fails to transfer ownership to the
                Buyer or another person designated by the Buyer, or cancels this
                Agreement as per Clause 3, the Buyer has the right to claim a
                full refund of the deposit. <br/><br/>
                
                &ensp;&ensp;&ensp;<span className="font-bold">
                  Clause 7:{" "}
                </span>{" "}  Other Terms and Conditions
                This Agreement is made in two identical copies, with each party
                retaining one copy. Both parties have read and fully understood
                the contents of this Agreement and agree to its terms as
                evidence by signing below in the presence of witnesses.  <br/><br/><br/>
                
                <input disabled className="outline-none border-b-2 border-black bg-white w-[280px]"/> Lessor <br /> <br /><br />
                  <input disabled className="outline-none border-b-2 border-black bg-white w-[280px]"/> Lessee<br /> <br /><br />
                  <input disabled className="outline-none border-b-2 border-black bg-white w-[280px]"/> Witness 1<br /> <br /><br />
                   <input disabled className="outline-none border-b-2 border-black bg-white w-[280px]"/> Witness 2<br /> <br /><br />
               <br/>
              </div>

            </CardContent>
          </Card>
        </div>
      </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button onClick={handlePreview}>
          Preview PDF
        </Button>

        {/* PDF Download */}
        <Button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2"
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              "Generating PDF..."
              {/* {language === "th" ? "กำลังสร้าง PDF..." : "Generating PDF..."} */}
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
              {/* {getTranslation("common.download", language)} */}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
