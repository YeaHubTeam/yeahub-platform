import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Resources, ROUTES, Translation } from '@/shared/config';
import { route, useAppSelector } from '@/shared/libs';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2 } from '@/shared/ui/TableV2';
import type { TableColumn, TableRowId } from '@/shared/ui/TableV2';

import { getIsAdmin, getUserId } from '@/entities/profile';
import { Resource, useDeleteResourceMutation } from '@/entities/resource';
import { getDeleteResourceApiErrorMessage } from '@/entities/resource';

import { ResourceActions } from './ResourceActions/ResourceActions';

interface ResourcesAdminTableProps {
	resources: Resource[];
}

export const ResourcesAdminTable = ({ resources }: ResourcesAdminTableProps) => {
	const { t } = useTranslation(i18Namespace.resources);
	const [deleteResource] = useDeleteResourceMutation();
	const currentUserId = useAppSelector(getUserId);
	const isAdmin = useAppSelector(getIsAdmin);

	const handleDeleteResource = async (resourceId: string) => {
		try {
			await deleteResource({ resourceId }).unwrap();

			toast.success(
				t(Translation.TOAST_RESOURCES_DELETE_SINGLE_SUCCESS, {
					ns: i18Namespace.translation,
				}),
			);
		} catch (error) {
			const message =
				error &&
				typeof error === 'object' &&
				'data' in error &&
				error.data &&
				typeof error.data === 'object' &&
				'message' in error.data &&
				typeof error.data.message === 'string'
					? error.data.message
					: undefined;
			toast.error(getDeleteResourceApiErrorMessage(message));
		}
	};

	const columns: TableColumn<Resource>[] = [
		{
			id: 'name',
			header: t(Resources.NAME),
			cell: ({ row }) => row.name,
		},
		{
			id: 'specializations',
			header: t(Resources.SPECIALIZATION_TITLE),
			cell: ({ row }) => (
				<TableCellEntityList
					items={row.specializations}
					showCount={2}
					url={ROUTES.admin.specializations.details.page}
				/>
			),
		},
		{
			id: 'skills',
			header: t(Resources.SKILLS),
			cell: ({ row }) => (
				<TableCellEntityList
					items={row.skills}
					showCount={4}
					url={ROUTES.admin.skills.details.page}
				/>
			),
		},
		{
			id: 'type',
			header: t(Resources.TYPE),
			cell: ({ row }) =>
				t(`resourceTypes.${row.type.code}`, {
					ns: i18Namespace.marketplace,
				}),
		},
		{
			id: 'url',
			header: t(Resources.LINK),
			cell: ({ row }) => (
				<a href={row.url} target="_blank" rel="noopener noreferrer">
					{t(Resources.LINK)}
				</a>
			),
		},
		{
			id: 'createdBy',
			header: t(Resources.AUTHOR),
			cell: ({ row }) => (
				<TableCellLink
					to={route(ROUTES.admin.users.detail.page, row.createdBy.id)}
					text={row.createdBy.username}
				/>
			),
		},
		{
			id: 'createdAt',
			header: t(Resources.CREATED_AT),
			cell: ({ row }) => new Date(row.createdAt).toLocaleDateString('ru-RU'),
		},
		{
			id: 'id',
			header: '',
			cell: ({ row }) => {
				const isAuthor = currentUserId !== '' && currentUserId === row.createdBy.id;
				const canDelete = isAdmin || isAuthor;

				return (
					<ResourceActions disabled={!canDelete} onDelete={() => handleDeleteResource(row.id)} />
				);
			},
		},
	];
	const [selectedRowIds, setSelectedRowIds] = useState<TableRowId[]>([]);

	return (
		<TableV2
			data={resources}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={setSelectedRowIds}
			actions={['copy']}
		/>
	);
};
