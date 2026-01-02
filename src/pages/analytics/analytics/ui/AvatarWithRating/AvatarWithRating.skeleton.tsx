import classNames from 'classnames';

import { AvatarSkeleton } from '@/shared/ui/Avatar';

import styles from './AvatarWithRating.module.css';

interface AvatarWithRatingProps {
	radius: number;
	className?: string;
}

export const AvatarWithRatingSkeleton = ({ radius, className }: AvatarWithRatingProps) => {
	const size = radius * 2;

	return (
		<div
			className={classNames(styles['avatar-with-rating'], className)}
			style={{ width: size, height: size }}
		>
			<AvatarSkeleton borderRadius={size / 2} size={size} />
		</div>
	);
};
