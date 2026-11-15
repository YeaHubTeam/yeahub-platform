import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Flex } from '@/shared/ui/Flex';
import { ToggleShowAllButton } from '@/shared/ui/ToggleShowAllButton';

import { useGetSpecializationsListQuery } from '../../api/specializationApi';
import { MAX_SHOW_LIMIT_SPECIALIZATIONS } from '../../model/constants/specializationConstants';

interface SpecializationsMultiListFieldProps {
	selectedSpecializations?: number[];
	onChangeSpecializations: (specializations?: number[]) => void;
}

export const SpecializationsMultiListField = ({
	selectedSpecializations,
	onChangeSpecializations,
}: SpecializationsMultiListFieldProps) => {
	const { t } = useTranslation([i18Namespace.specialization, i18Namespace.translation]);
	const { isMobile } = useScreenSize();

	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(MAX_SHOW_LIMIT_SPECIALIZATIONS);

	const { data: specializations } = useGetSpecializationsListQuery({ limit });

	const onToggleShowAll = () => {
		setShowAll((prev) => !prev);
	};

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit((limit) => specializations?.total ?? limit);
		} else {
			setLimit(MAX_SHOW_LIMIT_SPECIALIZATIONS);
		}
	}, [limit, specializations?.total, showAll, isMobile]);

	const onChooseSpecialization = (id: number) => {
		const currentSpecializations = selectedSpecializations ?? [];
		const nextSpecializations = currentSpecializations.includes(id)
			? currentSpecializations.filter((specializationId) => specializationId !== id)
			: [...currentSpecializations, id];

		onChangeSpecializations(nextSpecializations.length > 0 ? nextSpecializations : undefined);
	};

	const specializationsItems: BaseFilterItem<number>[] | undefined = useMemo(
		() =>
			specializations?.data.map(({ id, title }) => ({
				id,
				title,
				active: selectedSpecializations?.includes(id),
			})),
		[specializations, selectedSpecializations],
	);

	if (!specializationsItems) return null;

	return (
		<Flex direction="column" align="start" gap="8">
			<BaseFilterSection
				data={specializationsItems}
				title={t(Specializations.TITLE_MAIN)}
				onClick={onChooseSpecialization}
			/>
			{!isMobile && <ToggleShowAllButton isToggled={showAll} onToggle={onToggleShowAll} />}
		</Flex>
	);
};
