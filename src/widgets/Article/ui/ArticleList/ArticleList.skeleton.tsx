import { Flex } from '@/shared/ui/Flex';

import { ArticlePreviewSkeleton } from '@/entities/article';

export const ArticlesListSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			{Array.from({ length: 6 }, (_, index) => (
				<ArticlePreviewSkeleton key={index} />
			))}
		</Flex>
	);
};
