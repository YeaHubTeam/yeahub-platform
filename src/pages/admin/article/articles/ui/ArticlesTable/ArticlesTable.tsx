import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace, ROUTES, Translation } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableColumn, TableState, TableV2 } from '@/shared/ui/TableV2';

import { Article, ArticleTopic, ArticleTopicsCell } from '@/entities/article';

import styles from './ArticlesTable.module.css';

const SKILL_SHOW_COUNT = 4;
const SPECIALIZATION_SHOW_COUNT = 2;

interface ArticleTableRow {
	id: number;
	imageSrc: string;
	title: string;
	specializations: Article['articleSpecializations'];
	skills: Article['articleSkills'];
	topics: ArticleTopic[];
	format: string;
	contentType: string;
	author: string;
	createdAt: string;
}

interface ArticlesTableProps {
	articles: Article[];
	tableState?: TableState;
}

export const ArticlesTable = ({ articles, tableState }: ArticlesTableProps) => {
	const { t } = useTranslation(i18Namespace.article);

	const tableData: ArticleTableRow[] =
		articles?.map((article) => ({
			id: article.id,
			imageSrc: article.imageSrc ?? '',
			title: article.title,
			specializations: article.articleSpecializations,
			skills: article.articleSkills,
			topics: article.topics ?? [],
			format: article.format ?? '',
			contentType: article.contentType ?? '',
			author: article.createdBy?.username ?? '-',
			createdAt: article.createdAt ? formatDate(new Date(article.createdAt), 'dd.MM.yyyy') : '',
		})) ?? [];

	const columns: Array<TableColumn<ArticleTableRow>> = [
		{
			id: 'imageSrc',
			header: t(Articles.ICON_TITLE_SHORT),
			width: '150px',
			cell: ({ row }) => (
				<ImageWithWrapper
					src={row.imageSrc || ''}
					alt={`${t(Translation.LOGO)} ${row.title}`}
					className={styles['card-image']}
				/>
			),
		},
		{
			id: 'title',
			header: t(Articles.TITLE_SHORT),
			width: '500px',
		},
		{
			id: 'specializations',
			header: t(Articles.SPECIALIZATIONS_TITLE),
			width: '300px',
			cell: ({ row }) => (
				<TableCellEntityList
					url={ROUTES.admin.specializations.details.page}
					items={row.specializations}
					showCount={SPECIALIZATION_SHOW_COUNT}
				/>
			),
		},
		{
			id: 'skills',
			header: t(Articles.SKILLS_TITLE),
			width: '200px',
			cell: ({ row }) => (
				<TableCellEntityList
					url={ROUTES.admin.skills.details.page}
					items={row.skills}
					showCount={SKILL_SHOW_COUNT}
				/>
			),
		},
		{
			id: 'topics',
			header: t(Articles.TOPIC_TITLE),
			width: '200px',
			cell: ({ row }) => <ArticleTopicsCell items={row.topics} />,
		},
		{
			id: 'format',
			header: t(Articles.FORMAT),
			width: '150px',
		},
		{
			id: 'author',
			header: t(Articles.AUTHOR),
			width: '200px',
		},
		{
			id: 'createdAt',
			header: t(Articles.CREATED_AT),
			width: '150px',
		},
	];

	return (
		<TableV2
			data={tableData}
			columns={columns}
			actions={['copy']}
			entity="articles"
			tableState={tableState}
		/>
	);
};
