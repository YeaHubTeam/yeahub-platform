import classnames from 'classnames';

import styles from '@/shared/ui/Button/ui/Button.module.css';
import { Skeleton } from '@/shared/ui/Skeleton';

import { getTagName } from '../model/helpers';
import { ButtonProps } from '../model/types';

export const ButtonSkeleton = ({
	className,
	variant = 'primary',
	fullWidth,
	size = 'M',
	destructive,
}: ButtonProps) => {
	const tagName = getTagName(variant);

	return (
		<Skeleton
			borderRadius={12}
			className={classnames(
				styles[tagName],
				fullWidth ? styles['button-full'] : styles[`${tagName}-${size.toLowerCase()}`],
				destructive && tagName === 'a'
					? styles['a-link-destructive']
					: styles[`${tagName}-${variant}`],
				className,
			)}
		/>
	);
};
