import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { useCurrentProject } from '@/shared/hooks';
import { SearchInput } from '@/shared/ui/SearchInput';

import { ChooseCollectionAccess } from '@/entities/collection';
import { getChannelsForSpecialization, MediaLinksBanner } from '@/entities/media';
import { DEFAULT_SPECIALIZATION_ID, SpecializationsListField } from '@/entities/specialization';

import { CollectionsFilterParams } from '../../model/types/types';

import styles from './CollectionsFilters.module.css';

interface CollectionsFiltersProps {
	filter: CollectionsFilterParams;
	onChangeTitle: (value: CollectionsFilterParams['title']) => void;
	onChangeSpecialization?: (specialization: CollectionsFilterParams['specialization']) => void;
	onChangeIsFree: (isFree: CollectionsFilterParams['isFree']) => void;
}

export const CollectionsFilters = ({
	filter,
	onChangeTitle,
	onChangeSpecialization,
	onChangeIsFree,
}: CollectionsFiltersProps) => {
	const { title, specialization, isFree } = filter;
	const { t } = useTranslation(i18Namespace.collection);
	const project = useCurrentProject();

	const handleSearch = (value: CollectionsFilterParams['title']) => {
		onChangeTitle(value);
	};

	const handleSpecializationChange = (
		specialization: CollectionsFilterParams['specialization'],
	) => {
		if (specialization) {
			onChangeSpecialization?.(specialization);
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

			<ChooseCollectionAccess isFree={isFree} onChangeIsFree={onChangeIsFree} />
		</div>
	);
};
