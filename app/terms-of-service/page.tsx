"use client";

import { Header } from "@/components/header";
import { useLanguage } from "@/contexts/language-context";

export default function TermsOfService() {
  const { language, t } = useLanguage();
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-4 px-4">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {t("termsOfService")} – NainaHub
          </h1>
          {/* <p className="text-center text-gray-500 mb-12">
            Effective Date: [Insert Date]
          </p> */}

          {/* English Version */}
          {language === "en" ? (
            <section className="mb-12">
              <p className="mb-4">
                By accessing and using <strong>NainaHub</strong>, you agree to
                the following Terms of Service. Please read them carefully.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                1. Use of Services
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  NainaHub provides tools and resources for real estate agents
                  and related professionals.
                </li>
                <li>
                  You agree to use the platform only for lawful purposes and in
                  compliance with applicable laws.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                2. User Accounts
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  You must provide accurate information when creating an
                  account.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your login credentials.
                </li>
                <li>
                  You agree to notify us immediately of any unauthorized use of
                  your account.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                3. Content and Responsibility
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  You are solely responsible for the content you upload or share
                  through NainaHub.
                </li>
                <li>
                  You represent that you have the necessary rights to post such
                  content.
                </li>
                <li>
                  We may remove or restrict access to content that violates our
                  policies or the law.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                4. Limitation of Liability
              </h3>
              <p>
                NainaHub is provided &quot;as is&quot; without warranties of any
                kind. We are not liable for any damages resulting from your use
                of the platform.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                5. Termination
              </h3>
              <p>
                We may suspend or terminate your access to NainaHub if you
                violate these Terms of Service or engage in unlawful activity.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">6. Changes</h3>
              <p>
                We may update these Terms of Service from time to time. Updates
                will be posted on this page with a revised effective date.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h3>
              <p>
                📧 Email: nainahub.service@gmail.com <br />
                📍 Address: 317/1 Sukhumvit 66/1 Rd, Yaek 13, Bang Chak Subdistrict, Phra Khanong District, Bangkok
              </p>
            </section>
          ) : (
            <section>
              <p className="mb-4">
                เมื่อคุณเข้าถึงและใช้งาน <strong>NainaHub</strong>{" "}
                ถือว่าคุณยอมรับ เงื่อนไขการให้บริการดังต่อไปนี้
                กรุณาอ่านอย่างละเอียด
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                1. การใช้งานบริการ
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  NainaHub
                  ให้บริการเครื่องมือและทรัพยากรสำหรับนายหน้าและผู้เชี่ยวชาญด้านอสังหาริมทรัพย์
                </li>
                <li>
                  คุณตกลงที่จะใช้แพลตฟอร์มเพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมาย
                  และสอดคล้องกับกฎหมายที่เกี่ยวข้อง
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                2. บัญชีผู้ใช้งาน
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>คุณต้องให้ข้อมูลที่ถูกต้องเมื่อสร้างบัญชีผู้ใช้</li>
                <li>
                  คุณมีหน้าที่รับผิดชอบในการเก็บรักษาความลับของข้อมูลเข้าสู่ระบบ
                </li>
                <li>
                  คุณตกลงที่จะแจ้งให้เราทราบทันทีหากมีการใช้งานบัญชีโดยไม่ได้รับอนุญาต
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                3. เนื้อหาและความรับผิดชอบ
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  คุณเป็นผู้รับผิดชอบต่อเนื้อหาที่คุณอัปโหลดหรือแชร์ผ่าน
                  NainaHub
                </li>
                <li>
                  คุณยืนยันว่าคุณมีสิทธิ์ในการโพสต์เนื้อหานั้นอย่างถูกต้อง
                </li>
                <li>
                  เรามีสิทธิ์ในการลบหรือจำกัดการเข้าถึงเนื้อหาที่ละเมิดนโยบายหรือกฎหมาย
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                4. ข้อจำกัดความรับผิด
              </h3>
              <p>
                NainaHub ให้บริการตามสภาพที่เป็นอยู่ (“as is”)
                โดยไม่มีการรับประกันใด ๆ และไม่รับผิดชอบต่อความเสียหายใด ๆ
                ที่เกิดจากการใช้งานแพลตฟอร์มของคุณ
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                5. การยุติการให้บริการ
              </h3>
              <p>
                เราอาจระงับหรือยกเลิกการเข้าถึง NainaHub ของคุณได้
                หากคุณละเมิดเงื่อนไขการให้บริการหรือกระทำการที่ไม่ชอบด้วยกฎหมาย
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                6. การเปลี่ยนแปลง
              </h3>
              <p>
                เราอาจปรับปรุงเงื่อนไขการให้บริการเป็นครั้งคราว
                โดยจะแจ้งให้ทราบบนหน้านี้พร้อมวันที่มีผลบังคับใช้ใหม่
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">7. ติดต่อเรา</h3>
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
