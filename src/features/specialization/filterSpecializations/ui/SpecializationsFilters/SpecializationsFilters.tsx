import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations } from '@/shared/config/i18n/i18nTranslations';
import { useCurrentProject } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Switch } from '@/shared/ui/Switch';

import { UserSelect } from '@/entities/user';

import { SpecializationsFilterParams } from '../../model/types/filters';

interface SpecializationsFiltersProps {
	filters: SpecializationsFilterParams;
	onChangeAuthor: (author?: SpecializationsFilterParams['author']) => void;
	onChangeIsMy: (isMy?: SpecializationsFilterParams['isMy']) => void;
}

export const SpecializationsFilters = ({
	filters,
	onChangeAuthor,
	onChangeIsMy,
}: SpecializationsFiltersProps) => {
	const { author, isMy } = filters;

	const { t } = useTranslation(i18Namespace.specialization);

	const project = useCurrentProject();

	return (
		<Flex direction="column" gap="24">
			{project === 'admin' && onChangeIsMy && (
				<Switch
					checked={!!isMy}
					onChange={(e) => onChangeIsMy(e.target.checked)}
					label={t(Specializations.FILTER_IS_MY_TITLE)}
				/>
			)}
			<UserSelect onChange={onChangeAuthor} value={author} disabled={!!isMy} />
		</Flex>
	);
};
