import classNames from 'classnames';
import React, { useRef, forwardRef } from 'react';

import { Size } from '@/shared/ui/Input/InputTypes';

import styles from './Input.module.css';

export interface InputProps extends Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'prefix'> {
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	size?: Size;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	error?: boolean;
	label?: string;
	dataTestId?: string;
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
			dataTestId = 'Input_Field',
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
			},
			className,
		);

		const handleClick = () => {
			if (inputRef.current && !disabled) {
				inputRef.current.focus();
			}
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
				data-testid="Input_Wrapper"
			>
				<span
					data-testid="Input_Prefix"
					className={classNames({
						[styles['without-prefix']]: !prefix,
						[styles['input-prefix']]: !!prefix,
					})}
				>
					{prefix}
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
					data-testid={dataTestId}
					{...props}
				/>
				{suffix && (
					<span data-testid="Input_Suffix" className={styles['input-suffix']}>
						{suffix}
					</span>
				)}
			</div>
		);
	},
);

Input.displayName = 'Input';
