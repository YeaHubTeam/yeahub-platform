import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { VacanciesFilterProps } from '../../model/types/vacanciesFilter';
import { VacanciesFilterPanel } from '../VacanciesFilterPanel/VacanciesFilterPanel';

import styles from './VacanciesPageHeader.module.css';
import { VacanciesPageHeaderSkeleton } from './VacanciesPageHeader.skeleton';

export const VacanciesPageHeader = ({
	filter,
	selectedSpecialization,
	handlers,
}: VacanciesFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);
	const { isTablet, isMobile } = useScreenSize();

	const { data: currentSpecialization, isLoading } = useGetSpecializationByIdQuery(
		String(selectedSpecialization),
	);

	if (isLoading) {
		return <VacanciesPageHeaderSkeleton />;
	}

	if (!currentSpecialization) {
		return null;
	}

	const title = t(Vacancies.LIST_PAGE_TITLE, {
		specialization: currentSpecialization.title,
	});

	const showFiltersInDrawer = isTablet || isMobile;

	return (
		<>
			<Flex align="center" justify="between" className={styles.header}>
				<Text variant="body6" isMainTitle maxRows={1}>
					{title}
				</Text>
				{showFiltersInDrawer && (
					<FiltersDrawer>
						<VacanciesFilterPanel
							filter={filter}
							selectedSpecialization={selectedSpecialization}
							handlers={handlers}
						/>
					</FiltersDrawer>
				)}
			</Flex>
			<hr className={styles.divider} />
		</>
	);
};
