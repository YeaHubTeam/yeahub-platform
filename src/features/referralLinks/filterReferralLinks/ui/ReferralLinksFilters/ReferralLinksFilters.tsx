import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { useCurrentProject } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { OrderFilter } from '@/shared/ui/OrderFilter';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Switch } from '@/shared/ui/Switch';

import { ReferralLinksFilterParams } from '@/entities/referralLink';
import { UserSelect } from '@/entities/user';

import { ReferralLinksSortByFieldFilter } from '../ReferralLinksSortByFieldFilter/ReferralLinksSortByFieldFilter';

interface RefferalLinksFiltersProps {
	filter: ReferralLinksFilterParams;
	onChangeTitle?: (value: ReferralLinksFilterParams['title']) => void;
	onChangeIsMy?: (isMy?: ReferralLinksFilterParams['isMy']) => void;
	onChangeOwner: (isMy?: ReferralLinksFilterParams['ownerId']) => void;
	onChangeOrderBy?: (orderBy?: ReferralLinksFilterParams['orderBy']) => void;
	onChangeOrder?: (order?: ReferralLinksFilterParams['order']) => void;
}

export const RefferalLinksFilters = ({
	filter,
	onChangeTitle,
	onChangeIsMy,
	onChangeOwner,
	onChangeOrderBy,
	onChangeOrder,
}: RefferalLinksFiltersProps) => {
	const { title, isMy, orderBy, order } = filter;
	const { t } = useTranslation(i18Namespace.referralLink);
	const project = useCurrentProject();

	const handleSearch = (value: ReferralLinksFilterParams['title']) => {
		onChangeTitle?.(value);
	};
	return (
		<Flex direction="column" gap="24">
			{(project === 'landing' || project === 'platform') && (
				<SearchInput
					placeholder={t(ReferralLinks.SEARCH_PLACEHOLDER)}
					onSearch={handleSearch}
					currentValue={title}
				/>
			)}
			{project === 'admin' && onChangeIsMy && (
				<Switch
					checked={!!isMy}
					onChange={(e) => onChangeIsMy(e.target.checked)}
					label={t(ReferralLinks.FILTER_MY_REFERRALS)}
				/>
			)}
			{project === 'admin' && (
				<UserSelect
					value={filter.ownerId}
					onChange={onChangeOwner}
					disabled={!!isMy}
					placeholder={t(ReferralLinks.SELECT_OWNER_PLACEHOLDER)}
					title={t(ReferralLinks.OWNER_USERNAME)}
				/>
			)}
			{project === 'admin' && onChangeOrderBy && (
				<ReferralLinksSortByFieldFilter
					onChangeOrderBy={onChangeOrderBy}
					selectedOrderBy={orderBy}
				/>
			)}
			{project === 'admin' && onChangeOrder && (
				<OrderFilter changeOrder={onChangeOrder} selectedOrder={order} />
			)}
		</Flex>
	);
};
