import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationsListQuery } from '../../api/specializationApi';
import {
	DEFAULT_SPECIALIZATION_ID,
	MAX_SHOW_LIMIT_SPECIALIZATIONS,
} from '../../model/constants/specializationConstants';

interface ChooseSpecializationProps {
	selectedSpecialization?: number;
	onChangeSpecialization: (specialization: number | undefined) => void;
	shouldShowScroll?: boolean;
}

export const SpecializationsListField = ({
	selectedSpecialization = DEFAULT_SPECIALIZATION_ID,
	onChangeSpecialization,
}: ChooseSpecializationProps) => {
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
		onChangeSpecialization(id);
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
