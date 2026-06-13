import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { FormFieldProps } from './FormField';
import styles from './FormField.module.css';

interface FormFieldSkeletonProps extends Partial<FormFieldProps> {
	countTextFields?: number;
}

export const FormFieldSkeleton = ({
	children,
	direction = 'row',
	isLimitWidth,
	countTextFields = 1,
}: FormFieldSkeletonProps) => {
	return (
		<Flex
			gap={direction === 'row' ? '120' : '20'}
			className={classNames(styles['form-field'], { [styles['limit-width']]: isLimitWidth })}
			direction={direction}
		>
			<Flex direction="column" className={styles.titles} gap="8">
				<TextSkeleton variant="body4" width="200px" />
				<Flex direction="column" gap="2">
					{Array.from({ length: countTextFields }).map((_, index) => (
						<TextSkeleton key={index} variant="body2" width="100%" />
					))}
				</Flex>
			</Flex>
			{children}
		</Flex>
	);
};
