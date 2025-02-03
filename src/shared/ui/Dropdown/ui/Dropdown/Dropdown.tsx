import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';

import Arrow from '@/shared/assets/icons/ArrowSelect.svg';
import Lens from '@/shared/assets/icons/Magnifer.svg';

import { DropdownSize } from '../../model/DropdownTypes';
import { OptionProps } from '../Option/Option';
import { Select } from '../Select/Select';

import styles from './Dropdown.module.css';

interface DropdownProps
	extends Omit<React.HTMLProps<HTMLDivElement>, 'prefix' | 'size' | 'onSelect'> {
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	size?: DropdownSize;
	children: React.ReactNode;
	className?: string;
	onSelect?: (value: string | number) => void;
	multiple?: boolean;
	selectedValues?: (string | number)[];
}

export const Dropdown = ({
	label = '',
	disabled = false,
	prefix,
	suffix,
	size = 'L',
	className,
	children,
	onSelect,
	multiple = false,
	selectedValues = [],
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleOutsideClick = (e: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, []);

	const handleOptionClick = (value: string | number) => {
		if (onSelect) onSelect(value);

		if (!multiple) setIsOpen(false);
	};
	return (
		<div className={classNames(styles.dropdown, className)} ref={dropdownRef}>
			<Select
				size={size}
				prefix={prefix || <Lens className={styles.suffix} />}
				suffix={
					suffix || <Arrow className={classNames(styles.suffix, { [styles.active]: isOpen })} />
				}
				disabled={disabled}
				onClick={toggleDropdown}
				isOpen={isOpen}
				label={label}
			/>
			{isOpen && (
				<div
					role="listbox"
					className={classNames(styles.list, styles[`list-${size.toLowerCase()}`])}
				>
					{React.Children.map(children, (child) =>
						React.cloneElement(child as React.ReactElement<OptionProps>, {
							onClick: () =>
								handleOptionClick((child as React.ReactElement<OptionProps>).props.value),
							isSelected: selectedValues.includes(
								(child as React.ReactElement<OptionProps>).props.value,
							),
						}),
					)}
				</div>
			)}
		</div>
	);
};

Dropdown.displayName = 'Dropdown';
