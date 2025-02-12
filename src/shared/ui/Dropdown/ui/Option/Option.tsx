import classNames from 'classnames';

import { Checkbox } from '@/shared/ui/Checkbox';

import styles from './Option.module.css';

export interface OptionProps {
	value: string | number;
	label: string;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	isSelected?: boolean;
	multiple?: boolean;
	onChange?: () => void;
}

export const Option = ({
	label,
	onClick,
	disabled = false,
	className,
	isSelected = false,
	multiple = false,
	onChange,
}: OptionProps) => {
	return (
		<div
			className={classNames(styles['dropdown-option'], className, {
				[styles.disabled]: disabled,
			})}
			role="option"
			aria-selected={isSelected}
			aria-disabled={disabled}
			onClick={!disabled ? onClick : undefined}
			onKeyDown={!disabled ? onClick : undefined}
			tabIndex={disabled ? -1 : 0}
		>
			{multiple && <Checkbox checked={isSelected} onChange={onChange} />}
			{label}
		</div>
	);
};
