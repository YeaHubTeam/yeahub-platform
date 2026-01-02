import classNames from 'classnames';

import { Skeleton } from '../Skeleton';

import styles from './Avatar.module.css';

interface AvatarSkeletonProps {
	size?: number;
	className?: string;
	borderRadius?: number;
}

export const AvatarSkeleton = ({
	size = 50,
	borderRadius = 25,
	className,
	...props
}: AvatarSkeletonProps) => {
	return (
		<div
			className={classNames(styles.wrapper, className)}
			style={{ width: size, height: size, borderRadius: borderRadius }}
			{...props}
		>
			<Skeleton width={size} height={size} borderRadius={borderRadius} />
		</div>
	);
};
