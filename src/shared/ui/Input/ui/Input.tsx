import classNames from 'classnames';
import React, { useRef, forwardRef } from 'react';

import Magnifier from '@/shared/assets/icons/Magnifer.svg';
import { Size, Variant } from '@/shared/ui/Input/model/types/InputTypes';

import styles from './Input.module.css';

interface InputProps extends Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'prefix'> {
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	size?: Size;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	error?: boolean;
	label?: string;
	variant?: Variant;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			prefix,
			suffix,
			size = 'L',
			disabled = false,
			className,
			placeholder = '',
			error = false,
			label = '',
			variant = 'input',
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
				[styles[`wrapper-${size.toLowerCase()}`]]: size,
				[styles['dropdown']]: variant === 'dropdown',
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
					{prefix || <Magnifier className={styles.prefix} />}
				</span>

				<input
					ref={setRef}
					placeholder={placeholder}
					className={variant === 'input' ? styles.input : `${styles.input} ${styles['dropdown']}`}
					type="text"
					disabled={disabled}
					aria-invalid={error}
					aria-labelledby={label}
					aria-label={label}
					readOnly={variant === 'dropdown'}
					{...props}
				/>

				{suffix && <span className={styles['input-suffix']}>{suffix}</span>}
			</div>
		);
	},
);

Input.displayName = 'Input';
