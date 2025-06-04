import React from 'react';
import styles from './PersistentField.module.css';

interface PersistentFieldProps {
    type?: string;
    label: string;
    storageKey: string;
    value: string | number | boolean;
    onChange: (value: string) => void;
}

export const PersistentField: React.FC<PersistentFieldProps> = ({
    type,
    label,
    storageKey,
    value,
    onChange,
}) => {
    React.useEffect(() => {
        const stored = localStorage.getItem(storageKey);

        if (stored !== null && stored !== value) {
            onChange(stored);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const stringValue = String(value);

        if (stringValue !== '') {
            localStorage.setItem(storageKey, stringValue);
        }
    }, [storageKey, value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = type === 'checkbox'
            ? String((e.target as HTMLInputElement).checked)
            : e.target.value;

        localStorage.setItem(storageKey, newValue);

        onChange(newValue);
    };

    const inputProps = {
        type,
        value: type === 'checkbox' ? undefined : String(value),
        checked: type === 'checkbox' ? (value as boolean) : undefined,
        onChange: handleChange,
    };

    return (
        <label className={styles.persistentField + ' ' + (type === 'checkbox' ? styles.checkbox : '')}>
            {type === 'checkbox' && <>
                <input {...inputProps} />
                <span>{label}</span>
            </>}

            {type === 'textarea' && <>
                <div>{label}:</div>
                <textarea {...inputProps} rows={3} />
            </>}

            {type !== 'checkbox' && type !== 'textarea' && <>
                <div>{label}:</div>
                <input {...inputProps} />
            </>}
        </label>
    );
};
