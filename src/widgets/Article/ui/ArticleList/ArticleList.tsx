import { Flex } from '@/shared/ui/Flex';

import { ArticlePreview, PublicArticle } from '@/entities/article';

interface ArticlesListProps {
	articles: PublicArticle[];
}

export const ArticlesList = ({ articles }: ArticlesListProps) => {
	return (
		<Flex direction="column" gap="20">
			{articles.map((article) => (
				<ArticlePreview key={article.id} article={article} />
			))}
		</Flex>
	);
};
