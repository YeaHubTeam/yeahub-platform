import { Link, useNavigate } from 'react-router-dom';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { i18Namespace, Referrals, ROUTES } from '@/shared/config';
import { Referral } from '@/entities/referrals';
import { useTranslation } from 'react-i18next';

interface ReferralsTableProps {
	referrals?: Referral[];
	selectedReferrals?: SelectedAdminEntities<string>;
	onSelectReferrals?: (ids: SelectedAdminEntities<string>) => void;
}

export const ReferralTable = ({
	referrals,
	selectedReferrals,
	onSelectReferrals,
}: ReferralsTableProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.referral);

	const renderTableHeader = () => {
		const columns = {
			refCode: t(Referrals.REF_CODE),
			url: t(Referrals.URL),
			ownerUsername: t(Referrals.OWNER_USERNAME),
			linkedCount: t(Referrals.LINKED_COUNT),
			amountSum: t(Referrals.AMOUNT_SUM),
			createdAt: t(Referrals.CREATED_AT),
		};

		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (ref: Referral) => {
		const columns = {
			refCode: (
				<Link to={route(ROUTES.admin.referrals.detail.page, ref.id)}>
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

	const renderActions = (ref: Referral) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: 'Просмотр',
				onClick: () => {
					navigate(route(ROUTES.admin.referrals.detail.page, ref.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: 'Редактировать',
				onClick: () => {
					navigate(route(ROUTES.admin.referrals.edit.page, ref.id));
				},
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="actions"
							form="square"
							icon={<Icon icon="dotsThreeVertical" />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (!referrals) return null;

	return (
		<Table
			items={referrals}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			selectedItems={selectedReferrals}
			onSelectItems={onSelectReferrals}
			hasCopyButton
		/>
	);
};
