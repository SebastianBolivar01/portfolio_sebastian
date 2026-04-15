"use client";

import { useState, useEffect } from "react";
import { translations, Lang } from "../i18n";

export function useLanguage() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Lang;
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
  }, []);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Lang;
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = translations[lang];

  return { lang, t, handleLangChange };
}
