import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { useCurrentProject } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Switch } from '@/shared/ui/Switch';

import { ChooseCollectionAccess } from '@/entities/collection';
import { getChannelsForSpecialization, MediaLinksBanner } from '@/entities/media';
import { DEFAULT_SPECIALIZATION_ID, SpecializationsListField } from '@/entities/specialization';

import { CollectionsFilterParams } from '../../model/types/types';

interface CollectionsFiltersProps {
	filter: CollectionsFilterParams;
	onChangeTitle: (value: CollectionsFilterParams['title']) => void;
	onChangeSpecialization?: (specialization: CollectionsFilterParams['specialization']) => void;
	onChangeIsFree: (isFree: CollectionsFilterParams['isFree']) => void;
	onChangeIsMy: (isMy?: CollectionsFilterParams['isMy']) => void;
}

export const CollectionsFilters = ({
	filter,
	onChangeSpecialization,
	onChangeIsFree,
	onChangeIsMy,
}: CollectionsFiltersProps) => {
	const { specialization, isFree } = filter;
	const { t } = useTranslation(i18Namespace.collection);
	const project = useCurrentProject();

	const media = getChannelsForSpecialization(specialization ?? DEFAULT_SPECIALIZATION_ID);

	const { isMy } = filter;

	return (
		<Flex direction="column" gap="24">
			{project === 'admin' && onChangeIsMy && (
				<Switch
					checked={!!isMy}
					onChange={(e) => onChangeIsMy(e.target.checked)}
					label={t(Collections.SORT_AUTHOR_TITLE)}
				/>
			)}
			{(project === 'admin' || project === 'landing') && onChangeSpecialization && (
				<SpecializationsListField
					selectedSpecialization={specialization}
					onChangeSpecialization={onChangeSpecialization}
				/>
			)}
			{media && <MediaLinksBanner mediaLink={media} />}

			<ChooseCollectionAccess isFree={isFree} onChangeIsFree={onChangeIsFree} />
		</Flex>
	);
};
