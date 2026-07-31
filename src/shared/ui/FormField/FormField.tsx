import classNames from 'classnames';
import { ReactNode } from 'react';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { formFieldTestIds } from './constants';
import styles from './FormField.module.css';

export interface FormFieldProps {
	description?: string;
	label: string;
	children: ReactNode;
	isLimitWidth?: boolean;
	direction?: 'row' | 'column';
}

export const FormField = ({
	description,
	label,
	children,
	isLimitWidth,
	direction = 'row',
}: FormFieldProps) => {
	return (
		<Flex
			gap={direction === 'row' ? '120' : '20'}
			direction={direction}
			className={classNames(styles['form-field'], { [styles['limit-width']]: isLimitWidth })}
			dataTestId={formFieldTestIds.formFieldChildren}
		>
			<Flex direction="column" className={styles.titles} gap="8">
				<Text variant="body4" color="black-800" dataTestId={formFieldTestIds.formFieldLabel}>
					{label}
				</Text>
				{description && (
					<Text
						variant="body2"
						color="black-800"
						dataTestId={formFieldTestIds.formFieldDescription}
					>
						{description}
					</Text>
				)}
			</Flex>
			{children}
		</Flex>
	);
};
