import classNames from 'classnames';
import React from 'react';

import { DropdownSize } from '../DropdownTypes';

import styles from './Select.module.css';

export interface SelectProps {
	size?: DropdownSize;
	prefix: React.ReactNode;
	suffix: React.ReactNode;
	className?: string;
	disabled?: boolean;
	label: string;
	isOpen?: boolean;
	onClick: () => void;
	width?: number | string;
	value?: string;
}

export const Select = ({
	size = 'L',
	disabled = false,
	className,
	label,
	isOpen,
	onClick,
	prefix,
	suffix,
	width,
	value,
}: SelectProps) => {
	const wrapperClasses = classNames(
		styles.wrapper,
		styles.dropdown,
		{
			[styles['wrapper-disabled']]: disabled,
			[styles[`wrapper-${size.toLowerCase()}`]]: size,
		},
		className,
	);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!disabled) {
			e.preventDefault();
			onClick();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (disabled) return;

		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<div
			className={wrapperClasses}
			style={{ width }}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role="button"
			aria-expanded={isOpen}
			tabIndex={0}
			data-testid="dropdown-select"
		>
			{prefix && <span className={styles['select-prefix']}>{prefix}</span>}

			<span
				className={classNames(styles.button, {
					[styles['with-value']]: value,
				})}
			>
				{value || label}
			</span>

			{suffix && <span className={styles['select-suffix']}>{suffix}</span>}
		</div>
	);
};
