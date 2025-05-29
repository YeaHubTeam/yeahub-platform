import classnames from 'classnames';
import React, { forwardRef } from 'react';

import styles from './Button.module.css';
import { getTagName } from './helpers';
import { ButtonProps } from './types';

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
			dataTestId = 'Button',
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
				data-testid={dataTestId}
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
