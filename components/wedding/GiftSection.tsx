import { Gift, QrCode, Share2, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";

export default function GiftSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[#FDFBF7]"></div>
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src="/khmer-texture.png"
          className="w-full h-full object-cover"
          alt="texture"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#8B0000] mb-6"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            {t.gift.title}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            {t.gift.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Decorative Text/Icon */}
          <div className="hidden md:flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 animate-pulse">
              <Gift className="w-10 h-10 text-[#D4AF37]" />
            </div>
            <h3
              className="text-2xl font-bold text-slate-800"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t.gift.thanks}
            </h3>
            <p className="text-slate-500 italic">{t.gift.thanksSubtitle}</p>
          </div>

          {/* Right Side: The Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-[#D4AF37]/30 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-2xl m-3 opacity-50"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-2xl m-3 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-2xl m-3 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37] rounded-br-2xl m-3 opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* QR Code Frame */}
              <div className="w-48 h-48 bg-white p-2 rounded-xl shadow-inner border border-slate-100 mb-6 relative group/qr">
                <div className="absolute inset-0 border-2 border-[#8B0000]/10 rounded-xl m-1"></div>
                <div className="w-full h-full bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden relative">
                  {/* Placeholder for QR Code - User needs to replace this */}
                  <QrCode className="w-16 h-16 text-[#D4AF37]/50" />
                  {/* <img src="/aba-qr.jpg" alt="ABA QR" className="w-full h-full object-cover" /> */}

                  {/* Overlay for Save/Download */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/qr:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white text-[#8B0000] hover:bg-white/90"
                      onClick={() => {
                        // In a real app, this would download the image
                        alert(
                          "Please replace the placeholder with a real QR image to enable download."
                        );
                      }}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#8B0000] mb-1">
                {t.gift.bank}
              </h3>

              <div className="flex flex-col gap-3 w-full max-w-[280px]">
                <div
                  className="flex items-center justify-between gap-3 bg-[#FDFBF7] px-4 py-2 rounded-full border border-[#D4AF37]/20 cursor-pointer hover:bg-[#D4AF37]/10 transition-colors group/copy"
                  onClick={() => {
                    navigator.clipboard.writeText("000 111 222");
                    // You could add a toast notification here
                  }}
                >
                  <span className="font-mono text-slate-700 text-lg tracking-wider">
                    000 111 222
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/20 flex items-center justify-center group-hover/copy:scale-110 transition-transform">
                    <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all gap-2"
                  onClick={async () => {
                    const shareData = {
                      title: `Wedding Gift - Chan Sokha`,
                      text: `${t.gift.bank}\nAccount: 000 111 222\nName: Chan Sokha`,
                    };
                    try {
                      if (navigator.share) {
                        await navigator.share(shareData);
                      } else {
                        navigator.clipboard.writeText(shareData.text);
                        alert(t.gift.shareToast);
                      }
                    } catch (err) {
                      console.error("Error sharing:", err);
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  {t.gift.shareButton}
                </Button>
              </div>

              <p className="text-sm text-slate-500 font-medium mt-4">
                {t.gift.accountName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
