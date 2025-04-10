import classNames from 'classnames';

import styles from './Select.module.css';
import { DropdownSize } from '../DropdownTypes';

interface SelectProps {
	size?: DropdownSize;
	prefix: React.ReactNode;
	suffix: React.ReactNode;
	className?: string;
	disabled?: boolean;
	label: string;
	isOpen?: boolean;
	onClick: () => void;
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
		<div className={wrapperClasses}>
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
				className={classNames(styles.button, styles['dropdown'], className, {
					[styles.open]: isOpen,
				})}
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
