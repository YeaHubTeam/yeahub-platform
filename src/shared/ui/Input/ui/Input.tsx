import classNames from 'classnames';

import { Size } from '@/shared/ui/Input/model/types/InputTypes';

import styles from './Input.module.css';

interface InputProps {
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	size?: Size;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	error?: boolean;
}

export const Input = ({
	prefix,
	suffix,
	size = 'L',
	disabled = false,
	className,
	placeholder = '',
	error = false,
	...props
}: InputProps) => {
	const wrapperClasses = classNames(
		styles.wrapper,
		{ [styles['wrapper-disabled']]: disabled },
		{ [styles['wrapper-error']]: error },
		{ [styles[`wrapper-${size.toLowerCase()}`]]: size },
	);

	return (
		<div className={wrapperClasses}>
			{prefix && <span className={styles['input-prefix']}>{prefix}</span>}
			<input
				placeholder={placeholder}
				tabIndex={disabled ? -1 : 0}
				type="text"
				className={classNames(styles.input, className)}
				disabled={disabled}
				{...props}
			/>
			{suffix && <span className={styles['input-suffix']}>{suffix}</span>}
		</div>
	);
};
