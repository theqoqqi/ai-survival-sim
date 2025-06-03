import React from 'react';
import styles from './PersistentField.module.css';

interface PersistentFieldProps {
    type?: string;
    label: string;
    storageKey: string;
    value: string | number;
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
    }, [onChange, storageKey, value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;

        localStorage.setItem(storageKey, newValue);

        onChange(newValue);
    };

    const inputProps = {
        type,
        value,
        onChange: handleChange,
    };

    return (
        <label className={styles.persistentField}>
            <div>{label}:</div>
            {type === 'textarea' ? (
                <textarea {...inputProps} rows={3} />
            ) : (
                <input {...inputProps} />
            )}
        </label>
    );
};
