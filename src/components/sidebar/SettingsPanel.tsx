import React from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarPanel } from './SidebarPanel';
import styles from './SettingsPanel.module.css';
import { PersistentField } from '../util/PersistentField';
import { useComponentTranslation } from '../../i18n';

export const SettingsPanel: React.FC = () => {
    const { t } = useComponentTranslation(SettingsPanel);
    const { i18n } = useTranslation();

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value);
    };

    return (
        <SidebarPanel
            header={t('settings')}
            classNames={{ body: styles.body }}
            collapsedByDefault
        >
            <div className={styles.settingItem}>
                <PersistentField
                    type='select'
                    label={t('language')}
                    storageKey='language'
                    value={i18n.language}
                    onChange={handleLanguageChange}
                    options={[
                        { value: 'en', label: 'English' },
                        { value: 'ru', label: 'Русский' },
                    ]}
                />
            </div>
        </SidebarPanel>
    );
};
