import { skipToken } from '@reduxjs/toolkit/query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Vacancies, i18Namespace } from '@/shared/config';
import { formatUpdatedAt } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { useGetVacancyMarketByIdQuery } from '@/entities/vacancy';

import { VacancyMarketDetailsBody } from '@/pages/career/VacancyMarketDetails/ui/VacancyMarketDetailsBody/VacancyMarketDetailsBody';
import { VacancyMarketDetailsHeader } from '@/pages/career/VacancyMarketDetails/ui/VacancyMarketDetailsHeader/VacancyMarketDetailsHeader';
import { VacancyMarketDetailsSummary } from '@/pages/career/VacancyMarketDetails/ui/VacancyMarketDetailsSummary/VacancyMarketDetailsSummary';

import styles from './VacancyMarketDetailsPage.module.css';

export const VacancyMarketDetailsPage = () => {
	const { specializationId } = useParams<{ specializationId: string }>();
	const {
		data: vacancy,
		isLoading,
		isError,
	} = useGetVacancyMarketByIdQuery(specializationId ?? skipToken);
	const { t } = useTranslation(i18Namespace.vacanciesMarketDetails);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError || !vacancy) {
		return <div>Error</div>;
	}

	return (
		<Flex componentType="section" direction="column" gap="24" className={styles.container}>
			<VacancyMarketDetailsHeader
				title={t(Vacancies.VACANCY_PROFILE_TITLE)}
				vacancyName={vacancy.name}
				description={t(Vacancies.VACANCY_PROFILE_DESCRIPTION)}
				updatedAtText={t(Vacancies.VACANCY_PROFILE_UPDATED_AT, {
					date: formatUpdatedAt(vacancy.updatedAt),
				})}
			/>

			<VacancyMarketDetailsSummary
				title={t(Vacancies.VACANCY_PROFILE_ANALYZED_VACANCIES)}
				total={vacancy.analyzedVacancyCount}
				note={t(Vacancies.VACANCY_PROFILE_DAILY_UPDATE)}
			/>

			<VacancyMarketDetailsBody
				topKeywords={vacancy.topKeywords}
				titleSkills={t(Vacancies.VACANCY_PROFILE_TOP_SKILLS)}
				titleTasks={t(Vacancies.VACANCY_PROFILE_FREQUENT_TASKS)}
				topSkills={vacancy.topSkills}
				topTasks={vacancy.topTasks}
				show={t(Vacancies.VACANCY_PROFILE_SHOW_ALL)}
				hide={t(Vacancies.VACANCY_PROFILE_HIDE)}
				softTitle={t(Vacancies.VACANCY_PROFILE_PRIORITY)}
				priority={vacancy.priority}
				titleKeywords={t(Vacancies.KEYWORDS_TITLE)}
			/>
		</Flex>
	);
};
