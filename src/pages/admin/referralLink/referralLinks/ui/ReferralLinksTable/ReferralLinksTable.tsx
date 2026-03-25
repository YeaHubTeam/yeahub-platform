import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { i18Namespace, ReferralLinks, ROUTES, Translation } from '@/shared/config';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverChildrenProps, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { ReferralLink } from '@/entities/referralLink';

import { DeleteReferralLinkButton } from '@/features/referralLinks/deleteReferralLink';

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
	const navigate = useNavigate();

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

	const renderActions = (ref: ReferralLink) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => navigate(route(ROUTES.admin.referralLinks.details.page, ref.id)),
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {},
			},
			{
				renderComponent: () => <DeleteReferralLinkButton id={ref.id} />,
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }: PopoverChildrenProps) => (
						<IconButton
							aria-label="open actions"
							form="square"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	return (
		<Table
			items={referralLinks}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			selectedItems={selectedReferralLinks}
			onSelectItems={onSelectReferralLinks}
			hasCopyButton
		/>
	);
};
