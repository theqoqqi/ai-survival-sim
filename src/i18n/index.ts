import i18n, { Resource, ResourceLanguage } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';
import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';
import { ResourceKey } from 'i18next/typescript/options';

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
                en: prepareTranslations(en),
                ru: prepareTranslations(ru),
            }
        });
}

function prepareTranslations(json: Record<string, string>): Resource {
    return {
        translation: nestTranslations(json),
    };
}

function nestTranslations(flatJson: Record<string, string>): ResourceLanguage {
    const result: ResourceLanguage = Object.assign({}, flatJson);

    for (const fullKey of Object.keys(flatJson)) {
        const value = flatJson[fullKey];
        const parts = fullKey.split('.');

        let cursor: ResourceKey = result;

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
