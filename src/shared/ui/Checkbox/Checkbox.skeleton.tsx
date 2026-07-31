import classNames from 'classnames';

import { Skeleton } from '../Skeleton';
import { TextSkeleton } from '../Text';
import { TextVariant } from '../Text/types';

import styles from './Checkbox.module.css';

export interface CheckboxPropsSkeleton {
	className?: string;
	label?: boolean;
	labelVariant?: TextVariant;
	labelWidth?: string | number;
}

export const CheckboxSkeleton = ({
	label,
	className,
	labelVariant = 'body4',
	labelWidth = 90,
}: CheckboxPropsSkeleton) => {
	return (
		<div className={classNames(styles['checkbox-wrapper'], className)}>
			<Skeleton width={20} height={20} borderRadius="4px" className={styles.checkbox} />
			{label && <TextSkeleton className={styles.label} variant={labelVariant} width={labelWidth} />}
		</div>
	);
};
