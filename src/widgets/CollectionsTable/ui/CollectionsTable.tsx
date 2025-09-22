import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';

import { DeleteCollectionButton } from '@/features/collections/deleteCollection';

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

	const renderTableColumnWidths = () => {
		const columnWidths = {
			imageSrc: '100px',
			title: '30%',
			description: 'auto',
			questionsCount: '90px',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			imageSrc: t(Collections.ICON_TITLE_SHORT),
			title: t(Collections.TITLE_SHORT),
			description: t(Collections.DESCRIPTION_SHORT),
			questionsCount: t(Collections.QUESTIONS_SHORT),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (collection: Collection) => {
		const columns = {
			imageSrc: (
				<ImageWithWrapper
					src={collection.company?.imageSrc || ''}
					alt={`${t(Translation.LOGO)} ${collection.title}`}
					className={styles['card-image']}
				/>
			),
			title: collection.title,
			description: collection.description,
			questionsCount: collection.questionsCount,
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td
				key={k}
				className={classNames({
					[styles.description]: k === 'description',
					[styles['questions-count']]: k === 'questionsCount',
				})}
			>
				{k === 'title' ? (
					<Link to={route(ROUTES.admin.collections.details.route, collection.id)}>
						<Text variant={'body3'} color={'purple-700'}>
							{v}
						</Text>
					</Link>
				) : (
					v
				)}
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
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				tooltip: {
					color: 'red',
					text: t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO, { ns: i18Namespace.translation }),
				},
				disabled: collection.disabled,
				onClick: () => {
					navigate(route(ROUTES.admin.questions.edit.route, collection.id));
				},
			},
			{
				renderComponent: () => (
					<DeleteCollectionButton collectionId={collection.id} disabled={collection.disabled} />
				),
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
							size="medium"
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
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};
