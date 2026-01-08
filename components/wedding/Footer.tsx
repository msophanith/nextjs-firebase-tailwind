import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#8B0000] text-white py-12 text-center">
      <h2
        className="text-4xl font-bold mb-4"
        style={{ fontFamily: "Great Vibes, cursive" }}
      >
        Sokha & Devi
      </h2>
      <p className="text-white/60 text-sm">{t.footer.thanks}</p>
    </footer>
  );
}
