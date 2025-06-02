import React from 'react';
import styles from './PersistentField.module.css';

interface PersistentFieldProps {
    type?: string;
    label: string;
    storageKey: string;
    defaultValue?: string;
    onValueChange: (value: string) => void;
}

export const PersistentField: React.FC<PersistentFieldProps> = ({
    type,
    label,
    storageKey,
    defaultValue = '',
    onValueChange,
}) => {
    const [value, setValue] = React.useState<string>(() => {
        return localStorage.getItem(storageKey) || defaultValue;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        localStorage.setItem(storageKey, newValue);
    };

    React.useEffect(() => {
        onValueChange(value);
    }, [onValueChange, value]);

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
