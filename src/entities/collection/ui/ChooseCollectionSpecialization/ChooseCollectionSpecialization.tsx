import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections, Specializations } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

/* eslint-disable @conarti/feature-sliced/layers-slices */
import {
	getSpecializationDefaultIcon,
	Specialization,
	useGetSpecializationsListQuery,
} from '@/entities/specialization';
/* eslint-disable @conarti/feature-sliced/layers-slices */

import styles from './ChooseCollectionSpecialization.module.css';

const MAX_LIMIT = 5;

interface ChooseCollectionSpecializationProps {
	selectedSpecializations?: number[];
	onChangeSpecialization: (complexity?: number[]) => void;
	specializationsLimit?: number;
	shouldShowScroll?: boolean;
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

	const specializationIcon = (specialization: Specialization) => (
		<Icon icon={getSpecializationDefaultIcon(specialization)} />
	);

	return (
		<div className={classNames(styles.wrapper, { [styles.mobile]: isMobile })}>
			<BaseFilterSection
				data={prepareData}
				title={t(Specializations.SELECT_CHOOSE, { ns: i18Namespace.specialization })}
				onClick={onChooseSpecialization}
				getDefaultIcon={(item) => specializationIcon(item as Specialization)}
			/>

			{!isMobile && (
				<Button className={styles.button} variant="link" onClick={toggleShowAll}>
					{!showAll ? t(Collections.SPECIALIZATIONS_SHOW_ALL) : t(Collections.SPECIALIZATIONS_HIDE)}
				</Button>
			)}
		</div>
	);
};
