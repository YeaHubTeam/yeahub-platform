import classNames from 'classnames';

import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './TextArea.module.css';

interface TextAreaSkeletonProps {
	className?: string;
}

export const TextAreaSkeleton = ({ className }: TextAreaSkeletonProps) => {
	return (
		<Skeleton
			className={classNames(styles.wrapper, className)}
			borderRadius={24}
			width="100%"
			height={180}
		/>
	);
};
