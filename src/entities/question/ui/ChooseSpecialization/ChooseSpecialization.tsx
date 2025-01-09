/* eslint-disable @conarti/feature-sliced/layers-slices */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

import { useGetSpecializationsListQuery } from '@/entities/specialization';

import styles from './ChooseSpecialization.module.css';

const MAX_LIMIT = 5;
const DEFAULT_SPECIALIZATION = 11;

interface ChooseSpecializationProps {
	selectedSpecialization?: number;
	onChangeSpecialization: (specialization: number | undefined) => void;
	specializationLimit?: number;
	shouldShowScroll?: boolean;
}

export const ChooseSpecialization = ({
	selectedSpecialization = DEFAULT_SPECIALIZATION,
	onChangeSpecialization,
	specializationLimit,
}: ChooseSpecializationProps) => {
	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(specializationLimit || MAX_LIMIT);
	const { data: specialization } = useGetSpecializationsListQuery({ limit });
	const { t } = useTranslation(i18Namespace.questions);
	const { isMobile } = useScreenSize();

	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit(specialization?.total ?? (specializationLimit || MAX_LIMIT));
		} else {
			setLimit(specializationLimit || MAX_LIMIT);
		}
	}, [specialization?.total, showAll, specializationLimit, isMobile]);

	const handleChooseSpecialization = (id: number) => {
		onChangeSpecialization(id);
	};

	const prepareData = specialization?.data.map((spec) => ({
		...spec,
		active: selectedSpecialization === spec.id,
	}));

	if (!prepareData) return null;

	return (
		<div className={classNames(styles.wrapper, { [styles.mobile]: isMobile })}>
			<BaseFilterSection
				data={prepareData}
				title={t('specialization.title')}
				onClick={handleChooseSpecialization}
			/>
			{!isMobile && (
				<Button className={styles.button} variant="link" onClick={toggleShowAll}>
					{!showAll ? t(Questions.CATEGORIES_SHOW_ALL) : t(Questions.CATEGORIES_HIDE)}
				</Button>
			)}
		</div>
	);
};
