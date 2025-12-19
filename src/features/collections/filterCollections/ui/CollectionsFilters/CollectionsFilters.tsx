import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { useCurrentProject } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Switch } from '@/shared/ui/Switch';

import { ChooseCollectionAccess, CollectionsFilterParams } from '@/entities/collection';
import { getChannelsForSpecialization, MediaLinksBanner } from '@/entities/socialMedia';
import { DEFAULT_SPECIALIZATION_ID, SpecializationsListField } from '@/entities/specialization';
import { UserSelect } from '@/entities/user';

import { useCollectionsFilters } from '../../model/hooks/useCollectionsFilters';

interface CollectionsFiltersProps {
	filter: CollectionsFilterParams;
	onChangeTitle?: (value: CollectionsFilterParams['title']) => void;
	onChangeSpecialization?: (specialization: CollectionsFilterParams['specialization']) => void;
	onChangeIsFree: (isFree: CollectionsFilterParams['isFree']) => void;
	onChangeAuthor?: (authorId?: CollectionsFilterParams['authorId']) => void;
	onChangeIsMy?: (isMy?: CollectionsFilterParams['isMy']) => void;
}

export const CollectionsFilters = ({
	filter,
	onChangeTitle,
	onChangeSpecialization,
	onChangeIsFree,
	onChangeIsMy,
}: CollectionsFiltersProps) => {
	const { specialization, isFree, isMy, title } = filter;
	const { t } = useTranslation(i18Namespace.collection);
	const project = useCurrentProject();

	const handleSearch = (value: CollectionsFilterParams['title']) => {
		onChangeTitle?.(value);
	};

	const handleSpecializationChange = (
		specialization: CollectionsFilterParams['specialization'],
	) => {
		if (specialization) {
			onChangeSpecialization?.(specialization);
		}
	};

	const { onChangeAuthor } = useCollectionsFilters({
		page: 1,
	});

	const media = getChannelsForSpecialization(specialization ?? DEFAULT_SPECIALIZATION_ID);

	return (
		<Flex direction="column" gap="24">
			{(project === 'landing' || project === 'platform') && (
				<SearchInput
					placeholder={t(Collections.SEARCH_PLACEHOLDER)}
					onSearch={handleSearch}
					currentValue={title}
				/>
			)}
			{project === 'admin' && onChangeIsMy && (
				<Switch
					checked={!!isMy}
					onChange={(e) => onChangeIsMy(e.target.checked)}
					label={t(Collections.SORT_AUTHOR_TITLE)}
				/>
			)}
			{project === 'admin' && (
				<UserSelect value={filter.authorId} onChange={onChangeAuthor} disabled={!!isMy} />
			)}
			{(project === 'admin' || project === 'landing') && onChangeSpecialization && (
				<SpecializationsListField
					selectedSpecialization={specialization}
					onChangeSpecialization={handleSpecializationChange}
				/>
			)}
			<ChooseCollectionAccess isFree={isFree} onChangeIsFree={onChangeIsFree} />

			{media && <MediaLinksBanner mediaLink={media} />}
		</Flex>
	);
};
