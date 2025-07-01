import { ButtonSkeleton } from '@/shared/ui/Button';

import { FavoriteQuestionProps } from './FavoriteQuestionButton';

export const FavoriteQuestionButtonSkeleton = ({
	variant = 'tertiary',
	width,
}: Partial<FavoriteQuestionProps> & { width?: number }) => {
	return <ButtonSkeleton variant={variant} width={width} />;
};
