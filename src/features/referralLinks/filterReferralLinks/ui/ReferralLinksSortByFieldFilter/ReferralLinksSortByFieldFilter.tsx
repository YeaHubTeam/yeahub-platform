import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { ReferralLinksFilterOrderBy } from '@/entities/referralLink';

interface ReferralLinksSortByFieldFilterProps {
	onChangeOrderBy: (orderBy?: ReferralLinksFilterOrderBy) => void;
	selectedOrderBy?: ReferralLinksFilterOrderBy;
}

export const ReferralLinksSortByFieldFilter = ({
	onChangeOrderBy,
	selectedOrderBy,
}: ReferralLinksSortByFieldFilterProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);

	const field: BaseFilterItem<ReferralLinksFilterOrderBy>[] = [
		{ id: 'linkedCount', title: t(ReferralLinks.LINKED_COUNT) },
		{ id: 'amountSum', title: t(ReferralLinks.AMOUNT_SUM) },
		{ id: 'createdAt', title: t(ReferralLinks.CREATED_AT) },
		{ id: 'refCode', title: t(ReferralLinks.REF_CODE) },
	];
	const preparedData = field.map((item) => ({
		...item,
		active: selectedOrderBy === item.id,
	}));

	const onChangeOrder = (orderBy: ReferralLinksFilterOrderBy) => {
		onChangeOrderBy(orderBy === selectedOrderBy ? undefined : orderBy);
	};

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(ReferralLinks.SORT_FIELD)}
			onClick={onChangeOrder}
		/>
	);
};
