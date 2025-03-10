import classnames from 'classnames';

import styles from '@/shared/ui/Button/ui/Button.module.css';
import { Skeleton } from '@/shared/ui/Skeleton';

import { getTagName } from '../model/helpers';
import { ButtonProps } from '../model/types';

export const ButtonSkeleton = ({
	className,
	variant = 'primary',
	fullWidth,
	size = 'medium',
	destructive,
	width,
}: ButtonProps & { width?: number }) => {
	const tagName = getTagName(variant);

	return (
		<Skeleton
			borderRadius={12}
			width={width}
			className={classnames(
				styles[tagName],
				styles[`${tagName}-${size}`],
				fullWidth && styles[`${tagName}-full`],
				destructive && tagName === 'a'
					? styles['a-link-destructive']
					: styles[`${tagName}-${variant}`],
				className,
			)}
		/>
	);
};
