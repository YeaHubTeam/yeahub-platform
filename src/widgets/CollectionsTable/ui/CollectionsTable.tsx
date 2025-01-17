import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Flex } from '@/shared/ui/Flex';
import { IconButton } from '@/shared/ui/IconButton';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
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
	const navigate = useNavigate();

	const { t } = useTranslation([i18Namespace.collection, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			imageSrc: t(Collections.ICON_TITLE_SHORT),
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

	const renderActions = (collection: Collection) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.collections.details.route, collection.id));
				},
			},
			{
				icon: <Icon icon="pencil" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.collections.edit.route, collection.id));
				},
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to details"
							form="square"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
							size="M"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (!collections) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={collections}
			selectedItems={selectedCollections}
			onSelectItems={onSelectCollections}
		/>
	);
};
