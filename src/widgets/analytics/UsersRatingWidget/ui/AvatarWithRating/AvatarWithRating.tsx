import classNames from 'classnames';

import { Avatar } from '@/shared/ui/Avatar';

import { MAX_RATING } from '../../model/constants';

import styles from './AvatarWithRating.module.css';

interface AvatarWithRatingProps {
	avatarUrl: string;
	score: number;
	radius: number;
	maxRating?: number;
	className?: string;
}

export const AvatarWithRating = ({
	avatarUrl,
	score,
	maxRating = MAX_RATING,
	radius,
	className,
}: AvatarWithRatingProps) => {
	const size = radius * 2;
	const strokeWidth = radius * 0.12;
	const circleRadius = radius - strokeWidth / 2;

	const circumference = 2 * Math.PI * circleRadius;
	const progress = Math.min(1, Math.max(0, score / maxRating));
	const offset = circumference * (1 - progress);

	return (
		<div
			className={classNames(styles['avatar-with-rating'], className)}
			style={{ width: size, height: size }}
		>
			<svg width={size} height={size}>
				<circle
					className={styles['empty-circle']}
					cx={size / 2}
					cy={size / 2}
					r={circleRadius}
					strokeWidth={strokeWidth}
				/>
				<circle
					className={styles['filled-circle']}
					cx={size / 2}
					cy={size / 2}
					r={circleRadius}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					transform={`rotate(-120 ${size / 2} ${size / 2})`}
				/>
			</svg>
			<Avatar
				className={styles['avatar-image']}
				borderRadius={50}
				size={circleRadius * 2 - strokeWidth * 0.5}
				image={avatarUrl}
			/>
		</div>
	);
};
