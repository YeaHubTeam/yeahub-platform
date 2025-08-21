import classNames from 'classnames';
import { ReactNode } from 'react';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './FormField.module.css';

export interface FormFieldProps {
	description: string;
	label: string;
	children: ReactNode;
	isLimitWidth?: boolean;
}

export const FormField = ({ description, label, children, isLimitWidth }: FormFieldProps) => {
	return (
		<Flex
			gap="120"
			className={classNames(styles['form-field'], { [styles['limit-width']]: isLimitWidth })}
		>
			<Flex direction="column" className={styles.titles} gap="8">
				<Text variant="body4" color="black-800">
					{label}
				</Text>
				<Text variant="body2" color="black-800">
					{description}
				</Text>
			</Flex>
			{children}
		</Flex>
	);
};
