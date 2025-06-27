import { ButtonSkeleton } from '@/shared/ui/Button';

import { FavoriteQuestionProps } from '@/features/quiz/favoriteQuestion/ui/FavoriteQuestionButton';

export const FavoriteQuestionButtonSkeleton = ({
	variant = 'tertiary',
	width,
}: Partial<FavoriteQuestionProps> & { width?: number }) => {
	return <ButtonSkeleton variant={variant} width={width} />;
};
