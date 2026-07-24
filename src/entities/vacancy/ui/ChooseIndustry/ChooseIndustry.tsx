import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Translation, Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { getUpdatedSingleFilter } from '../../libs/updateFilterValue';
import { INDUSTRY, MAX_SHOW_LIMIT_INDUSTRY } from '../../model/constants';
import { ChoiseFilterProps } from '../../model/types';

export const ChooseIndustry = ({ selectedFilter, onChangeFilter }: ChoiseFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);
	const { t: tCommon } = useTranslation(i18Namespace.translation);

	const [showAll, setShowAll] = useState(false);

	const onToggleShowAll = () => {
		setShowAll(!showAll);
	};

	const onIndustry = (id: number) => {
		const newValue = INDUSTRY.find((el) => el.id === id)?.title || '';
		const updates = getUpdatedSingleFilter(newValue, selectedFilter);
		onChangeFilter(updates);
	};

	const preparedData = INDUSTRY.map((item) => ({
		...item,
		active: selectedFilter?.some((selectedItem) => item.title === selectedItem),
	})).slice(0, showAll ? INDUSTRY.length : MAX_SHOW_LIMIT_INDUSTRY);

	return (
		<Flex direction="column" align="start" gap="8">
			<BaseFilterSection data={preparedData} title={t(Vacancies.INDUSTRY)} onClick={onIndustry} />

			<Button variant="link" onClick={onToggleShowAll}>
				{!showAll ? tCommon(Translation.SHOW_ALL) : tCommon(Translation.HIDE)}
			</Button>
		</Flex>
	);
};
