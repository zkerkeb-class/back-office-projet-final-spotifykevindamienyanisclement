/* eslint-disable react/button-has-type */

import Image from 'next/image';
import { FC, SVGProps } from 'react';
import styles from './index.module.scss';
import Loading from '../Loading';

interface IButton {
  type?: 'button' | 'submit' | 'reset'; // Added type prop
  title: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  className:
    | 'btn'
    | 'btn__primary'
    | 'btn__settings'
    | 'btn__secondary'
    | 'btn__important'
    | 'btn__big'
    | 'btn__big__secondary'
    | 'btn__remove'
    | 'btn__register'
    | 'btn__icon__selected'
    | 'btn__icon__unselected'
    | 'btn__icon__back'
    | 'btn__icon__back__background'
    | 'btn__icon__item'
    | 'btn__ternary';
  disabled?: boolean;
  name?: string;
  value?: string;
  image?: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  active?: boolean;
  loading?: boolean;
}

function Index({
  type = 'button', // Default value added
  title,
  handleClick,
  className,
  disabled,
  name,
  value,
  image,
  Icon,
  active,
  loading,
}: IButton) {
  return (
    <button
      value={value}
      type={type} // Now using prop instead of hardcoded value
      name={name}
      onClick={handleClick}
      disabled={!!disabled}
      className={`${styles.btn} ${styles[className]}`}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          width={20}
          height={20}
          className={styles.image}
        />
      )}
      {Icon && active && (
        <Icon width={20} height={20} className={styles.icon} />
      )}
      {Icon && !active && (
        <Icon width={20} height={20} className={styles.icon__close} />
      )}
      {title && <p className={styles.title}>{title}</p>}
      {loading && <Loading isLoad color="black" width={40} height={40} />}
    </button>
  );
}

Index.defaultProps = {
  type: 'button',
  handleClick: undefined,
  disabled: false,
  name: '',
  value: '',
  image: '',
  Icon: undefined,
  active: false,
  loading: false,
};

export default Index;
