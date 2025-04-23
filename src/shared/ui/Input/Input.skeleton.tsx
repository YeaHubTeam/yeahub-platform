import classNames from 'classnames';

import { Skeleton } from '@/shared/ui/Skeleton';

import { InputProps } from './Input';
import styles from './Input.module.css';

export const InputSkeleton = ({ size, className }: InputProps) => {
	const wrapperClasses = classNames(
		styles.wrapper,
		{
			[styles[`wrapper-${size?.toLowerCase()}`]]: size,
		},
		className,
	);

	return <Skeleton className={wrapperClasses} />;
};
