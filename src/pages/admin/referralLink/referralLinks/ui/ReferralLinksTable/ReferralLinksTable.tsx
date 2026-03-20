import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, ReferralLinks, ROUTES } from '@/shared/config';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { ReferralLink } from '@/entities/referralLink';

interface ReferralLinksTableProps {
	referralLinks: ReferralLink[];
	selectedReferralLinks?: SelectedAdminEntities<string>;
	onSelectReferralLinks?: (ids: SelectedAdminEntities<string>) => void;
}

export const ReferralLinksTable = ({
	referralLinks,
	selectedReferralLinks,
	onSelectReferralLinks,
}: ReferralLinksTableProps) => {
	const { t } = useTranslation([i18Namespace.referralLink, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			refCode: t(ReferralLinks.REF_CODE),
			url: t(ReferralLinks.URL),
			ownerUsername: t(ReferralLinks.OWNER_USERNAME),
			linkedCount: t(ReferralLinks.LINKED_COUNT),
			amountSum: t(ReferralLinks.AMOUNT_SUM),
			createdAt: t(ReferralLinks.CREATED_AT),
		};

		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (ref: ReferralLink) => {
		const columns = {
			refCode: (
				<Link to={route(ROUTES.admin.referralLinks.details.page, ref.id)}>
					<Text variant="body3-accent">{ref.refCode}</Text>
				</Link>
			),
			url: ref.url,
			ownerUsername: ref.ownerUsername,
			linkedCount: ref.linkedCount,
			amountSum: ref.amountSum,
			createdAt: new Date(ref.createdAt).toLocaleDateString(),
		};

		return Object.entries(columns).map(([k, v]) => (
			<td key={k}>
				{typeof v === 'string' || typeof v === 'number' ? (
					<Text variant="body3-accent">{v}</Text>
				) : (
					v
				)}
			</td>
		));
	};

	return (
		<Table
			items={referralLinks}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			selectedItems={selectedReferralLinks}
			onSelectItems={onSelectReferralLinks}
			hasCopyButton
		/>
	);
};
