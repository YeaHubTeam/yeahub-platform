import React from 'react';

import { DropdownOptionType } from '../../model/DropdownTypes';

import styles from './DropdownOption.module.css';

interface DropdownOptionProps {
	option: DropdownOptionType;
	onClick: (value: DropdownOptionType) => void;
	isSelected: boolean;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({ option, onClick, isSelected }) => {
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			onClick(option);
		}
	};

	return (
		<li
			key={option.value}
			className={styles['dropdown-option']}
			onClick={() => onClick(option)}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role="option"
			aria-selected={isSelected}
		>
			{option.label}
		</li>
	);
};

export default DropdownOption;
