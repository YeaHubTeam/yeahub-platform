import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { formFieldTestIds } from './constants';
import { FormFieldProps } from './FormField';
import styles from './FormField.module.css';

export const FormFieldSkeleton = ({
	children,
	direction = 'row',
	isLimitWidth,
}: Partial<FormFieldProps>) => {
	return (
		<Flex
			gap={direction === 'row' ? '120' : '20'}
			className={classNames(styles['form-field'], { [styles['limit-width']]: isLimitWidth })}
			direction={direction}
			dataTestId={formFieldTestIds.formFieldSkeletonChildren}
		>
			<Flex direction="column" className={styles.titles} gap="8">
				<TextSkeleton variant="body4" width="200px" />
				<TextSkeleton variant="body2" width="100%" />
			</Flex>
			{children}
		</Flex>
	);
};
