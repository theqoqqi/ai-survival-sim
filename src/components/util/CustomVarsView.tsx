import { CustomVar, CustomVars } from '../../core/util/CustomVars';
import React from 'react';
import { useComponentTranslation } from '../../i18n';
import styles from './CustomVarsView.module.css';

interface CustomVarsViewProps {
    customVars: CustomVars;
}

export const CustomVarsView: React.FC<CustomVarsViewProps> = ({ customVars }) => {
    const { t } = useComponentTranslation('CustomVarsView');

    return (
        <div className={styles.customVars}>
            <div className={styles.customVarsTitle}>{t('title')}</div>
            {customVars.size === 0 && <div className={styles.empty}>{t('empty')}</div>}
            {customVars.size > 0 && (
                <div className={styles.customVarsList}>
                    {customVars.map((id: string, varItem: CustomVar) => (
                        <div key={id} className={styles.customVarItem}>
                            <div className={styles.customVarIcon}>{varItem.icon}</div>
                            <div className={styles.customVarTitle}>{varItem.title}</div>
                            <div className={styles.customVarValue}>{varItem.value}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
