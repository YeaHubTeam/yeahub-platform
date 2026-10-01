import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetArticlesListQuery } from '@/entities/article';

import { useArticlesFilters } from '@/features/article/filterArticles';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { ArticlesTable } from '../ArticlesTable/ArticlesTable';

import styles from './ArticlesTablePage.module.css';

const ArticlesPage = () => {
	const { t } = useTranslation(i18Namespace.article);

	const { filters, onChangePage } = useArticlesFilters({
		page: 1,
	});

	const {
		data: allArticles,
		isLoading: isLoadingArticles,
		isFetching: isFetchingArticles,
		isError: isErrorArticles,
		refetch: refetchArticles,
	} = useGetArticlesListQuery({ page: filters.page });

	const articles = allArticles?.data ?? [];
	const hasArticles = articles.length > 0;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Articles.STUB_EMPTY_ARTICLES_TITLE, { ns: i18Namespace.article }),
			subtitle: t(Articles.STUB_EMPTY_ARTICLES_SUBTITLE, { ns: i18Namespace.article }),
		},
		error: {
			onClick: refetchArticles,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoadingArticles}
			hasError={isErrorArticles}
			hasData={hasArticles}
			stubs={stubs}
			content={
				<ArticlesTable articles={articles} tableState={{ isFetching: isFetchingArticles }} />
			}
			roles={['admin', 'author']}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: allArticles?.limit || 0,
				total: allArticles?.total || 0,
			}}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<Card className={styles.content}>
						<>
							{content}
							{pagination}
						</>
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default ArticlesPage;
