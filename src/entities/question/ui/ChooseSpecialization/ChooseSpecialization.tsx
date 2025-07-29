/* eslint-disable @conarti/feature-sliced/layers-slices */
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import {
	DEFAULT_SPECIALIZATION_NUMBER,
	MAX_LIMIT_SPECIALIZATIONS,
} from '@/shared/constants/queryConstants';
import { setToLS } from '@/shared/helpers/manageLocalStorage';
import { useScreenSize } from '@/shared/hooks';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

import {
	LS_ACTIVE_SPECIALIZATION_ID,
	useGetSpecializationsListQuery,
} from '@/entities/specialization';

import styles from './ChooseSpecialization.module.css';

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
	const [limit, setLimit] = useState(specializationLimit || MAX_LIMIT_SPECIALIZATIONS);
	const { data: specialization } = useGetSpecializationsListQuery({
		limit,
	});
	const { t } = useTranslation(i18Namespace.questions);
	const { isMobile } = useScreenSize();

	useEffect(() => setToLS(LS_ACTIVE_SPECIALIZATION_ID, String(DEFAULT_SPECIALIZATION_NUMBER)), []);

	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit((limit) => specialization?.total ?? limit);
		} else {
			setLimit(specializationLimit || MAX_LIMIT_SPECIALIZATIONS);
		}
	}, [limit, specialization?.total, showAll, specializationLimit, isMobile]);

	const handleChooseSpecialization = (id: number) => {
		setToLS(LS_ACTIVE_SPECIALIZATION_ID, String(id));
		onChangeSpecialization(id);
	};

	const prepareData = useMemo(
		() =>
			specialization?.data.map((spec) => ({
				...spec,
				active: selectedSpecialization === spec.id,
			})),
		[specialization, selectedSpecialization],
	);

	if (!prepareData) return null;

	return (
		<div className={classNames(styles.wrapper)}>
			<BaseFilterSection
				data={prepareData}
				title={t(Questions.SPECIALIZATION_TITLE)}
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
