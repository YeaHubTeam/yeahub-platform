import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const VacancyCardSalarySkeleton = () => {
	return (
		<Flex maxWidth justify="end">
			<TextSkeleton variant="body6" width={200} />
		</Flex>
	);
};
