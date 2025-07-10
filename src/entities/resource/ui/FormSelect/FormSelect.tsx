import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

interface FormFieldProps {
	short: string;
	label: string;
	children: React.ReactNode;
}
import styles from './FormSelect.module.css';

const FormSelect = ({ short, label, children }: FormFieldProps) => {
	return (
		<Flex gap={'120'} className={styles['form-field']}>
			<Flex direction="column" className={styles.titles} gap="8">
				<Text variant="body4" color="black-800">
					{short}
				</Text>
				<Text variant="body2" color="black-800">
					{label}
				</Text>
			</Flex>
			{children}
		</Flex>
	);
};

export default FormSelect;
