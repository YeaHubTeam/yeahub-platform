import React, { useState, useRef, useEffect } from 'react';

import Arrow from '@/shared/assets/icons/ArrowSelect.svg';
import { Input } from '@/shared/ui/Input';

import { DropdownOptionType, Size } from '../../model/DropdownTypes';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

import styles from './Dropdown.module.css';

interface DropdownProps
	extends Omit<React.HTMLProps<HTMLDivElement>, 'prefix' | 'size' | 'onChange'> {
	label: string;
	disabled?: boolean;
	options: DropdownOptionType[];
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	size?: Size;
	error?: boolean;
	onChange?: (value: string | number) => void;
	selectedOption?: DropdownOptionType | null;
	setSelectedOption?: (option: DropdownOptionType) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
	label,
	disabled = false,
	options,
	prefix,
	suffix,
	size = 'L',
	error = false,
	onChange,
	selectedOption,
	setSelectedOption,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
		}
	};

	const handleSelectOption = (option: DropdownOptionType) => {
		if (setSelectedOption) {
			setSelectedOption(option);
		}
		if (onChange) {
			onChange(option.value);
		}

		setIsOpen(false);
	};

	return (
		<div {...props}>
			<div
				className={styles.dropdown}
				ref={dropdownRef}
				tabIndex={0}
				role="button"
				onClick={toggleDropdown}
				onKeyDown={handleKeyDown}
			>
				<Input
					ref={inputRef}
					variant="dropdown"
					size={size}
					placeholder={label}
					prefix={prefix}
					suffix={
						suffix || (
							<Arrow
								className={`${isOpen ? `${styles.suffix} ${styles.active}` : styles.suffix}`}
							/>
						)
					}
					error={error}
					disabled={disabled}
				/>

				{isOpen && (
					<DropdownMenu
						size={size}
						options={options}
						inputRef={inputRef}
						selectedOption={selectedOption}
						onSelect={handleSelectOption}
					/>
				)}
			</div>
		</div>
	);
};

Dropdown.displayName = 'Dropdown';
