import classNames from 'classnames';
import React, { useRef, forwardRef } from 'react';

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

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			customPrefix,
			suffix,
			customSize = 'L',
			disabled = false,
			className,
			placeholder = '',
			error = false,
			label = '',
			...props
		},
		ref,
	) => {
		const inputRef = useRef<HTMLInputElement | null>(null);

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

		const setRef = (element: HTMLInputElement) => {
			inputRef.current = element;
			if (typeof ref === 'function') {
				ref(element);
			} else if (ref) {
				(ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
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
				<span className={styles['input-prefix']}>
					{customPrefix || <Magnifer className={styles.prefix} />}
				</span>
				<input
					ref={setRef}
					placeholder={placeholder}
					type="text"
					className={styles.input}
					disabled={disabled}
					aria-invalid={error}
					aria-labelledby={label}
					aria-label={label}
					{...props}
				/>
				{suffix && <span className={styles['input-suffix']}>{suffix}</span>}
			</div>
		);
	},
);

Input.displayName = 'Input';
