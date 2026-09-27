import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks, ROUTES } from '@/shared/config';
import { route, SelectedAdminEntities, SelectedAdminEntity } from '@/shared/libs';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn, type TableRowId } from '@/shared/ui/TableV2';

import { ReferralLink } from '@/entities/referralLink';

import { useDeleteReferralLinkMutation } from '@/features/referralLinks/deleteReferralLink';

interface ReferralLinksTableRow {
	id: string;
	refCode: string;
	url: string;
	ownerUsername: string;
	linkedCount: number;
	amountSum: number;
	createdAt: string;
}

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
	const { t } = useTranslation(i18Namespace.referralLink);
	const [deleteReferralLink] = useDeleteReferralLinkMutation();

	const tableData: ReferralLinksTableRow[] =
		referralLinks?.map((referralLink) => ({
			id: referralLink.id,
			ownerUsername: referralLink.ownerUsername,
			refCode: referralLink.refCode,
			url: referralLink.url,
			linkedCount: referralLink.linkedCount,
			amountSum: referralLink.amountSum,
			createdAt: new Date(referralLink.createdAt).toLocaleDateString(),
		})) ?? [];

	const columns: TableColumn<ReferralLinksTableRow>[] = [
		{
			id: 'refCode',
			header: t(ReferralLinks.REF_CODE),
			cell: ({ row }) => (
				<TableCellLink
					to={route(ROUTES.admin.referralLinks.details.page, row.id)}
					text={row.refCode}
				/>
			),
		},
		{
			id: 'url',
			header: t(ReferralLinks.URL),
			cell: ({ row }) => <TableCellLink to={row.url} text={row.url} />,
		},
		{
			id: 'ownerUsername',
			header: t(ReferralLinks.OWNER_USERNAME),
		},
		{
			id: 'linkedCount',
			header: t(ReferralLinks.LINKED_COUNT),
		},
		{
			id: 'amountSum',
			header: t(ReferralLinks.AMOUNT_SUM),
		},
		{
			id: 'createdAt',
			header: t(ReferralLinks.CREATED_AT),
		},
	];

	const selectedRowIds = selectedReferralLinks?.map((referralLink) => referralLink.id);

	const selectedById = useMemo(() => {
		const byId = new Map<string, SelectedAdminEntity<string>>();

		selectedReferralLinks?.forEach((referralLink) => {
			byId.set(referralLink.id, referralLink);
		});

		referralLinks.forEach((referralLink) => {
			byId.set(referralLink.id, {
				id: referralLink.id,
			});
		});

		return byId;
	}, [referralLinks, selectedReferralLinks]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectReferralLinks?.(
				ids.map(
					(id) =>
						selectedById.get(id as string) ?? {
							id: id as string,
						},
				),
			);
		},
		[onSelectReferralLinks, selectedById],
	);

	return (
		<TableV2
			data={tableData}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			actions={['detail', 'edit', 'delete', 'copy']}
			entity="referralLinks"
			onDelete={(id) => deleteReferralLink(id as string)}
		/>
	);
};
