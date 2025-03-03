/* eslint-disable @conarti/feature-sliced/layers-slices */
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { DEFAULT_SPECIALIZATION_NUMBER } from '@/shared/constants/queryConstants';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

import { useGetSpecializationsListQuery } from '@/entities/specialization';

import styles from './ChooseSpecialization.module.css';

const MAX_LIMIT = 5;

interface ChooseSpecializationProps {
	selectedSpecialization?: number;
	onChangeSpecialization: (specialization: number | undefined) => void;
	specializationLimit?: number;
	shouldShowScroll?: boolean;
}

export const ChooseSpecialization = ({
	selectedSpecialization = DEFAULT_SPECIALIZATION_NUMBER,
	onChangeSpecialization,
	specializationLimit,
}: ChooseSpecializationProps) => {
	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(specializationLimit || MAX_LIMIT);
	const { data: specialization } = useGetSpecializationsListQuery({});
	const { t } = useTranslation(i18Namespace.questions);
	const { isMobile } = useScreenSize();

	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit((limit) => specialization?.total ?? limit);
		} else {
			setLimit(specializationLimit || MAX_LIMIT);
		}
	}, [limit, specialization?.total, showAll, specializationLimit, isMobile]);

	const handleChooseSpecialization = (id: number) => {
		onChangeSpecialization(id);
	};

	const prepareData = useMemo(
		() =>
			specialization?.data?.slice(0, limit).map((spec) => ({
				...spec,
				active: selectedSpecialization === spec.id,
			})),
		[limit, specialization, selectedSpecialization],
	);

	if (!prepareData) return null;

	return (
		<div className={classNames(styles.wrapper)}>
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
