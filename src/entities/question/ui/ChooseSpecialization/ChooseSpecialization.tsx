/* eslint-disable @conarti/feature-sliced/layers-slices */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import {
	Specialization,
	useGetSpecializationsListQuery,
	getSpecializationDefaultIcon,
} from '@/entities/specialization';

import styles from './ChooseSpecialization.module.css';

const MAX_LIMIT = 5;

interface ChooseSpecializationProps {
	selectedSpecialization?: number[];
	onChangeSpecialization: (specialization: number[] | undefined) => void;
	specializationLimit?: number;
	shouldShowScroll?: boolean;
}

export const ChooseSpecialization = ({
	selectedSpecialization,
	onChangeSpecialization,
	specializationLimit,
}: ChooseSpecializationProps) => {
	const [showAll, _] = useState(false);
	const [limit, setLimit] = useState(specializationLimit || MAX_LIMIT);
	const { data: specialization } = useGetSpecializationsListQuery({ limit });
	const { t } = useTranslation(i18Namespace.questions);
	const { isMobile } = useScreenSize();

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit(specialization?.total ?? (specializationLimit || MAX_LIMIT));
		} else {
			setLimit(specializationLimit || MAX_LIMIT);
		}
	}, [specialization?.total, showAll, specializationLimit, isMobile]);

	const handleChooseSpecialization = (id: number) => {
		if (selectedSpecialization?.includes(id)) {
			const filteredSpecializations = selectedSpecialization.filter(
				(specialization) => specialization !== id,
			);
			onChangeSpecialization(
				filteredSpecializations.length > 0 ? filteredSpecializations : undefined,
			);
		} else {
			onChangeSpecialization([...(selectedSpecialization || []), id]);
		}
	};

	const prepareData = specialization?.data.map((spec) => ({
		...spec,
		active: selectedSpecialization?.includes(spec.id),
	}));

	if (!prepareData) return null;

	const specializationIcon = (specialization: Specialization) => (
		<Icon icon={getSpecializationDefaultIcon(specialization)} />
	);

	return (
		<div className={classNames(styles.wrapper, { [styles.mobile]: isMobile })}>
			<BaseFilterSection
				data={prepareData}
				title={t('specialization.title')}
				onClick={handleChooseSpecialization}
				getDefaultIcon={(item) => specializationIcon(item as Specialization)}
			/>
		</div>
	);
};
