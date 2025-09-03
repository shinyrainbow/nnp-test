"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, FileText, Calendar, User, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Contracts() {
  const [rentalContracts, setRentalContracts] = useState([]);
  const [purchaseAndSaleContracts, setPurchaseAndSaleContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentalContracts = async () => {
      try {
        const res = await fetch(`/api/save-rental-contract`);
        if (!res.ok) {
          throw new Error("Failed to fetch contracts");
        }
        const data = await res.json();
        setRentalContracts(data.contracts || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    const fetchPurchaseAndSaleContracts = async () => {
      try {
        const res = await fetch(`/api/save-purchase-and-sale-contract`);
        if (!res.ok) {
          throw new Error("Failed to fetch contracts");
        }
        const data = await res.json();
        setPurchaseAndSaleContracts(data.contracts || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRentalContracts();
    fetchPurchaseAndSaleContracts();
  }, []);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read from URL or fallback to "general"
  const initialTab = searchParams.get("tab") || "general";

  const [activeTab, setActiveTab] = useState(initialTab);

  // Keep state in sync if user navigates (e.g. back/forward in browser)
  useEffect(() => {
    const urlTab = searchParams.get("tab") || "general";
    setActiveTab(urlTab);
  }, [searchParams]);

  const handleChange = (value: string) => {
    setActiveTab(value);

    // Update URL param without reload
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  const downloadRentalPdf = async (contract) => {
    const {
      language,
      contractPlace,
      contractDate,

      ownerName,
      ownerAge,
      ownerId,
      ownerAddress,
      ownerPhone,

      tenantName,
      tenantAge,
      tenantId,
      tenantAddress,
      tenantPhone,

      projectName,
      projectFloor,
      projectAddress,

      rentalPeriod,
      advance,
      deposit,
      tax,
      commonFee,
      bills,
      rentalRate,
      rentDue,

      dateReceive,
      startDate,

      subDistrict,
      district,
      province,
    } = contract;
    const clausesEN = [
      `CONDOMINIUM / UNIT LEASE AGREEMENT`,
      `       This Agreement is made at ${contractPlace}`,
      `on ${contractDate} Between:`,
      `       Lessor (Landlord): Name: ${ownerName}, Age: ${ownerAge}, Identification Card No.: ${ownerId}, Address: ${ownerAddress}, Phone No.: ${ownerPhone} (hereinafter referred to as the “Lessor”)`,
      `       Lessee (Tenant): Name: ${tenantName}, Age: ${tenantAge}, Identification Card No.: ${tenantId}, Address: ${tenantAddress}, Phone No.: ${tenantPhone} (hereinafter referred to as the “Lessee”)`,
      `The parties agree to the following terms:`,
      `       Clause 2: Advance Payment and Security Deposit The Lessor has received from the Lessee advance rent in the amount of ${advance} Baht and a security deposit for damages to the unit, furniture, and fixtures in the amount of ${deposit} Baht, paid on ${dateReceive}. The security deposit shall be refunded to the Lessee at the end of the lease, after deducting damages or other expenses as necessary.`,
      `       Clause 3: Building and Land Tax The Lessee shall be responsible for applicable taxes in the amount of ${tax} Baht.`,
      `       Clause 4: Common Area Fee The Lessee shall pay any applicable condominium/common fees in the amount of ${commonFee} Baht.`,
      `       Clause 5: Electricity and Water Fees The Lessee shall be responsible for electricity and water charges of ${bills} Baht.`,
      `       Clause 6: Care of Premises The Lessee shall maintain the leased premises in good condition. Any alterations or modifications require prior written approval from the Lessor. The Lessee shall be fully responsible for any damages incurred.`,
      `       Clause 7: Fixtures and Improvements Any constructions or repairs within the premises shall remain upon termination of the lease and become the property of the Lessor, without any compensation to the Lessee. In case of fire or destruction of the premises, this Agreement shall be deemed terminated.`,
      `       Clause 8: Subleasing and Use The Lessee shall not sublease or allow others to reside or conduct business within the unit without the Lessor’s written consent. The Lessor or their representative may inspect the premises at any time. Upon vacating, the Lessee shall have no claim for damages or moving costs.`,
      `       Clause 9: Maintenance and Conduct The Lessee shall maintain cleanliness and avoid offensive odors, loud noise, or unsafe activities. The Lessee shall not store flammable or hazardous materials within the premises.`,
      `       Clause 10: Fire Insurance The Lessee may obtain fire insurance for personal property inside the premises only with the prior written consent of the Lessor.`,
      `       Clause 11: Breach of Contract If the Lessee violates any terms of this Agreement, the Lessor has the right to repossess the premises immediately and terminate the Agreement.`,
      `       Clause 12: End of Lease Upon expiration of the lease or breach by the Lessee, the Lessee shall vacate the premises unconditionally.`,
      `       Clause 13: Sale of Property During Lease If the Lessor sells the leased property before expiration of this Agreement, the Lessor shall notify the Lessee at least one month in advance, including the buyer and sale price, so the Lessee has an opportunity to purchase first if desired.`,
      `       Clause 14: Legal Compliance The Lessee shall not use the premises for any unlawful purposes. The Lessee shall be fully responsible for any violations.`,
      `       Clause 15: Understanding and Signatures Both parties have read and fully understood the terms of this Agreement, and sign in the presence of witnesses as evidence thereof.`,
      `This Agreement is executed in duplicate, with each party retaining one copy.`,
      ``,
      ``,
      `__________________________________ Lessor                      __________________________________ Lessee`,
      `(                                                      )                                (                                                      )`,
      ``,
      ``,
      `__________________________________ Witness 1                  __________________________________ Witness 2`,
      `(                                                      )                                (                                                      )`,
    ];
    const clausesTH = [
      `หนังสือสัญญาเช่าห้องชุด/ คอนโดมิเนียม`,
      `        สัญญานี้ทําขึ้นที่ ${contractPlace}`,
      `ณ วันทีี่ ${contractDate} ระหว่าง`,
      `       ชื่อ-นามสกุล ${ownerName} อายุ ${ownerAge} ปี เลขที่บัตรประชาชน ${ownerId} อยู่บ้านเลขที่ ${ownerAddress} หมายเลขโทรศัพท์ ${ownerPhone} ซึ่งต่อไปนี้จะเรียกว่า "ผู้ให้เช่า” ฝ่ายหนึ่ง`,
      `       ชื่อ-นามสกุล ${tenantName} อายุ ${tenantAge} ปี เลขที่บัตรประชาชน ${tenantId} อยู่บ้านเลขที่ ${tenantAddress} หมายเลขโทรศัพท์ ${tenantPhone} ซึ่งต่อไปนี้จะเรียกว่า "ผู้เช่า” ฝ่ายหนึ่ง`,
      "คู่สัญญาทั้งสองฝ่ายตกลงทำสัญญากัน มีข้อความดังต่อไปนี้",
      `       ข้อ 2. ผู้ให้เช่าได้รับเงินค่าเช่าล่วงหน้าเป็นจำนวนเงิน ${advance} บาท และได้รับเงินค่าประกันความเสียหายของตัวห้อง เฟอร์นิเจอร์และอุปกรณ์ตกแต่งภายในห้องเป็นจํานวนเงิน ${deposit} บาท เมื่อวันที ${dateReceive} โดยเงินค่าประกันความเสียหายจะคืนให้กับผู้เช่าในวันทำสัญญาหมดอายุหลังจากหักค่าเสียหายของตัวห้อง เฟอร์นิเจอร์อุปกรณ์ตกแต่งภายในห้องและค่าใช้จ่ายอื่นๆ เรียบร้อยแล้ว`,
      `       ข้อ 3. ค่าภาษีโรงเรือนและที่ดิน ${tax} บาท`,
      `       ข้อ 4. ค่าส่วนกลางโครงการ ${commonFee} บาท`,
      `       ข้อ 5. ค่าไฟฟ้าและค่าประปา ${bills} บาท`,
      `       ข้อ 6. ผู้เช่ายอมรับที่จะรักษาตัวห้องทีเช่ามิให้ชำรุดทรุดโทรมไปกว่าเดิม ถ้าผู้เช่ามีความประสงค์จะดัดแปลงหรือเพิ่มเติมสิ่งใดใดลง ไปอีก ต้องได้รับอนุญาตจากผู้ให้เช่าเป็นลายลักษณ์อักษรก่อนจึงจะทำได้ถ้าเกิดการเสียหายใดๆ ขั้นผู้เช่ายอมรับผิดชอบค่าเสียหายทั้งสิ้น`,
      `       ข้อ 7. บรรดาสิ่งก่อสร้างหรือสิ่งซ่อมแซมในบริเวณห้องเช่า เมื่อผู้เช่าออกจากห้องเช่า ห้ามมิให้รื้อถอนหรือทำลายเป็นอันขาด และบรรดาสิ่งก่อสร้างหรือสิ่งซ่อมแซมดังกล่าวแล้วนั้น ต้องตกเป็นของผู้ให้เช่าทั้งสิ้น โดยผู้เช่าจะเรียกค่าเสียหายใด ๆ ไม่ได้เลย และถ้าเกิดอัคคีภัยแก่ทรัพย์ที่เช่าขึ้น สัญญานี้เป็นอันระงับสิ้นสุดลง`,
      `       ข้อ 8. ผู้เช่ารับว่าจะไม่ให้ผู้อื่นเช่าช่วงต่อไปอีกทอดหนึ่ง เว้นแต่จะได้รับอนุญาตจากผู้ให้เช่าเป็นลายลักษณ์อักษร และจะไม่ยอม ให้ผู้หนึ่งผู้ใดอยู่อาศัย ดำเนินกิจการค้าขาย หรือรับใช้งานในหน้าที่ใด ๆ ภายในสถานที่เช่านี้ เว้นแต่จะได้รับอนุญาตจาก ผู้ให้เช่าเป็นลายลักษณ์อักษร ทั้งนี้ ผู้เช่ายอมให้ผู้ให้เช่าหรือตัวแทนของผู้ให้เช่าเข้าตรวจดูห้องเช่าได้เสมอ และถ้าผู้เช่า ออกไปจากห้อง ไม่ว่ากรณีใด ผู้เช่าจะเรียกค่าเสียหายหรือค่าขนย้ายจากผู้ให้เช่าไม่ได้ทั้งสิ้น`,
      `       ข้อ 9. ผู้เช่าต้องจัดการภายในบริเวณห้องเช่าไม่ให้มีสิ่งโสโครกหรือกลิ่นเหม็น และไม่กระทำการอึกทึกจนผู้อื่นได้รับความ รำคาญหรือขาดความปกติสุข อีกทั้งต้องไม่เก็บรักษาสิ่งที่เป็นเชื้อเพลิง และไม่กระทำสิ่งใด ๆ ที่น่าหวาดเสียวหรืออาจเป็น อันตรายแก่ผู้อยู่อาศัยใกล้เคียง`,
      `       ข้อ 10. ถ้าผู้เช่าจะประกันอัคคีภัยสำหรับทรัพย์สมบัติหรือสินค้าของตนภายในบริเวณห้องเช่า ต้องได้รับอนุญาตจากผู้ให้เช่าเป็น ลายลักษณ์อักษรก่อน จึงจะสามารถทำประกันอัคคีภัยได้`,
      `       ข้อ 11. ถ้าผู้เช่าประพฤติผิดหรือละเมิดสัญญา แม้เพียงข้อหนึ่งข้อใด หรือกระทำผิดวัตถุประสงค์ข้อหนึ่งข้อใด ผู้เช่ายอมให้ผู้ให้ เช่าทรงไว้ซึ่งสิทธิที่จะเข้ายึดครอบครองสถานที่และสิ่งที่เช่าได้โดยพลัน และมีสิทธิบอกเลิกสัญญาได้ทันที`,
      `       ข้อ 12. เมื่อครบกำหนดสัญญาเช่า หรือผู้เช่าผิดสัญญาเช่า ผู้เช่ายอมให้นับว่าผู้เช่ายอมออกจากที่เช่าโดยไม่มีเงื่อนไข`,
      `       ข้อ 13. ถ้าผู้ให้เช่าตกลงขายทรัพย์สินที่เช่าให้แก่ผู้ใดก่อนครบกำหนดการเช่าตามสัญญานี้ ผู้ให้เช่าจะต้องแจ้งให้ผู้เช่าทราบล่วง หน้าไม่น้อยกว่าหนึ่งเดือน เพื่อให้ผู้เช่าเตรียมตัวออกจากทรัพย์สินที่เช่า และผู้ให้เช่าจะต้องแจ้งให้ผู้เช่าทราบด้วยว่าจะ ตกลงขายแก่ผู้ใด และในราคาเท่าใด เพื่อให้ผู้เช่ามีโอกาสซื้อก่อน หากเห็นว่าเหมาะสม`,
      `       ข้อ 14. ผู้เช่าจะไม่นำห้องที่เช่าไปใช้ในทางที่ผิดกฎหมายอาญา หรือกฎหมายอื่นที่ระบุว่าเป็นความผิด หากผู้เช่าฝ่าฝืนสัญญาข้อ นี้ ผู้เช่าต้องเป็นฝ่ายรับผิดชอบทั้งสิ้น`,
      `       ข้อ 15. ทั้งสองฝ่ายมีความเข้าใจในข้อสัญญานี้โดยตลอดแล้ว จึงลงลายมือชื่อต่อหน้าพยานเป็นสำคัญ`,
      `สัญญานี้ได้ทำขึ้นเป็นสองฉบับ มีข้อความถูกต้องตรงกัน โดยเก็บสัญญาไว้ฝ่ายละฉบับ`,
      ``,
      ``,
      `__________________________________ ผู้ให้เช่า                      __________________________________ ผู้เช่า`,
      `(                                                      )                                (                                                      )`,
      ``,
      ``,
      `__________________________________ พยาน 1                    __________________________________ พยาน 2`,
      `(                                                      )                                (                                                      )`,
    ];
    try {
      // setIsGeneratingPDF(true);
      const res = await fetch("/api/contract-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clauses: activeTab === "TH" ? clausesTH : clausesEN,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate PDF");
      // setIsGeneratingPDF(false);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "rental-contract.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error downloading PDF");
    }
  };

  const downloadPurchaseAndSalePdf = async (contract) => {
    const {
      language,
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
    } = contract;
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
      // setIsGeneratingPDF(true);
      const res = await fetch("/api/contract-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clauses: language === "TH" ? clausesTH : clausesEN,
        }),
      });
      if (!res.ok) throw new Error("Failed to generate PDF");
      // setIsGeneratingPDF(false);
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
  const { t } = useLanguage();

  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <Suspense fallback={<div>Loading search params...</div>}>
    <div className="min-h-screen ">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                {t("contracts.title")}
              </h1>
            </div>
            {/* <Badge variant="secondary">{t("post.badge")}</Badge> */}
          </div>
        </div>
      </header>

      {loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">{t("loadingContract")}</p>
          </div>
        </div>
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={handleChange}
          defaultValue={activeTab}
          className="space-y-4 mt-4"
        >
          <TabsList>
            <TabsTrigger value="rent">เช่า</TabsTrigger>
            <TabsTrigger value="buySell">ซื้อ-ขาย</TabsTrigger>
          </TabsList>

          <TabsContent value="rent" className="space-y-4">
            <Card>
              <CardContent>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {t("contracts.title.rent")}
                      </h1>
                      <p className="text-gray-600 mt-2">
                        {t("contracts.subtitle.rent")}
                      </p>
                    </div>
                    <Button asChild size="lg" className="gap-2">
                      <Link href="/dashboard/contract-builder/new-rental-contract">
                        <Plus className="w-5 h-5" />
                        {t("contracts.createNew.rental")}
                      </Link>
                    </Button>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {t("contracts.stats.total")}
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {rentalContracts.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {t("contracts.stats.active")}
                        </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {
                            rentalContracts.filter((c) => c.status === "active")
                              .length
                          }
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {t("contracts.stats.revenue")}
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          $
                          {rentalContracts
                            .filter((c) => c.status === "active")
                            .reduce((sum, c) => sum + c.monthlyRent, 0)
                            .toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contracts List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("contracts.recent.title")}</CardTitle>
                      <CardDescription>
                        {t("contracts.recent.rent.desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {rentalContracts.map((contract) => (
                          <div
                            key={contract.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {contract.tenantName}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {contract.projectName}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className="font-semibold">
                                  ${contract.rentalRate}/month
                                </p>
                                <p className="text-sm text-gray-600">
                                  Start Date: {contract.startDate}
                                </p>
                              </div>
                              {/* <Badge
                              variant={
                                contract.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {contract.status === "active"
                                ? t("contracts.status.active")
                                : t("contracts.status.expired")}
                            </Badge> */}
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 bg-transparent"
                                onClick={() => downloadRentalPdf(contract)}
                              >
                                <Download className="w-4 h-4" />
                                {t("contracts.download")}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buySell" className="space-y-4">
            <Card>
              <CardContent>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {t("contracts.title.buySell")}
                      </h1>
                      <p className="text-gray-600 mt-2">
                        {t("contracts.subtitle.buySell")}
                      </p>
                    </div>
                    <Button asChild size="lg" className="gap-2">
                      <Link href="/dashboard/contract-builder/new-buySell-contract">
                        <Plus className="w-5 h-5" />
                        {t("contracts.createNew.buySell")}
                      </Link>
                    </Button>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {t("contracts.stats.total")}
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {purchaseAndSaleContracts.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {t("contracts.stats.active")}
                        </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {
                            purchaseAndSaleContracts.filter(
                              (c) => c.status === "active"
                            ).length
                          }
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {t("contracts.stats.revenue")}
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          $
                          {purchaseAndSaleContracts
                            .filter((c) => c.status === "active")
                            .reduce((sum, c) => sum + c.monthlyRent, 0)
                            .toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contracts List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("contracts.recent.title")}</CardTitle>
                      <CardDescription>
                        {t("contracts.recent.buySell.desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {purchaseAndSaleContracts.map((contract) => (
                          <div
                            key={contract.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {contract.buyerName}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {contract.projectName}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className="font-semibold">
                                  ${contract.sellPrice}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {contract.contractDate}
                                  {/* {new Date(
                                  contract.startDate
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                  purchaseAndSaleContracts.endDate
                                ).toLocaleDateString()} */}
                                </p>
                              </div>
                              {/* <Badge
                              variant={
                                contract.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {contract.status === "active"
                                ? t("contracts.status.active")
                                : t("contracts.status.expired")}
                            </Badge> */}
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 bg-transparent"
                                onClick={downloadPurchaseAndSalePdf}
                              >
                                <Download className="w-4 h-4" />
                                {t("contracts.download")}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
    </Suspense>
  );
}
