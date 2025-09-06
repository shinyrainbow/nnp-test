"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";

export function RentalContractBuilder() {
  const { t } = useLanguage();

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePreview = async () => {
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
      // window.open(url, "_blank"); // open new tab with PDF

      const iframe = document.createElement("iframe");
iframe.style.display = "none";
iframe.src = url;
document.body.appendChild(iframe);
    } catch (err) {
      console.error(err);
      alert("Error generating preview");
    }
  };

  const handleDownload = async () => {
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
      link.download = "rental-contract.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error downloading PDF");
    }
  };

  const saveRentalContract = async () => {
    const contractData = {
      language: activeTab,
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
  };
    try{
      const res = await fetch("/api/save-rental-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({contractData}),
      });

      if (!res.ok) throw new Error("Failed to save contract");
    }catch(error){
      console.error(error);
      alert("Error saving contract");
    }
  }
  const [activeTab, setActiveTab] = useState("TH"); // default value
  // form fields
  const [contractPlace, setContractPlace] = useState("City Home Srinagarin");
  const [contractDate, setContractDate] = useState("1 กย 2568");
  const [ownerName, setOwnerName] = useState("สิริยา วงผู้ดี");
  const [ownerAge, setOnwerAge] = useState("34");
  const [ownerId, setOwnerId] = useState("2315784612");
  const [ownerAddress, setOwnerAddress] = useState("1/234 บางจาก พระโขนง กทม");
  const [ownerPhone, setOwnerPhone] = useState("0234785254");
  const [tenantName, setTenantName] = useState("ฮัลเลย์ ดูโอ");
  const [tenantAge, setTenantAge] = useState("45");
  const [tenantId, setTenantId] = useState("2463897617824");
  const [tenantAddress, setTenantAddress] = useState(
    "34/1234 บ้านบางกระเจ้า วัฒนา กทม "
  );
  const [tenantPhone, setTenantPhone] = useState("02352345235");
  const [projectName, setProjectName] = useState("City Home Bangna");
  const [projectFloor, setProjectFloor] = useState("5");
  const [projectAddress, setProjectAddress] = useState("35/2 บางนา บางนา กทม");
  const [rentalPeriod, setRentalPeriod] = useState("12");
  const [advance, setAdvance] = useState("35,000");
  const [deposit, setDeposit] = useState("70,0000");
  const [tax, setTax] = useState("0");
  const [commonFee, setCommonFee] = useState("0");
  const [bills, setBills] = useState("0");
  const [dateReceive, setDateReceive] = useState("6 กย 2568");
  const [rentalRate, setRentalRate] = useState("35,0000");
  const [startDate, setStartDate] = useState("6 กย 2568");
  const [subDistrict, setSubDistrict] = useState("บางนา");
  const [district, setDistrict] = useState("บางนา");
  const [province, setProvince] = useState("กรุงเทพฯ");
  const [rentDue, setRentDue] = useState("1");

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val)}
        className="space-y-4 mt-4"
      >
        <TabsList>
          <TabsTrigger value="TH">{t("contract.languageTH")}</TabsTrigger>
          <TabsTrigger value="EN">{t("contract.languageEN")}</TabsTrigger>
        </TabsList>

        <TabsContent value="TH" className="space-y-4">
          <div className="grid xl:grid-cols-2 gap-8">
            <Card className="lg:col-span-2">
              <CardContent className="space-y-4">
                <div>
                  <br />
                  <br />
                  <div className="text-center font-bold">
                    หนังสือสัญญาเช่าห้องชุด/ คอนโดมิเนียม
                  </div>
                  <br />
                  <br />
                  &ensp;&ensp;&ensp; สัญญานี้ทําขึ้นที่{" "}
                  <InputForm
                    value={contractPlace}
                    onChange={setContractPlace}
                    minWidth={300}
                  />
                  <br />ณ วันทีี่{" "}
                  <InputForm
                    value={contractDate}
                    onChange={setContractDate}
                    minWidth={100}
                  />{" "}
                  ระหว่าง <br />
                  <br />
                  {/* Seller */}
                  &ensp;&ensp;&ensp; ชื่อ-นามสกุล{" "}
                  <InputForm
                    value={ownerName}
                    onChange={setOwnerName}
                    minWidth={360}
                  />
                  อายุ{" "}
                  <InputForm
                    value={ownerAge}
                    onChange={setOnwerAge}
                    minWidth={50}
                  />
                  ปี <br />
                  ที่อยู่{" "}
                  <InputForm
                    value={ownerAddress}
                    onChange={setOwnerAddress}
                    minWidth={460}
                  />
                  <br />
                  เลขที่บัตรประชาชน{" "}
                  <InputForm
                    value={ownerId}
                    onChange={setOwnerId}
                    minWidth={180}
                  />
                  หมายเลขโทรศัพท์{" "}
                  <InputForm
                    value={ownerPhone}
                    onChange={setOwnerPhone}
                    minWidth={180}
                  />
                  ซึ่งต่อไปนี้จะเรียกว่า "ผู้ให้เช่า” ฝ่ายหนึ่ง <br /> <br />
                  &ensp;&ensp;&ensp; ชื่อ-นามสกุล{" "}
                  <InputForm
                    value={tenantName}
                    onChange={setTenantName}
                    minWidth={360}
                  />{" "}
                  อายุ{" "}
                  <InputForm
                    value={tenantAge}
                    onChange={setTenantAge}
                    minWidth={50}
                  />
                  ปี <br />
                  ที่อยู่
                  <InputForm
                    value={tenantAddress}
                    onChange={setTenantAddress}
                    minWidth={460}
                  />
                  <br />
                  เลขที่บัตรประชาชน{" "}
                  <InputForm
                    value={tenantId}
                    onChange={setTenantId}
                    minWidth={180}
                  />
                  หมายเลขโทรศัพท์
                  <InputForm
                    value={tenantPhone}
                    onChange={setTenantPhone}
                    minWidth={180}
                  />
                  ซึ่งต่อไปนี้จะเรียกว่า "ผู้เช่า” ฝ่ายหนึ่ง <br /> <br />
                  คู่สัญญาทั้งสองฝ่ายตกลงทำสัญญากัน มีข้อความดังต่อไปนี้ <br />{" "}
                  <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">
                    ข้อ 1.{" "}
                  </span>{" "}
                  ผุ้ให้เช่าตกลงให้เช่าห้องชุด/คอนโดมิเนียม โครงการ{" "}
                  <InputForm
                    value={projectName}
                    onChange={setProjectName}
                    minWidth={300}
                  />
                  ชั้น{" "}
                  <InputForm value={projectFloor} onChange={setProjectFloor} />
                  ตรอก/ซอย{" "}
                  <InputForm
                    value={projectAddress}
                    onChange={setProjectAddress}
                    minWidth={280}
                  />{" "}
                  ถนน ตําบล/แขวง{" "}
                  <InputForm
                    value={subDistrict}
                    onChange={setSubDistrict}
                    minWidth={120}
                  />
                  อำเภอ/เขต
                  <InputForm
                    value={district}
                    onChange={setDistrict}
                    minWidth={120}
                  />
                  จังหวัด{" "}
                  <InputForm
                    value={province}
                    onChange={setProvince}
                    minWidth={120}
                  />
                  มีกำหนดเวลา
                  <InputForm
                    value={rentalPeriod}
                    onChange={setRentalPeriod}
                  />{" "}
                  ปี นับตั้งแต่วันที่{" "}
                  <InputForm
                    value={startDate}
                    onChange={setStartDate}
                    minWidth={120}
                  />
                  เป็นต้นไป
                  โดยผู้เช่ายอมเสียค่าเช่าให้แก่ผู้ให้เช่าเป็นเงินค่าเช่า
                  เดือนละ{" "}
                  <InputForm value={rentalRate} onChange={setRentalRate} /> บาท
                  โดยจะชำระเป็นเงินสดหรือโอนเงินเข้าบัญชีธนาคารให้กับผู้ให้เช่า
                  ภายในวันที่{" "}
                  <InputForm
                    value={rentDue}
                    onChange={setRentDue}
                    minWidth={120}
                  />
                  ของทุกๆเดือน เป็นต้น ไป ถ้าไม่ชำระตามกำหนด
                  ผู้เช่ายอมให้ผู้ให้เช่ายึดทรัพยสิน
                  ของผู้เช่าได้และใส่กุญแจล๊อค <br />
                  <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 2. </span>
                  ผู้ให้เช่าได้รับเงินค่าเช่าล่วงหน้าเป็นจำนวนเงิน{" "}
                  <InputForm value={advance} onChange={setAdvance} /> บาท
                  และได้รับเงินค่าประกันความเสียหายของตัวห้อง
                  เฟอร์นิเจอร์และอุปกรณ์ตกแต่งภายในห้องเป็นจํานวนเงิน
                  <InputForm value={deposit} onChange={setDeposit} /> บาท
                  เมื่อวันที
                  <InputForm value={dateReceive} onChange={setDateReceive} />
                  โดยเงินค่าประกันความเสียหายจะคืนให้กับผู้เช่าในวันทำสัญญาหมดอายุหลังจากหักค่าเสียหายของตัวห้อง
                  เฟอร์นิเจอร์อุปกรณ์ตกแต่งภายในห้องและค่าใช้จ่ายอื่นๆ
                  เรียบร้อยแล้ว <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 3. </span>
                  ค่าภาษีโรงเรือนและที่ดิน{" "}
                  <InputForm value={tax} onChange={setTax} /> บาท <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 4. </span>
                  ค่าส่วนกลางโครงการ{" "}
                  <InputForm
                    value={commonFee}
                    onChange={setCommonFee}
                  /> บาท <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 5. </span>
                  ค่าไฟฟ้าและค่าประปา{" "}
                  <InputForm value={bills} onChange={setBills} /> บาท <br />{" "}
                  <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 6. </span>
                  ผู้เช่ายอมรับที่จะรักษาตัวห้องทีเช่ามิให้ชำรุดทรุดโทรมไปกว่าเดิม
                  ถ้าผู้เช่ามีความประสงค์จะดัดแปลงหรือเพิ่มเติมสิ่งใดใดลง ไปอีก
                  ต้องได้รับอนุญาตจากผู้ให้เช่าเป็นลายลักษณ์อักษรก่อนจึงจะทำได้ถ้าเกิดการเสียหายใดๆ
                  ขั้นผู้เช่ายอมรับผิดชอบค่าเสียหายทั้งสิ้น <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 7. </span>
                  บรรดาสิ่งก่อสร้างหรือสิ่งซ่อมแซมในบริเวณห้องเช่า
                  เมื่อผู้เช่าออกจากห้องเช่า ห้ามมิให้รื้อถอนหรือทำลายเป็นอันขาด
                  และบรรดาสิ่งก่อสร้างหรือสิ่งซ่อมแซมดังกล่าวแล้วนั้น
                  ต้องตกเป็นของผู้ให้เช่าทั้งสิ้น โดยผู้เช่าจะเรียกค่าเสียหายใด
                  ๆ ไม่ได้เลย และถ้าเกิดอัคคีภัยแก่ทรัพย์ที่เช่าขึ้น
                  สัญญานี้เป็นอันระงับสิ้นสุดลง <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">
                    ข้อ 8.{" "}
                  </span>{" "}
                  ผู้เช่ารับว่าจะไม่ให้ผู้อื่นเช่าช่วงต่อไปอีกทอดหนึ่ง
                  เว้นแต่จะได้รับอนุญาตจากผู้ให้เช่าเป็นลายลักษณ์อักษร
                  และจะไม่ยอม ให้ผู้หนึ่งผู้ใดอยู่อาศัย ดำเนินกิจการค้าขาย
                  หรือรับใช้งานในหน้าที่ใด ๆ ภายในสถานที่เช่านี้
                  เว้นแต่จะได้รับอนุญาตจาก ผู้ให้เช่าเป็นลายลักษณ์อักษร ทั้งนี้
                  ผู้เช่ายอมให้ผู้ให้เช่าหรือตัวแทนของผู้ให้เช่าเข้าตรวจดูห้องเช่าได้เสมอ
                  และถ้าผู้เช่า ออกไปจากห้อง ไม่ว่ากรณีใด
                  ผู้เช่าจะเรียกค่าเสียหายหรือค่าขนย้ายจากผู้ให้เช่าไม่ได้ทั้งสิ้น
                  <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 9. </span>
                  ผู้เช่าต้องจัดการภายในบริเวณห้องเช่าไม่ให้มีสิ่งโสโครกหรือกลิ่นเหม็น
                  และไม่กระทำการอึกทึกจนผู้อื่นได้รับความ
                  รำคาญหรือขาดความปกติสุข
                  อีกทั้งต้องไม่เก็บรักษาสิ่งที่เป็นเชื้อเพลิง และไม่กระทำสิ่งใด
                  ๆ ที่น่าหวาดเสียวหรืออาจเป็น อันตรายแก่ผู้อยู่อาศัยใกล้เคียง{" "}
                  <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 10. </span>
                  ถ้าผู้เช่าจะประกันอัคคีภัยสำหรับทรัพย์สมบัติหรือสินค้าของตนภายในบริเวณห้องเช่า
                  ต้องได้รับอนุญาตจากผู้ให้เช่าเป็น ลายลักษณ์อักษรก่อน
                  จึงจะสามารถทำประกันอัคคีภัยได้ <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 11. </span>
                  ถ้าผู้เช่าประพฤติผิดหรือละเมิดสัญญา แม้เพียงข้อหนึ่งข้อใด
                  หรือกระทำผิดวัตถุประสงค์ข้อหนึ่งข้อใด ผู้เช่ายอมให้ผู้ให้
                  เช่าทรงไว้ซึ่งสิทธิที่จะเข้ายึดครอบครองสถานที่และสิ่งที่เช่าได้โดยพลัน
                  และมีสิทธิบอกเลิกสัญญาได้ทันที <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">
                    ข้อ 12.
                  </span>{" "}
                  เมื่อครบกำหนดสัญญาเช่า หรือผู้เช่าผิดสัญญาเช่า
                  ผู้เช่ายอมให้นับว่าผู้เช่ายอมออกจากที่เช่าโดยไม่มีเงื่อนไข
                  <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 13. </span>
                  ถ้าผู้ให้เช่าตกลงขายทรัพย์สินที่เช่าให้แก่ผู้ใดก่อนครบกำหนดการเช่าตามสัญญานี้
                  ผู้ให้เช่าจะต้องแจ้งให้ผู้เช่าทราบล่วง
                  หน้าไม่น้อยกว่าหนึ่งเดือน
                  เพื่อให้ผู้เช่าเตรียมตัวออกจากทรัพย์สินที่เช่า
                  และผู้ให้เช่าจะต้องแจ้งให้ผู้เช่าทราบด้วยว่าจะ ตกลงขายแก่ผู้ใด
                  และในราคาเท่าใด เพื่อให้ผู้เช่ามีโอกาสซื้อก่อน
                  หากเห็นว่าเหมาะสม <br /> <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 14. </span>
                  ผู้เช่าจะไม่นำห้องที่เช่าไปใช้ในทางที่ผิดกฎหมายอาญา
                  หรือกฎหมายอื่นที่ระบุว่าเป็นความผิด หากผู้เช่าฝ่าฝืนสัญญาข้อ
                  นี้ ผู้เช่าต้องเป็นฝ่ายรับผิดชอบทั้งสิ้น
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 15. </span>
                  ทั้งสองฝ่ายมีความเข้าใจในข้อสัญญานี้โดยตลอดแล้ว
                  จึงลงลายมือชื่อต่อหน้าพยานเป็นสำคัญ
                  <br /> <br />
                  สัญญานี้ได้ทำขึ้นเป็นสองฉบับ มีข้อความถูกต้องตรงกัน
                  โดยเก็บสัญญาไว้ฝ่ายละฉบับ
                  <br />
                  <br />
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  ผู้ให้เช่า &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  ผู้เช่า
                  <br />
                  ( &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;) 
                 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  ( &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  <br /><br />
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
                  ( &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;) 
                 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  ( &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  <br /><br /><br /><br />
               
              
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
                    CONDOMINIUM / UNIT LEASE AGREEMENT
                  </div>
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;This Agreement is made at
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
                    minWidth={100}
                  />{" "}
                  Between: <br />
                  <br />
                  &ensp;&ensp;&ensp;Lessor (Landlord): Name:{" "}
                  <InputForm
                    value={ownerName}
                    onChange={setOwnerName}
                    minWidth={360}
                  />{" "}
                  Age:{" "}
                  <InputForm
                    value={ownerAge}
                    onChange={setOnwerAge}
                    minWidth={50}
                  />
                  years <br />
                  Address:{" "}
                  <InputForm
                    value={ownerAddress}
                    onChange={setOwnerAddress}
                    minWidth={460}
                  />
                  <br />
                  Identification Card No.:
                  <InputForm
                    value={ownerId}
                    onChange={setOwnerId}
                    minWidth={180}
                  />
                  Phone No.:
                  <InputForm
                    value={ownerPhone}
                    onChange={setOwnerPhone}
                    minWidth={180}
                  />
                  (hereinafter referred to as the “Lessor”) <br />
                  <br />
                  &ensp;&ensp;&ensp;Lessee (Tenant): Name:{" "}
                  <InputForm
                    value={tenantName}
                    onChange={setTenantName}
                    minWidth={360}
                  />
                  Age:{" "}
                  <InputForm
                    value={tenantAge}
                    onChange={setTenantAge}
                    minWidth={50}
                  />{" "}
                  years Identification <br />
                  Address:{" "}
                  <InputForm
                    value={tenantAddress}
                    onChange={setTenantAddress}
                    minWidth={460}
                  />
                  <br />
                  Phone No.: Card No.:{" "}
                  <InputForm
                    value={tenantId}
                    onChange={setTenantId}
                    minWidth={180}
                  />
                  Phone No.:
                  <InputForm
                    value={tenantPhone}
                    onChange={setTenantPhone}
                    minWidth={180}
                  />
                  (hereinafter referred to as the “Lessee”) <br />
                  <br />
                  The parties agree to the following terms: <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 1: </span> Lease of
                  Property The Lessor agrees to lease the condominium/unit
                  located in project
                  <InputForm
                    value={projectName}
                    onChange={setProjectName}
                    minWidth={300}
                  />
                  , Floor{" "}
                  <InputForm value={projectFloor} onChange={setProjectFloor} />{" "}
                  , Alley/Street{" "}
                  <InputForm
                    value={projectAddress}
                    onChange={setProjectAddress}
                    minWidth={280}
                  />{" "}
                  , Subdistrict
                  <InputForm
                    value={subDistrict}
                    onChange={setSubDistrict}
                    minWidth={120}
                  />
                  , District{" "}
                  <InputForm
                    value={district}
                    onChange={setDistrict}
                    minWidth={120}
                  />
                  , Province{" "}
                  <InputForm
                    value={province}
                    onChange={setProvince}
                    minWidth={120}
                  />
                  . The lease term shall be{" "}
                  <InputForm value={rentalPeriod} onChange={setRentalPeriod} />
                  years, starting from{" "}
                  <InputForm
                    value={startDate}
                    onChange={setStartDate}
                    minWidth={120}
                  />
                  . The Lessee agrees to pay the Lessor rent of{" "}
                  <InputForm value={rentalRate} onChange={setRentalRate} /> Baht
                  per month, payable in cash or by bank transfer to the Lessor’s
                  account on the{" "}
                  <InputForm
                    value={rentDue}
                    onChange={setRentDue}
                    minWidth={120}
                  />{" "}
                  of each month, from the start date until the end of the lease.
                  If payment is not made on time, the Lessor has the right to
                  repossess the Lessee’s property and lock the premises. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 2: </span> Advance Payment
                  and Security Deposit The Lessor has received from the Lessee:
                  Advance rent in the amount of ______ Baht. Security deposit
                  for damages to the unit, furniture, and interior fixtures in
                  the amount of ______ Baht, paid on the ______ day of ______,
                  B.E. ______. The security deposit shall be refunded to the
                  Lessee at the end of the lease after deducting any damage to
                  the unit, furniture, or interior fixtures, and any other
                  expenses.
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 3: </span> Building and
                  Land Tax The Lessee shall be responsible for applicable taxes
                  as required. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 4: </span> Common Area Fee
                  The Lessee shall pay any applicable common area or condominium
                  fees. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 5: </span> Electricity and
                  Water Fees The Lessee shall be responsible for electricity and
                  water usage. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 6: </span> Care of Premises
                  The Lessee shall maintain the unit in good condition. Any
                  modifications or additions must be approved in writing by the
                  Lessor. The Lessee shall be fully responsible for any damage
                  caused. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 7: </span> Fixtures and
                  Improvements Any constructions or repairs made within the unit
                  during the lease term shall remain intact and cannot be
                  removed or destroyed by the Lessee upon lease termination.
                  Such improvements shall belong to the Lessor, and the Lessee
                  shall have no claim for compensation. In case of fire or
                  destruction, this Agreement shall terminate immediately.{" "}
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 8: </span> Subleasing and
                  Use The Lessee shall not sublease or allow others to occupy or
                  conduct business within the unit without written consent from
                  the Lessor. The Lessor or their representative may inspect the
                  unit at any time. Upon vacating, the Lessee shall have no
                  claims for damages or moving costs. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 9: </span> Maintenance and
                  Conduct The Lessee shall maintain cleanliness, avoid offensive
                  odors, loud noise, or unsafe practices, and shall not store
                  flammable or hazardous materials. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 10: </span> Fire Insurance
                  The Lessee may obtain fire insurance for personal property
                  only with prior written approval from the Lessor. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 11: </span> Breach of
                  Contract If the Lessee violates any terms of this Agreement,
                  the Lessor has the right to repossess the property immediately
                  and terminate the Agreement. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 12: </span> End of Lease
                  Upon expiration of the lease or breach by the Lessee, the
                  Lessee shall vacate the premises unconditionally. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 13: </span> Sale of
                  Property During Lease If the Lessor intends to sell the leased
                  property before the end of the lease term, the Lessor shall
                  notify the Lessee at least one month in advance, including the
                  buyer and sale price, so that the Lessee has an opportunity to
                  purchase first, if appropriate. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 14: </span> Legal
                  Compliance The Lessee shall not use the unit for any illegal
                  activities. The Lessee shall be fully responsible for any
                  violation. <br />
                  <br />
                  &ensp;&ensp;&ensp;
                  <span className="font-bold">Clause 15: </span> Understanding
                  and Signatures Both parties have read and fully understood the
                  terms of this Agreement and sign in the presence of witnesses.
                  This Agreement is made in two identical copies, with each
                  party retaining one copy. <br />
                  <br />
                  <br />
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  Lessor &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  <input
                    disabled
                    className="outline-none border-b-2 border-black bg-white w-[280px]"
                  />{" "}
                  Lessee
                  <br />
                  ( &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;) 
                 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  ( &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  <br /><br />
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
                  ( &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;) 
                 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                  ( &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;)
                  <br /><br /><br />
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

        <Button onClick={saveRentalContract}>Save Contract</Button>
      </div>
    </div>
  );
}

export function InputForm({ value, onChange, minWidth = 80 }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      style={{ width: `${minWidth}px` }}
      className="outline-none border-b border-gray-300 text-center"
    />
  );
}
