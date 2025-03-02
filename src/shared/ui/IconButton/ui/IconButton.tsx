import classnames from 'classnames';
import { forwardRef } from 'react';

import { ButtonProps } from '../model/types';

import styles from './IconButton.module.css';

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'medium',
			form = 'square',
			destructive = false,
			className,
			icon,
			onClick,
			...otherProps
		},
		ref,
	): JSX.Element => {
		return (
			<button
				ref={ref}
				className={classnames(
					styles['icon-button'],
					styles[`icon-button-${form}`],
					styles[`icon-button-${size}`],
					destructive ? styles[`icon-button-destructive`] : styles[`icon-button-${variant}`],
					className,
				)}
				onClick={onClick}
				{...otherProps}
			>
				{icon}
			</button>
		);
	},
);

IconButton.displayName = 'IconButton';
