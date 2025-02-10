import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useDebounce } from '@/shared/hooks/useDebounced';

import { ChooseCollectionAccess, ChooseCollectionSpecialization } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';

import { SearchInput } from '@/features/common/search-input';

import { FilterParams } from '../model/types';

import styles from './CollectionsFilterPanel.module.css';

interface CollectionsFilterPanelProps {
	filter: FilterParams;
	onChangeSearch: (value: string) => void;
	onChangeSpecialization: (specialization: number[] | undefined) => void;
	onChangeIsFree: (isFree: boolean) => void;
}

export const CollectionsFilterPanel = ({
	filter,
	onChangeSearch,
	onChangeIsFree,
	onChangeSpecialization,
}: CollectionsFilterPanelProps) => {
	const { title, specialization, tariff: filterIsFree } = filter;
	const { t } = useTranslation(i18Namespace.collection);
	const profileSpecialization = useAppSelector(getSpecializationId);

	const [localIsFree, setLocalIsFree] = useState<boolean>(
		filterIsFree !== undefined ? filterIsFree : false,
	);

	const handleSearch = (value: string) => {
		onChangeSearch(value);
	};

	const handleIsFreeChange = (newIsFree: boolean) => {
		setLocalIsFree(newIsFree);
		onChangeIsFree(newIsFree);
	};

	const debouncedSearch = useDebounce(handleSearch, 500);

	return (
		<div className={styles.wrapper}>
			<SearchInput
				placeholder={t(Collections.SEARCH_PLACEHOLDER)}
				onSearch={debouncedSearch}
				currentValue={title}
			/>
			<ChooseCollectionSpecialization
				selectedSpecializations={specialization}
				onChangeSpecialization={onChangeSpecialization}
				selectedSpecialization={profileSpecialization}
			/>
			<ChooseCollectionAccess isFree={localIsFree} onChangeIsFree={handleIsFreeChange} />
		</div>
	);
};
