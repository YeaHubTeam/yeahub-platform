import classnames from 'classnames';
import React, { forwardRef } from 'react';

import styles from './Button.module.css';
import { ButtonProps } from './types';
import { getTagName } from './helpers';

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	(
		{
			size = 'medium',
			variant = 'primary',
			className = '',
			fullWidth = false,
			destructive = false,
			children,
			preffix,
			suffix,
			badge,
			...props
		},
		ref,
	): JSX.Element => {
		const tagName = getTagName(variant);

		const Component = tagName as React.ElementType;

		return (
			<Component
				ref={ref}
				className={classnames(
					styles[tagName],
					styles[`${tagName}-${size}`],
					fullWidth && styles[`${tagName}-full`],
					destructive && tagName === 'a'
						? styles['a-link-destructive']
						: styles[`${tagName}-${variant}`],
					className,
					tagName === 'a' && props.disabled ? styles['disabled'] : '',
				)}
				{...props}
			>
				{preffix}
				{children}
				{suffix}
				{badge && badge !== '0' ? <div className={styles['button-badge']}>{badge}</div> : null}
			</Component>
		);
	},
);

Button.displayName = 'Button';
