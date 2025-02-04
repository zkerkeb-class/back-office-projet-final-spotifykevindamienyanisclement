import { ChangeEvent } from 'react';
import styles from './index.module.scss';

interface IInput {
  label?: string;
  type: string;
  name: string;
  value: string | number;
  isRequired?: boolean;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  min?: number | string;
  max?: number | string;
  minLenght?: number;
  maxLength?: number;
  style?: React.CSSProperties;
}

function Index({
  label,
  type,
  name,
  value,
  isRequired,
  placeholder,
  onChange,
  accept,
  min,
  max,
  minLenght,
  maxLength,
  style,
}: IInput) {
  // When the type is 'file', we use a label to display the custom text and an input of type 'file' for file upload
  if (type === 'file') {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} style={style}>
            {label}
          </label>
        )}
        <input
          name={name}
          type="file"
          onChange={onChange}
          accept={accept}
          id={name}
        />
        <label htmlFor={name} style={style} className={styles.fileInputLabel}>
          {value || placeholder || 'Aucun fichier choisi'}
        </label>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} style={style}>
          {label}
        </label>
      )}
      <input
        name={name}
        value={value}
        required={isRequired}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        accept={accept}
        min={min}
        max={max}
        maxLength={minLenght}
        minLength={maxLength}
        style={style}
      />
    </div>
  );
}

Index.defaultProps = {
  label: '',
  isRequired: false,
  placeholder: '',
  accept: '',
  min: '',
  max: '',
  minLenght: 0,
  maxLength: 0,
  style: {},
};

export default Index;
