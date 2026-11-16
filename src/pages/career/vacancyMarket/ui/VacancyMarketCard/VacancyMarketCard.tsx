import { useTranslation } from 'react-i18next';

import { i18Namespace, ROUTES, VacanciesMarket } from '@/shared/config';
import { route } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';

import type { VacancyMarketSpecialization } from '@/entities/vacancy';

import { VacancyMarketCardHeader } from '../VacancyMarketCardHeader/VacancyMarketCardHeader';
import { VacancyMarketKeywords } from '../VacancyMarketKeywords/VacancyMarketKeywords';
import { VacancyMarketSkills } from '../VacancyMarketSkills/VacancyMarketSkills';

import styles from './VacancyMarketCard.module.css';

interface VacancyMarketCardProps {
	specialization: VacancyMarketSpecialization;
}

export const VacancyMarketCard = ({ specialization }: VacancyMarketCardProps) => {
	const { t } = useTranslation(i18Namespace.vacanciesMarket);

	const hasTopSkills = specialization.topSkills.length > 0;
	const hasTopKeywords = specialization.topKeywords.length > 0;

	return (
		<Card
			size="small"
			withOutsideShadow
			className={styles.card}
			classNameContent={styles.content}
			titleComponent={
				<VacancyMarketCardHeader
					name={specialization.name}
					vacanciesCountText={t(VacanciesMarket.CARD_VACANCIES, {
						count: specialization.vacancyCount,
					})}
				/>
			}
			actionRoute={route(ROUTES.career.vacancyMarket.detail.page, specialization.specializationId)}
			actionTitle={t(VacanciesMarket.CARD_DETAILS)}
			isActionPositionBottom
		>
			{(hasTopSkills || hasTopKeywords) && (
				<div className={styles.sections}>
					{hasTopSkills && (
						<VacancyMarketSkills
							skills={specialization.topSkills}
							title={t(VacanciesMarket.CARD_TOP_SKILLS)}
						/>
					)}
					{hasTopKeywords && (
						<VacancyMarketKeywords
							keywords={specialization.topKeywords}
							title={t(VacanciesMarket.CARD_KEYWORDS)}
						/>
					)}
				</div>
			)}
		</Card>
	);
};
