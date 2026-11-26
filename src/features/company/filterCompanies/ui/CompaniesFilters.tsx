import { useTranslation } from 'react-i18next';

import { Companies, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Switch } from '@/shared/ui/Switch';

import { UserSelect } from '@/entities/user';

import { CompaniesFilterParams } from '../model/types/filters';

interface CompaniesFiltersProps {
	filters: CompaniesFilterParams;
	onChangeIsMy: (isMy?: CompaniesFilterParams['isMy']) => void;
	onChangeAuthor: (authorId?: CompaniesFilterParams['authorId']) => void;
}

export const CompaniesFilters = ({
	filters,
	onChangeIsMy,
	onChangeAuthor,
}: CompaniesFiltersProps) => {
	const { isMy, authorId } = filters;
	const { t } = useTranslation(i18Namespace.companies);

	return (
		<Flex direction="column" gap="24">
			<Switch
				checked={isMy ?? false}
				onChange={(e) => onChangeIsMy(e.target.checked)}
				label={t(Companies.TITLE_MY)}
			/>
			<UserSelect
				onChange={onChangeAuthor}
				value={authorId}
				disabled={!!isMy}
				title={t(Companies.AUTHOR)}
				placeholder={t(Companies.AUTHOR_PLACEHOLDER)}
			/>
		</Flex>
	);
};
