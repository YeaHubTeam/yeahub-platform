import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Vacancy } from '../../model/types/vacancy';
import { VacancyCardHeader } from '../VacancyCardHeader/VacancyCardHeader';
import { VacancyCardPreparation } from '../VacancyCardPreparation/VacancyCardPreparation';
import { VacancyCardSalary } from '../VacancyCardSalary/VacancyCardSalary';
import { VacancyCardSkills } from '../VacancyCardSkills/VacancyCardSkills';
import { VacancyCardWorkFormat } from '../VacancyCardWorkFormat/VacancyCardWorkFormat';

import styles from './VacancyCard.module.css';

interface VacancyCardProps {
	vacancy: Vacancy;
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
	const {
		company,
		title,
		employmentForm,
		grade,
		workFormat,
		area,
		skills,
		publishedAt,
		preparation,
		salary,
	} = vacancy;

	const hasPreparation = Boolean(
		preparation.collectionsCount || preparation.questionsCount || preparation.tasksCount,
	);
	const hasSalary = Boolean(salary.from || salary.to);
	const hasSkills = Boolean(skills.length);

	return (
		<Card withOutsideShadow className={styles.card} classNameContent={styles.content}>
			<Flex gap="40" direction="column" justify="between" flex={1}>
				<VacancyCardHeader company={company} publishedAt={publishedAt} title={title} />
				<Flex gap="20" direction="column">
					<VacancyCardWorkFormat
						employmentForm={employmentForm}
						grade={grade}
						workFormat={workFormat}
						area={area}
					/>
					{hasSkills && <VacancyCardSkills skills={skills} />}
					{(hasPreparation || hasSalary) && (
						<Flex justify="between" align="center" gap="8">
							{hasPreparation && <VacancyCardPreparation preparation={preparation} />}
							{hasSalary && <VacancyCardSalary salary={salary} />}
						</Flex>
					)}
				</Flex>
			</Flex>
		</Card>
	);
};
