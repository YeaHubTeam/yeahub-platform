import { useParams } from 'react-router-dom';

import { BackButton } from '@/shared/ui/BackButton';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { useGetTasksListQuery } from '@/entities/task';
import { useGetVacancyByIdQuery } from '@/entities/vacancy';

import { CompanyInterviewCollections } from '@/widgets/interview/CompanyInterviewCollections';
import { CompanyTasks } from '@/widgets/task/CompanyTasks';
import { VacancyAdditionalInfo } from '@/widgets/vacancy/VacancyAdditionalInfo';
import { VacancyDescription } from '@/widgets/vacancy/VacancyDescription';
import { VacancyMainInfo } from '@/widgets/vacancy/VacancyMainInfo';

import styles from './VacancyPage.module.css';

export const VacancyPage = () => {
	const { vacancyId = '' } = useParams<{ vacancyId: string }>();

	const { data: vacancy } = useGetVacancyByIdQuery(vacancyId, {
		skip: !vacancyId,
	});
	const companyId = vacancy?.company?.id;

	const { data: collectionsResponse } = useGetCollectionsListQuery(
		{
			companies: companyId ?? undefined,
			page: 1,
			limit: 20,
		},
		{
			skip: !companyId,
		},
	);
	const collections = collectionsResponse?.data ?? [];

	const { data: tasksRes } = useGetTasksListQuery({
		companyId: companyId ?? undefined,
		page: 1,
		limit: 10,
	});
	const tasks = tasksRes?.data ?? [];

	if (!vacancy) {
		return null;
	}

	return (
		<Flex direction="column" align="start" className={styles.page}>
			<Flex>
				<BackButton />
			</Flex>
			<Flex gap="20" className={styles.content}>
				<Flex gap="20" direction="column" className={styles.main}>
					<Card className={styles.card}>
						<VacancyMainInfo vacancy={vacancy} />
					</Card>
					<Card className={styles.card}>
						<VacancyDescription description={vacancy.description} />
					</Card>
					<div className={styles.ai}>
						<VacancyAdditionalInfo
							skills={vacancy.skills}
							aiProfile={vacancy.aiProfile}
							englishLevel={vacancy.englishLevel}
						/>
					</div>
					{companyId && vacancy.preparation.collectionsCount > 0 && (
						<CompanyInterviewCollections
							collections={collections}
							companyTitle={vacancy.company.title}
						/>
					)}
					{companyId && vacancy.preparation.tasksCount > 0 && (
						<CompanyTasks companyTitle={vacancy.company.title} tasks={tasks} />
					)}
				</Flex>

				{vacancy.aiProfile && (
					<div className={styles.additional}>
						<VacancyAdditionalInfo
							skills={vacancy.skills}
							aiProfile={vacancy.aiProfile}
							englishLevel={vacancy.englishLevel}
						/>
					</div>
				)}
			</Flex>
		</Flex>
	);
};
