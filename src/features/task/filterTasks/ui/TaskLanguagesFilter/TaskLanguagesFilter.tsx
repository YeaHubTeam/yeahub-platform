import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { useGetLanguagesQuery } from '@/entities/programmingLanguage';

interface TaskLanguagesFilterProps {
	selectedLangIds?: number[];
	onChangeLangIds: (langIds?: number[]) => void;
}

export const TaskLanguagesFilter = ({
	selectedLangIds,
	onChangeLangIds,
}: TaskLanguagesFilterProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const { data: languages = [], isLoading } = useGetLanguagesQuery();

	const selectedIds = selectedLangIds || [];

	const preparedData = languages.map((lang) => ({
		id: lang.id,
		title: lang.name,
		active: selectedIds.includes(lang.id),
	}));

	const onToggleLanguage = (langId: number) => {
		const isSelected = selectedIds.includes(langId);

		const updatedLandIds = isSelected
			? selectedIds.filter((id) => id !== langId)
			: [...selectedIds, langId];

		onChangeLangIds(updatedLandIds.length > 0 ? updatedLandIds : undefined);
	};

	return (
		<BaseFilterSection
			title={t(Tasks.LANGUAGES_TITLE)}
			data={preparedData}
			onClick={onToggleLanguage}
			disabled={isLoading}
		/>
	);
};
