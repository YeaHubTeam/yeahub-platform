import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetPublicArticlesListQuery } from '@/entities/article';

import { useArticlesFilters } from '@/features/article/filterArticles';

import { ArticlesList } from '@/widgets/Article';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import styles from './ArticlesPage.module.css';
import { ArticlesPageSkeleton } from './ArticlesPage.skeleton';

const ArticlesPage = () => {
	const { t } = useTranslation(i18Namespace.article);

	const { filters, onChangePage } = useArticlesFilters({
		page: 1,
	});

	const {
		data: allArticles,
		isLoading: isLoadingAllArticles,
		isError: isErrorAllArticles,
		refetch: refetchArticles,
	} = useGetPublicArticlesListQuery({
		page: filters.page,
	});

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Articles.STUB_EMPTY_ARTICLES_TITLE),
			subtitle: t(Articles.STUB_EMPTY_ARTICLES_SUBTITLE),
		},
		error: {
			onClick: refetchArticles,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoadingAllArticles}
			skeleton={<ArticlesPageSkeleton />}
			hasData={(allArticles?.data || []).length > 0}
			hasError={isErrorAllArticles}
			stubs={stubs}
			content={<ArticlesList articles={allArticles?.data || []} />}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: allArticles?.limit || 10,
				total: allArticles?.total || 0,
			}}
		>
			{({ content, pagination }) => (
				<section className={styles.wrapper}>
					<div className={styles['main-info-wrapper']}>
						<Card className={styles.content}>
							<Flex className={styles.header} direction="row" justify="between">
								<Text variant="body6" isMainTitle maxRows={1}>
									{t(Articles.ARTICLES_TITLE)}
								</Text>
							</Flex>

							{content}
							{pagination}
						</Card>
					</div>
				</section>
			)}
		</PageWrapper>
	);
};

export default ArticlesPage;
