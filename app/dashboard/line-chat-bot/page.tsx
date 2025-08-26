"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Copy,
  Check,
  MessageCircle,
  Users,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";

export default function LineChatBot() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchLineCode() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/line-chat-bot`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const data = await res.json();

      setUserData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLineCode();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userData?.lineCode);
      setCopied(true);
      toast({
        title: "Code copied!",
        description: "The 5-digit code has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the code manually.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        </div>
      </div>
    )
  }
  if (error) return <div>Error...</div>;


  return (
    <div className="w-full pt-4 space-y-6">
      <Card className="shadow-xl border-0 bg-white backdrop-blur-sm overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-8">
          <CardTitle className="text-3xl font-bold text-white mb-2">
            {t("line.title")}
          </CardTitle>
          <CardDescription className="text-cyan-100 text-lg">
            {t("line.description")}
          </CardDescription>
        </div>
        <CardContent className="p-8">
          {userData?.isEnableLine ? (
            <div className="text-center space-y-6">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-lg opacity-20"></div>
                <div className="relative bg-gradient-to-br from-green-800 to-green-900 p-6 rounded-2xl border border-green-700 shadow-2xl">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <span className="text-2xl font-bold text-white block mb-2">
                    ยืนยันรหัสสำเร็จ
                  </span>
                  <span className="text-green-300 text-lg">
                    รหัส: {userData?.lineCode}
                  </span>
                </div>
              </div>
              <div className="text-center space-y-2 pt-6 border-t border-slate-200">
                <p className="text-slate-700 font-medium">
                  ✅ รหัสของคุณได้ถูกยืนยันแล้ว
                </p>
                {/* <p className="text-slate-500 text-sm">
                  รหัสนี้ได้ถูกใช้งานแล้วและไม่สามารถใช้ซ้ำได้
                </p> */}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl blur-lg opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl">
                    <span className="text-4xl font-mono font-black text-white tracking-[0.3em] drop-shadow-lg">
                      {userData?.lineCode || ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <Button
                  onClick={handleCopy}
                  className={`px-6 py-3 text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    copied
                      ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                      : "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 shadow-cyan-200"
                  } shadow-lg`}
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      {t("line.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      {t("line.copy")}
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center space-y-2 pt-6 border-t border-slate-200">
                <p className="text-slate-700 font-medium">
                  {t("line.instruction")}
                </p>
                <p className="text-slate-500 text-sm">{t("line.warning")}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* How to Use in Line Chat Bot */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            {t("line.howToUse")}
          </CardTitle>
          <CardDescription className="text-slate-600">
            {t("line.explain")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-800 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t("line.step1")}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {t("line.step1explain")}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-800">
                  {t("line.step2")}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {t("line.step2explain")}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-800">
                  {t("line.step3")}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {t("line.step3explain")}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-800 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  {t("line.step4")}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {t("line.step4explain")}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {t("line.tips")}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {t("line.tipsexplain")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
