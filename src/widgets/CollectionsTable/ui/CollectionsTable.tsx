import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections, Translation } from '@/shared/config/i18n/i18nTranslations';
import { SelectedAdminEntities } from '@/shared/types/types';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Table } from '@/shared/ui/Table';

import { Collection } from '@/entities/collection';

import styles from './CollectionsTable.module.css';

interface CollectionsTableProps {
	collections?: Collection[];
	selectedCollections?: SelectedAdminEntities;
	onSelectCollections?: (ids: SelectedAdminEntities) => void;
}

export const CollectionsTable = ({
	collections,
	selectedCollections,
	onSelectCollections,
}: CollectionsTableProps) => {
	const { t } = useTranslation([i18Namespace.collection, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			imageSrc: t(Collections.ICON_TITLE),
			title: t(Collections.TITLE_SHORT),
			description: t(Collections.DESCRIPTION_SHORT),
			questionsQuantity: t(Collections.QUESTIONS_TITLE),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (collection: Collection) => {
		const columns = {
			imageSrc: (
				<ImageWithWrapper
					src={collection.imageSrc}
					alt={`${t(Translation.LOGO)} ${collection.title}`}
					className={styles['card-image']}
				/>
			),
			title: collection.title,
			description: collection.description,
			questionsQuantity: collection.questionsQuantity,
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k} className={k === 'description' ? styles.description : undefined}>
				{v}
			</td>
		));
	};

	if (!collections) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={collections}
			selectedItems={selectedCollections}
			onSelectItems={onSelectCollections}
		/>
	);
};
