import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import type {
	VacancyEmploymentForm,
	VacancyGrade,
	VacancyWorkFormat,
} from '../../model/types/vacancy';

import styles from './VacancyCardWorkFormat.module.css';

interface VacancyCardCompanyProps {
	employmentForm: VacancyEmploymentForm;
	grade: VacancyGrade;
	workFormat: VacancyWorkFormat[];
	area: string;
}

export const VacancyCardWorkFormat = ({
	employmentForm,
	grade,
	workFormat,
	area,
}: VacancyCardCompanyProps) => {
	const formats = [employmentForm, grade, ...workFormat, area].filter(Boolean);

	return (
		<Flex gap="6" className={styles.conditions} align="center">
			{formats.map((el) => (
				<Flex key={el} className={styles.format}>
					<Text variant="body3-accent" color="black-500">
						{el}
					</Text>
				</Flex>
			))}
		</Flex>
	);
};
