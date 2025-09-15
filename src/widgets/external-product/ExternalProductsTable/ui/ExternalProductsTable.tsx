import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { ExternalProducts } from '@/shared/config/i18n/i18nTranslations';
import { SelectedAdminEntities, SelectedAdminEntity } from '@/shared/types/types';
import { Table } from '@/shared/ui/Table';

import { ExternalProduct } from '@/entities/external-product';
import { ExternalProductStatus } from '@/entities/external-product/ui/ExternalProductStatus/ExternalProductStatus';

interface ExternalProductsTableProps {
	externalProducts?: ExternalProduct[];
	selectedExternalProducts?: SelectedAdminEntities;
	onSelectExternalProducts?: (ids: SelectedAdminEntities) => void;
}

export const ExternalProductsTable = ({
	externalProducts,
	selectedExternalProducts,
	onSelectExternalProducts,
}: ExternalProductsTableProps) => {
	const { t } = useTranslation([i18Namespace.translation, i18Namespace.externalProducts]);

	const renderTableHeader = () => {
		const columns = {
			name: t(ExternalProducts.TITLE, { ns: i18Namespace.externalProducts }),
			status: t(ExternalProducts.STATUS, { ns: i18Namespace.externalProducts }),
			specializations: t(ExternalProducts.SPECIALIZATIONS, { ns: i18Namespace.externalProducts }),
			type: t(ExternalProducts.TYPE, { ns: i18Namespace.externalProducts }),
			author: t(ExternalProducts.AUTHOR, { ns: i18Namespace.externalProducts }),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (item: SelectedAdminEntity) => {
		const externalProduct = item as unknown as ExternalProduct;

		const columns = {
			name: externalProduct.name,
			status: <ExternalProductStatus statusCode={externalProduct.type.code} />,
			specializations: externalProduct.specializations.map((spec) => spec.title).join(', '),
			type: externalProduct.type.description,
			author: externalProduct.createdById,
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	if (!externalProducts) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={externalProducts as SelectedAdminEntities}
			selectedItems={selectedExternalProducts}
			onSelectItems={onSelectExternalProducts}
		/>
	);
};
