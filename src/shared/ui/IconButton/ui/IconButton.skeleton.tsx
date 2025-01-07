import classnames from 'classnames';

import { Skeleton } from '@/shared/ui/Skeleton';

import { ButtonProps } from '../model/types';

import styles from './IconButton.module.css';

export const IconButtonSkeleton = ({
	variant = 'primary',
	size = 'M',
	form = 'square',
	destructive = false,
	className,
	...otherProps
}: Omit<ButtonProps, 'icon'>) => {
	return (
		<button
			className={classnames(
				styles['icon-button'],
				styles[`icon-button-${form}`],
				styles[`icon-button-${size.toLowerCase()}`],
				destructive ? styles[`icon-button-destructive`] : styles[`icon-button-${variant}`],
				className,
			)}
			{...otherProps}
		>
			<Skeleton width="100%" height="100%" />
		</button>
	);
};
