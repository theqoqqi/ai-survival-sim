import React from 'react';
import styles from './PersistentField.module.css';

interface SelectOption {
    value: string;
    label: string;
}

interface PersistentFieldProps {
    type?: string;
    label: string;
    storageKey: string;
    value: string | number | boolean;
    onChange: (value: string) => void;
    options?: SelectOption[];
}

export const PersistentField: React.FC<PersistentFieldProps> = ({
    type,
    label,
    storageKey,
    value,
    onChange,
    options = [],
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <label className={styles.persistentField + ' ' + styles[type]}>
            {type === 'checkbox' && <>
                <input {...inputProps} />
                <span>{label}</span>
            </>}

            {type === 'textarea' && <>
                <div>{label}:</div>
                <textarea {...inputProps} rows={3} />
            </>}

            {type === 'select' && <>
                <div>{label}:</div>
                <select {...inputProps}>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </>}

            {type !== 'checkbox' && type !== 'textarea' && type !== 'select' && <>
                <div>{label}:</div>
                <input {...inputProps} />
            </>}
        </label>
    );
};
