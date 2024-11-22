import classNames from 'classnames';
import { forwardRef, useState } from 'react';

import { DropdownOption, Size } from '../../model/DropdownTypes';
import DropdownOptions from '../DropdownOptions/DropdownOptions';

import styles from './DropdownMenu.module.css';

const HEIGHT_VALUE_S = 184;
const HEIGHT_VALUE_L = 276;

interface DropdownMenuProps {
	size: Size;
	setIsOpen: (isOpen: boolean) => void;
	onChange?: (value: string | number) => void;
	options: DropdownOption[];
	inputRef: React.RefObject<HTMLInputElement>;
}

const DropdownMenu = forwardRef<HTMLUListElement, DropdownMenuProps>(
	({ size, setIsOpen, onChange, options, inputRef }, ref) => {
		const dropdownStyle = classNames(
			styles['dropdown-content'],
			size === 'S' ? styles['option-s'] : styles['option-l'],
		);

		const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

		const handleOptionClick = (option: DropdownOption) => {
			setSelectedOption(option);
			if (onChange) {
				onChange(option.value);
			}
			setIsOpen(false);
		};

		const dropdownPosition = () => {
			if (inputRef.current) {
				const rect = inputRef.current.getBoundingClientRect();
				const headerRect = document.querySelector('header')?.getBoundingClientRect();
				const spaceAbove = headerRect ? rect.top - headerRect.bottom : 0;
				const spaceBelow = window.innerHeight - rect.bottom;
				const heightValue = size === 'S' ? HEIGHT_VALUE_S : HEIGHT_VALUE_L;

				if (spaceAbove >= heightValue) {
					return styles['dropdown-position-top'];
				} else if (spaceBelow >= heightValue) {
					return styles['dropdown-position-bottom'];
				} else {
					return styles['dropdown-position-bottom'];
				}
			}
			return styles['dropdown-position-bottom'];
		};

		const positionStyle = dropdownPosition();

		return (
			<ul ref={ref} className={`${dropdownStyle} ${positionStyle}`} role="listbox">
				{options.map((option) => (
					<DropdownOptions
						key={option.value}
						option={option}
						onClick={handleOptionClick}
						isSelected={selectedOption?.value === option.value}
					/>
				))}
			</ul>
		);
	},
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
