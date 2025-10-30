import classNames from 'classnames';

import { Skeleton } from '@/shared/ui/Skeleton';

import { SelectProps } from './Select';
import styles from './Select.module.css';

export const SelectSkeleton = ({
	size = 'L',
	className,
	width,
	dataTestId,
}: Partial<SelectProps>) => {
	const wrapperClasses = classNames(
		styles.wrapper,
		styles['dropdown'],
		{
			[styles[`wrapper-${size.toLowerCase()}`]]: size,
		},
		className,
	);

	return <Skeleton dataTestId={dataTestId} className={wrapperClasses} style={{ width }} />;
};
