import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { FormFieldProps } from './FormField';
import styles from './FormField.module.css';

export const FormFieldSkeleton = ({ children, isLimitWidth }: Partial<FormFieldProps>) => {
	return (
		<Flex
			gap="120"
			className={classNames(styles['form-field'], { [styles['limit-width']]: isLimitWidth })}
		>
			<Flex direction="column" className={styles.titles} gap="8">
				<TextSkeleton variant="body4" width="200px" />
				<TextSkeleton variant="body2" width="100%" />
			</Flex>
			{children}
		</Flex>
	);
};
