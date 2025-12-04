import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections, Specializations } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

/* eslint-disable @conarti/feature-sliced/layers-slices */
import { useGetSpecializationsListQuery } from '@/entities/specialization';
/* eslint-disable @conarti/feature-sliced/layers-slices */

import styles from './ChooseCollectionSpecialization.module.css';

const MAX_LIMIT = 5;

interface ChooseCollectionSpecializationProps {
	selectedSpecializations?: number[];
	onChangeSpecialization: (complexity?: number[]) => void;
	specializationsLimit?: number;
	selectedSpecialization: number;
}

export const ChooseCollectionSpecialization = ({
	selectedSpecializations,
	onChangeSpecialization,
	specializationsLimit,
	selectedSpecialization,
}: ChooseCollectionSpecializationProps) => {
	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(specializationsLimit || MAX_LIMIT);

	const { data: specializations } = useGetSpecializationsListQuery({
		limit,
		specializations: [selectedSpecialization],
	});

	const { t } = useTranslation([i18Namespace.collection, i18Namespace.specialization]);

	const { isMobile } = useScreenSize();

	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit(specializations?.total ?? (specializationsLimit || MAX_LIMIT));
		} else {
			setLimit(specializationsLimit || MAX_LIMIT);
		}
	}, [specializations?.total, showAll, specializationsLimit]);

	const onChooseSpecialization = (id: number) => {
		if (selectedSpecializations?.includes(id)) {
			const filteredSpecializations = selectedSpecializations.filter(
				(specialization) => specialization !== id,
			);
			onChangeSpecialization(
				filteredSpecializations.length > 0 ? filteredSpecializations : undefined,
			);
		} else {
			onChangeSpecialization([...(selectedSpecializations || []), id]);
		}
	};

	const prepareData = specializations?.data.map((specialization) => ({
		...specialization,
		active: selectedSpecializations?.includes(specialization.id),
	}));

	if (!prepareData) return null;

	return (
		<div className={classNames(styles.wrapper, { [styles.mobile]: isMobile })}>
			<BaseFilterSection
				data={prepareData}
				title={t(Specializations.SELECT_CHOOSE, { ns: i18Namespace.specialization })}
				onClick={onChooseSpecialization}
			/>

			{!isMobile && (
				<Button className={styles.button} variant="link" onClick={toggleShowAll}>
					{!showAll ? t(Collections.SPECIALIZATIONS_SHOW_ALL) : t(Collections.SPECIALIZATIONS_HIDE)}
				</Button>
			)}
		</div>
	);
};
