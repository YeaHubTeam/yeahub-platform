import classNames from 'classnames';
import { forwardRef } from 'react';

import { DropdownOptionType, Size } from '../../model/DropdownTypes';
import DropdownOption from '../DropdownOption/DropdownOption';

import styles from './DropdownMenu.module.css';

const HEIGHT_VALUE_S = 184;
const HEIGHT_VALUE_L = 276;

interface DropdownMenuProps {
	size: Size;
	options: DropdownOptionType[];
	inputRef: React.RefObject<HTMLInputElement>;
	selectedOption?: DropdownOptionType | null;
	onSelect?: (option: DropdownOptionType) => void;
}

const DropdownMenu = forwardRef<HTMLUListElement, DropdownMenuProps>(
	({ size, options, inputRef, selectedOption, onSelect }, ref) => {
		const dropdownStyle = classNames(
			styles['dropdown-content'],
			size === 'S' ? styles['option-s'] : styles['option-l'],
		);

		const handleOptionClick = (option: DropdownOptionType) => {
			if (onSelect) {
				onSelect(option);
			}
		};

		const dropdownPosition = () => {
			if (!inputRef.current) {
				return styles['dropdown-position-bottom'];
			}

			const rect = inputRef.current.getBoundingClientRect();
			const headerRect = document.querySelector('header')?.getBoundingClientRect();
			const spaceAbove = headerRect ? rect.top - headerRect.bottom : 0;
			const spaceBelow = window.innerHeight - rect.bottom;
			const heightValue = size === 'S' ? HEIGHT_VALUE_S : HEIGHT_VALUE_L;

			if (spaceAbove >= heightValue) {
				return styles['dropdown-position-top'];
			}

			if (spaceBelow >= heightValue) {
				return styles['dropdown-position-bottom'];
			}

			return styles['dropdown-position-bottom'];
		};

		const positionStyle = dropdownPosition();

		return (
			<ul ref={ref} className={`${dropdownStyle} ${positionStyle}`} role="listbox">
				{options.map((option) => (
					<DropdownOption
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
