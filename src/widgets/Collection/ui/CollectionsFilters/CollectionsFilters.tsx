import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { useCurrentProject } from '@/shared/hooks';
import { SearchInput } from '@/shared/ui/SearchInput';

import { getChannelsForSpecialization, MediaLinksBanner } from '@/entities/media';
import { DEFAULT_SPECIALIZATION_ID, SpecializationsListField } from '@/entities/specialization';

import { CollectionsFilterParams } from '../../model/types/types';

import styles from './CollectionsFilters.module.css';

interface CollectionsFiltersProps {
	filter: CollectionsFilterParams;
	onChangeSearch: (value: string) => void;
	onChangeSpecialization?: (specialization: number) => void;
}

export const CollectionsFilters = ({
	filter,
	onChangeSearch,
	onChangeSpecialization,
}: CollectionsFiltersProps) => {
	const { title, specialization } = filter;
	const { t } = useTranslation(i18Namespace.collection);
	const project = useCurrentProject();

	const handleSearch = (value: string) => {
		onChangeSearch(value);
	};

	const handleSpecializationChange = (newSpecialization: number | undefined) => {
		if (newSpecialization) {
			onChangeSpecialization?.(newSpecialization);
		}
	};

	const media = getChannelsForSpecialization(specialization ?? DEFAULT_SPECIALIZATION_ID);

	return (
		<div className={styles.wrapper}>
			<SearchInput
				placeholder={t(Collections.SEARCH_PLACEHOLDER)}
				onSearch={handleSearch}
				currentValue={title}
			/>
			{project === 'landing' && (
				<>
					<SpecializationsListField
						selectedSpecialization={specialization}
						onChangeSpecialization={handleSpecializationChange}
					/>
					{media && <MediaLinksBanner mediaLink={media} />}
				</>
			)}

			{/* <ChooseCollectionAccess isFree={localIsFree} onChangeIsFree={handleIsFreeChange} /> */}
		</div>
	);
};
