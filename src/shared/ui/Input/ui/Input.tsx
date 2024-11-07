import classNames from 'classnames';
import { useRef } from 'react';

import Magnifer from '@/shared/assets/icons/Magnifer.svg';
import { Size } from '@/shared/ui/Input/model/types/InputTypes';

import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	customPrefix?: React.ReactNode;
	suffix?: React.ReactNode;
	customSize?: Size;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	error?: boolean;
	label?: string;
}

export const Input = ({
	customPrefix,
	suffix,
	customSize = 'L',
	disabled = false,
	className,
	placeholder = '',
	error = false,
	label = '',
	...props
}: InputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const wrapperClasses = classNames(
		styles.wrapper,
		{
			[styles['wrapper-disabled']]: disabled,
			[styles['wrapper-error']]: error,
			[styles[`wrapper-${customSize.toLowerCase()}`]]: customSize,
		},
		className,
	);

	const handleClick = () => {
		if (inputRef.current) inputRef.current.focus();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleClick();
		}
	};

	return (
		<div
			className={wrapperClasses}
			onClick={handleClick}
			onFocus={handleClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={disabled ? -1 : 0}
		>
			{
				<span className={styles['input-prefix']}>
					{customPrefix || <Magnifer className={styles.prefix} />}
				</span>
			}
			<input
				ref={inputRef}
				placeholder={placeholder}
				type="text"
				className={styles.input}
				disabled={disabled}
				aria-invalid={error}
				aria-labelledby={label}
				{...props}
			/>
			{suffix && <span className={styles['input-suffix']}>{suffix}</span>}
		</div>
	);
};
