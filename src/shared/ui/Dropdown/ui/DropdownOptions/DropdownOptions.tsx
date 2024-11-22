import React from 'react';

import { DropdownOption } from '../../model/DropdownTypes';

import styles from './DropdownOptions.module.css';

interface DropdownOptionsProps {
	option: DropdownOption;
	onClick: (value: DropdownOption) => void;
	isSelected: boolean;
}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({ option, onClick, isSelected }) => {
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

export default DropdownOptions;
