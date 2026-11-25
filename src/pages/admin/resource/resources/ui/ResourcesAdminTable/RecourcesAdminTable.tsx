import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/shared/config';
import { i18Namespace } from '@/shared/config';
import { route, SelectedEntities } from '@/shared/libs';
import { Table } from '@/shared/ui/Table';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellLink } from '@/shared/ui/TableCellLink';

import { Resource } from '@/entities/resource';

interface ResourcesAdminTableProps {
	resources: Resource[];
}

const SKILL_SHOW_COUNT = 4;
const SPECIALIZATION_SHOW_COUNT = 2;

export const ResourcesAdminTable = ({ resources }: ResourcesAdminTableProps) => {
	const [selectedItems, setSelectedItems] = useState<SelectedEntities<string>>([]);
	const { t } = useTranslation([i18Namespace.resources, i18Namespace.marketplace]);

	const tableItems = resources.map((resource) => ({
		...resource,
		title: resource.name,
	}));

	return (
		<Table
			items={tableItems}
			hasCopyButton
			selectedItems={selectedItems}
			onSelectItems={setSelectedItems}
			renderTableHeader={() => (
				<>
					<th>{t('name')}</th>
					<th>{t('specialization.title')}</th>
					<th>{t('skills.title')}</th>
					<th>{t('type')}</th>
					<th>{t('link')}</th>
					<th>{t('author')}</th>
					<th>{t('createdAt')}</th>
				</>
			)}
			renderTableBody={(item) => (
				<>
					<td>{item.name}</td>
					<td>
						<TableCellEntityList
							url={ROUTES.admin.specializations.details.page}
							items={item.specializations}
							showCount={SPECIALIZATION_SHOW_COUNT}
						/>
					</td>
					<td>
						<TableCellEntityList
							url={ROUTES.admin.skills.details.page}
							items={item.skills}
							showCount={SKILL_SHOW_COUNT}
						/>
					</td>
					<td>
						{t(`resourceTypes.${item.type.code}`, {
							ns: i18Namespace.marketplace,
							defaultValue: item.type.code,
						})}
					</td>
					<td>
						<a href={item.url} target="_blank" rel="noopener noreferrer">
							{t('link')}
						</a>
					</td>
					<td>
						{item.createdBy && (
							<TableCellLink
								to={route(ROUTES.admin.users.detail.page, item.createdBy.id)}
								text={item.createdBy.username}
							/>
						)}
					</td>
					<td>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</td>
				</>
			)}
		/>
	);
};
