import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Resources } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { Resource } from '@/entities/resource';

interface ResourcesTableProps {
	resources?: Resource[];
}

export const ResourcesTable = ({ resources }: ResourcesTableProps) => {
	const { t } = useTranslation([i18Namespace.resources, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			title: t(Resources.TITLE_SHORT),
			accessCategory: t(Resources.ACCESS_CATEGORY),
			description: t(Resources.DESCRIPTION),
			author: t(Resources.AUTHOR),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (resource: Resource) => {
		const columns = {
			title: resource.name,
			accessCategory: resource.accessCategory,
			description: resource.description,
			author: resource.provider,
		};

		return Object.entries(columns)?.map(([k, v]) => {
			return (
				<td key={k}>
					{k === 'title' ? (
						<Link to={route(ROUTES.admin.resources.details.route, resource.id)}>
							<Text variant={'body3'} color={'purple-700'}>
								{v}
							</Text>
						</Link>
					) : (
						v
					)}
				</td>
			);
		});
	};

	if (!resources) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={resources}
		/>
	);
};
