import classNames from 'classnames';
import React, { useState } from 'react';

import Arrow from '@/shared/assets/icons/ArrowSelect.svg';
import Lens from '@/shared/assets/icons/Magnifer.svg';
import { useOutsideClick } from '@/shared/hooks';

import { DropdownSize } from '../DropdownTypes';
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
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

	const onSelectClick = () => {
		if (!disabled) setIsOpen((prev) => !prev);
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
				onClick={onSelectClick}
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
							onClick: () => {
								if (onSelect && 'value' in (child as React.ReactElement<OptionProps>).props) {
									onSelect((child as React.ReactElement<OptionProps>).props.value);
								}
								if (!multiple) setIsOpen(false);
							},
						}),
					)}
				</div>
			)}
		</div>
	);
};

Dropdown.displayName = 'Dropdown';
