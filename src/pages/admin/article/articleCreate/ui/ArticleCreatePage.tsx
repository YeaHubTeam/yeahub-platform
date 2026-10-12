import { ArticleCreateForm } from '@/features/article/createArticle';

import { PageWrapper } from '@/widgets/PageWrapper';

const ArticleCreatePage = () => {
	const content = <ArticleCreateForm />;
	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ArticleCreatePage;
