import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: await load('en'),
            ru: await load('ru'),
        }
    });

async function load(locale: string) {
    const jsonFile = `./locales/${locale}/translation.json`;

    return (await import(jsonFile)).default;
}
