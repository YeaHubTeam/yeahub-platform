import { useTranslation } from 'react-i18next';

import { i18Namespace, Companies } from '@/shared/config';
import { useCurrentProject } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Switch } from '@/shared/ui/Switch';

import { UserSelect } from '@/entities/user';

import { CompaniesFilterParams } from '../../model/types/filters';

interface CompaniesFiltersProps {
	filters: CompaniesFilterParams;
	onChangeAuthor: (author?: CompaniesFilterParams['author']) => void;
	onChangeIsMy?: (isMy?: CompaniesFilterParams['isMy']) => void;
}
export const CompaniesFilters = ({
	filters,
	onChangeIsMy,
	onChangeAuthor,
}: CompaniesFiltersProps) => {
	const { isMy, author } = filters;
	const { t } = useTranslation(i18Namespace.companies);
	const project = useCurrentProject();

	return (
		<Flex direction="column" gap="24">
			{project === 'admin' && onChangeIsMy && (
				<Switch
					checked={isMy ?? false}
					onChange={(e) => onChangeIsMy(e.target.checked)}
					label={t(Companies.TITLE_MY)}
				/>
			)}
			<UserSelect onChange={onChangeAuthor} value={author} disabled={!!isMy} />
		</Flex>
	);
};
