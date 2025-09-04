"use client";

import { Header } from "@/components/header";
import { useLanguage } from "@/contexts/language-context";

export default function PrivacyPolicy() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-4 px-4">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {t("privacyPolicy")} – NainaHub
          </h1>

          {language === "en" ? (
            <section className="mb-12">
              <p className="mb-4">
                At <strong>NainaHub</strong>, your privacy is important to us.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our website and
                services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                1. Information We Collect
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Personal Information</strong>: Name, email address,
                  phone number, agency/company information, and details you
                  provide.
                </li>
                <li>
                  <strong>Usage Data</strong>: IP address, browser type, device
                  information, pages visited, and usage patterns.
                </li>
                <li>
                  <strong>Property and Transaction Data</strong>: Property
                  details, client data, and transaction records managed via
                  NainaHub.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                2. How We Use Your Information
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and improve our real estate tools and services.</li>
                <li>Personalize user experience and recommendations.</li>
                <li>Communicate updates, promotions, or important notices.</li>
                <li>
                  Ensure website security and prevent fraudulent activities.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                3. Sharing of Information
              </h3>
              <p>
                We do not sell or rent your personal information. However, we
                may share information with service providers, legal authorities,
                or business partners with your consent.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                4. Data Security
              </h3>
              <p>
                We use appropriate technical and organizational measures to
                protect your data. However, no internet transmission is 100%
                secure.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                5. User Rights
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access, correct, or delete your personal data.</li>
                <li>Withdraw consent for data processing.</li>
                <li>Contact us regarding privacy concerns.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                6. Cookies and Tracking
              </h3>
              <p>
                NainaHub uses cookies and similar technologies to enhance your
                browsing experience and analyze traffic.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                7. Changes to This Policy
              </h3>
              <p>
                We may update this Privacy Policy from time to time. Updates
                will be posted on this page with a revised effective date.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h3>
              <p>
                📧 Email: nainahub.service@gmail.com <br />
                📍 Address: 317/1 Sukhumvit 66/1 Rd, Yaek 13, Bang Chak Subdistrict, Phra Khanong District, Bangkok
              </p>
            </section>
          ) : (
            <section>
              <p className="mb-4">
                ที่ <strong>NainaHub</strong>{" "}
                เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ
                นโยบายนี้อธิบายถึงวิธีการที่เราจัดเก็บ ใช้ เปิดเผย
                และปกป้องข้อมูลของคุณเมื่อคุณใช้เว็บไซต์และบริการของเรา
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                1. ข้อมูลที่เราเก็บรวบรวม
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>ข้อมูลส่วนบุคคล</strong>: ชื่อ อีเมล หมายเลขโทรศัพท์
                  ข้อมูลบริษัท และรายละเอียดที่คุณให้ไว้
                </li>
                <li>
                  <strong>ข้อมูลการใช้งาน</strong>: ที่อยู่ IP ประเภทเบราว์เซอร์
                  ข้อมูลอุปกรณ์ หน้าที่เข้าชม และรูปแบบการใช้งาน
                </li>
                <li>
                  <strong>ข้อมูลอสังหาริมทรัพย์และธุรกรรม</strong>:
                  ข้อมูลอสังหาริมทรัพย์ ลูกค้า และธุรกรรมที่คุณจัดการผ่าน
                  NainaHub
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                2. วัตถุประสงค์ในการใช้ข้อมูล
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>ให้บริการและพัฒนาเครื่องมืออสังหาริมทรัพย์</li>
                <li>ปรับแต่งประสบการณ์ผู้ใช้งาน</li>
                <li>สื่อสารข่าวสาร โปรโมชั่น หรือประกาศสำคัญ</li>
                <li>รักษาความปลอดภัยและป้องกันการทุจริต</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                3. การเปิดเผยข้อมูล
              </h3>
              <p>
                เรา<strong>ไม่ขายหรือให้เช่าข้อมูลส่วนบุคคล</strong>{" "}
                อย่างไรก็ตาม อาจมีการแบ่งปันข้อมูลกับผู้ให้บริการ
                หน่วยงานทางกฎหมาย หรือพันธมิตรทางธุรกิจเมื่อคุณให้ความยินยอม
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                4. การรักษาความปลอดภัยข้อมูล
              </h3>
              <p>
                เรามีมาตรการด้านเทคนิคและการจัดการเพื่อปกป้องข้อมูลของคุณ
                แต่อย่างไรก็ตาม
                การส่งข้อมูลผ่านอินเทอร์เน็ตไม่สามารถรับประกันได้ 100%
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                5. สิทธิของผู้ใช้งาน
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>เข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคล</li>
                <li>ถอนความยินยอมในการประมวลผลข้อมูล</li>
                <li>ติดต่อเราเกี่ยวกับข้อกังวลด้านความเป็นส่วนตัว</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                6. คุกกี้และการติดตาม
              </h3>
              <p>
                NainaHub
                ใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อปรับปรุงประสบการณ์การใช้งานและวิเคราะห์การเข้าชมเว็บไซต์
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                7. การเปลี่ยนแปลงนโยบายนี้
              </h3>
              <p>
                เราอาจปรับปรุงนโยบายความเป็นส่วนตัวเป็นครั้งคราว
                โดยจะแจ้งให้ทราบบนหน้านี้พร้อมวันที่มีผลบังคับใช้ใหม่
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">8. ติดต่อเรา</h3>
              <p>
                📧 อีเมล: nainahub.service@gmail.com <br />
                📍 ที่อยู่: 317/1 ถ.สุขุมวิท 66/1 แยก 13 แขวง บางจาก เขต พระโขนง กรุงเทพฯ
              </p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
