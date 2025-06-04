import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';

export async function initI18n() {
    return i18n
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
}

async function load(locale: string) {
    const jsonFile = `./locales/${locale}/translation.json`;

    return {
        translation: nestTranslations((await import(jsonFile)).default),
    };
}

function nestTranslations(flatJson) {
    const result = Object.assign({}, flatJson);

    for (const fullKey of Object.keys(flatJson)) {
        const value = flatJson[fullKey];
        const parts = fullKey.split('.');

        let cursor = result;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (i === parts.length - 1) {
                cursor[part] = value;
            } else {
                if (cursor[part] === undefined || typeof cursor[part] !== 'object') {
                    cursor[part] = {};
                }

                cursor = cursor[part];
            }
        }
    }

    return result;
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
