import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { useCurrentProject } from '@/shared/hooks';
import { useDebounce } from '@/shared/hooks/useDebounced';
import { SearchInput } from '@/shared/ui/SearchInput';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getChannelsForSpecializationById, MediaLinksBanner } from '@/entities/media';
import { ChooseSpecialization } from '@/entities/question';

import { FilterParams } from '../../model/types/types';

import styles from './CollectionsFilterPanel.module.css';

const DEFAULT_SPECIALIZATION = 11;
interface CollectionsFilterPanelProps {
	filter: FilterParams;
	onChangeSearch: (value: string) => void;
	onChangeSpecialization: (specialization: number[] | number) => void;
	onChangeIsFree: (isFree: boolean) => void;
}

export const CollectionsFilterPanel = ({
	filter,
	onChangeSearch,
	onChangeIsFree,
	onChangeSpecialization,
}: CollectionsFilterPanelProps) => {
	const { title, specialization: filterSpecialization, isFree: filterIsFree } = filter;
	const { t } = useTranslation(i18Namespace.collection);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [localIsFree, setLocalIsFree] = useState<boolean>(
		filterIsFree !== undefined ? filterIsFree : false,
	);
	const [localSpecialization, setLocalSpecialization] = useState<number | undefined>(
		Array.isArray(filterSpecialization) ? filterSpecialization[0] : filterSpecialization,
	);
	const project = useCurrentProject();

	const handleSearch = (value: string) => {
		onChangeSearch(value);
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleIsFreeChange = (newIsFree: boolean) => {
		setLocalIsFree(newIsFree);
		onChangeIsFree(newIsFree);
	};

	const handleSpecializationChange = (newSpecialization: number | undefined) => {
		setLocalSpecialization(newSpecialization);
		if (newSpecialization) {
			onChangeSpecialization([newSpecialization]);
		}
	};

	const debouncedSearch = useDebounce(handleSearch, 500);
	const media = getChannelsForSpecializationById(
		localSpecialization ? localSpecialization : DEFAULT_SPECIALIZATION,
	);
	return (
		<div className={styles.wrapper}>
			<SearchInput
				placeholder={t(Collections.SEARCH_PLACEHOLDER)}
				onSearch={debouncedSearch}
				currentValue={title}
			/>
			{project === 'landing' && (
				<>
					<ChooseSpecialization
						selectedSpecialization={localSpecialization}
						onChangeSpecialization={handleSpecializationChange}
					/>
					{media && <MediaLinksBanner mediaLink={media} />}
				</>
			)}

			{/* <ChooseCollectionAccess isFree={localIsFree} onChangeIsFree={handleIsFreeChange} /> */}
		</div>
	);
};
