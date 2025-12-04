import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations, Translation } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationsListQuery } from '../../api/specializationApi';
import { MAX_SHOW_LIMIT_SPECIALIZATIONS } from '../../model/constants/specializationConstants';

interface SpecializationsListFieldProps {
	selectedSpecialization?: number;
	onChangeSpecialization: (specialization?: number) => void;
}

export const SpecializationsListField = ({
	selectedSpecialization,
	onChangeSpecialization,
}: SpecializationsListFieldProps) => {
	const { t } = useTranslation([i18Namespace.specialization, i18Namespace.translation]);
	const { isMobile } = useScreenSize();

	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(MAX_SHOW_LIMIT_SPECIALIZATIONS);

	const { data: specializations } = useGetSpecializationsListQuery({
		limit,
	});

	const onToggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit((limit) => specializations?.total ?? limit);
		} else {
			setLimit(MAX_SHOW_LIMIT_SPECIALIZATIONS);
		}
	}, [limit, specializations?.total, showAll, isMobile]);

	const onChooseSpecialization = (id: number) => {
		onChangeSpecialization(id === selectedSpecialization ? undefined : id);
	};

	const specializationsItems: BaseFilterItem<number>[] | undefined = useMemo(
		() =>
			specializations?.data.map(({ id, title }) => ({
				id,
				title,
				active: selectedSpecialization === id,
			})),
		[specializations, selectedSpecialization],
	);

	if (!specializationsItems) return null;

	return (
		<Flex direction="column" align="start" gap="8">
			<BaseFilterSection
				data={specializationsItems}
				title={t(Specializations.TITLE_MAIN)}
				onClick={onChooseSpecialization}
			/>
			{!isMobile && (
				<Button variant="link" onClick={onToggleShowAll}>
					{!showAll
						? t(Translation.SHOW_ALL, { ns: i18Namespace.translation })
						: t(Translation.HIDE, { ns: i18Namespace.translation })}
				</Button>
			)}
		</Flex>
	);
};
