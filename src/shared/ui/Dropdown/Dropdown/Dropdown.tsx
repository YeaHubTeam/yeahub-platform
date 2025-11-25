import classNames from 'classnames';
import React, { useMemo, useState } from 'react';

import Arrow from '@/shared/assets/icons/ArrowSelect.svg';
import Lens from '@/shared/assets/icons/Magnifer.svg';
import { useOutsideClick } from '@/shared/hooks';

import { DropdownSize } from '../DropdownTypes';
import { OptionProps } from '../Option/Option';
import { Select } from '../Select/Select';

import styles from './Dropdown.module.css';

export interface DropdownProps
	extends Omit<React.HTMLProps<HTMLDivElement>, 'prefix' | 'size' | 'onSelect' | 'value'> {
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	size?: DropdownSize;
	children: React.ReactNode;
	className?: string;
	onSelect?: (value: string | number) => void;
	multiple?: boolean;
	value?: string;
	isInput?: boolean;
	inputValue?: string;
	onChangeValue?: (value: string) => void;
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
	width,
	multiple = false,
	value = '',
	isInput = false,
	inputValue,
	onChangeValue,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

	const onSelectClick = () => {
		if (!disabled) setIsOpen((prev) => !prev);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isInput) return;
		onChangeValue?.(e.target.value);
	};

	const handleInputClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isOpen && !disabled) {
			setIsOpen(true);
		}
	};

	const filteredChildren = useMemo(() => {
		if (!isInput || !inputValue) {
			return children;
		}

		return React.Children.map(children, (child) => {
			if (!React.isValidElement(child)) return child;

			const childProps = child.props as OptionProps;

			const isSpecialOption = childProps.value === '' || childProps.value === 'not-found';
			const matchesSearch =
				isSpecialOption || childProps.label.toLowerCase().includes(inputValue.toLowerCase());

			return matchesSearch ? child : null;
		})?.filter(Boolean);
	}, [children, inputValue, isInput]);

	return (
		<div
			className={classNames(styles.dropdown, className)}
			style={{ width }}
			ref={dropdownRef}
			data-testid="dropdown"
		>
			<Select
				width={width}
				size={size}
				prefix={prefix || <Lens className={styles.suffix} />}
				suffix={
					suffix || <Arrow className={classNames(styles.suffix, { [styles.active]: isOpen })} />
				}
				disabled={disabled}
				onClick={onSelectClick}
				isOpen={isOpen}
				label={label}
				value={value}
				isInput={isInput}
				inputValue={inputValue}
				onInputChange={handleInputChange}
				onInputClick={handleInputClick}
			/>
			{isOpen && (
				<div
					role="listbox"
					className={classNames(styles.list, styles[`list-${size.toLowerCase()}`])}
				>
					{React.Children.map(filteredChildren, (child) =>
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
