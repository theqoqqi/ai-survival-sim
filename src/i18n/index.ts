import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';

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

export function useComponentTranslation(component: any, namespace = 'translation') {
    const { t: originalT, ...rest } = useTranslation(namespace);

    const componentName =
        typeof component === 'string'
            ? component
            : component.name || 'UnknownComponent';

    const t = React.useCallback((key, options = {} as any) => {
        const fullKey = key.includes('.')
            ? key
            : `components.${componentName}.${key}`;

        return originalT(fullKey, options);
    }, [originalT, componentName]);

    return { t, ...rest };
}
