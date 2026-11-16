import { VacancyMarketOverview } from '@/entities/vacancy';

import { VacancyMarketCard } from '../VacancyMarketCard/VacancyMarketCard';

import styles from './VacancyMarketSpecializationList.module.css';

interface VacancyMarketSpecializationListProps {
	specializations: VacancyMarketOverview['specializations'];
}

export const VacancyMarketSpecializationList = ({
	specializations,
}: VacancyMarketSpecializationListProps) => {
	return (
		<ul className={styles.grid}>
			{specializations.map((specialization) => (
				<li key={specialization.specializationId}>
					<VacancyMarketCard specialization={specialization} />
				</li>
			))}
		</ul>
	);
};
