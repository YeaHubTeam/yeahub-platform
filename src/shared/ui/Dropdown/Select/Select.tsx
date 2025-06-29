import classNames from 'classnames';

import { DropdownSize } from '../DropdownTypes';

import styles from './Select.module.css';

interface SelectProps {
	size?: DropdownSize;
	prefix: React.ReactNode;
	suffix: React.ReactNode;
	className?: string;
	disabled?: boolean;
	label: string;
	isOpen?: boolean;
	onClick: () => void;
	width?: number | string;
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
}: SelectProps) => {
	const wrapperClasses = classNames(
		styles.wrapper,
		styles['dropdown'],
		{
			[styles['wrapper-disabled']]: disabled,
			[styles[`wrapper-${size.toLowerCase()}`]]: size,
		},
		className,
	);

	return (
		<div className={wrapperClasses} style={{ width }}>
			{prefix && (
				<span
					className={classNames({
						[styles['select-prefix']]: !!prefix,
					})}
				>
					{prefix}
				</span>
			)}
			<button
				className={classNames(styles.button, styles['dropdown'], className)}
				aria-expanded={isOpen}
				onClick={(e) => {
					e.preventDefault();
					onClick();
				}}
				disabled={disabled}
			>
				{label}
			</button>
			{suffix && <span className={styles['select-suffix']}>{suffix}</span>}
		</div>
	);
};
