import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Questions, ROUTES } from '@/shared/config';

import { useGetArticleByIdQuery } from '@/entities/article';

import { ArticleEditForm } from '@/features/article/editArticle';

import { EditAccessGuard } from '@/widgets/EditAccessGuard';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const ArticleEditPage = () => {
	const { t } = useTranslation(i18Namespace.questions);
	const { articleId } = useParams<{ articleId: string }>();

	const { data: article, isLoading, isError, refetch } = useGetArticleByIdQuery({ articleId });

	const hasArticle = article && Object.keys(article).length > 0;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = hasArticle ? (
		<EditAccessGuard
			authorId={article.createdBy?.id}
			redirectTo={ROUTES.admin.articles.page}
			titleStub={t(Questions.STUB_EDIT_ACCESS_TITLE)}
			subtitleStub={t(Questions.STUB_EDIT_ACCESS_SUBTITLE)}
			buttonTextStub={t(Questions.STUB_EDIT_ACCESS_SUBMIT)}
		>
			<ArticleEditForm article={article} />
		</EditAccessGuard>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData
			stubs={stubs}
			roles={['admin', 'author']}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ArticleEditPage;
