import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { QuestionAuthorProps } from './QuestionAuthor';

export const QuestionAuthorSkeleton = ({ isCenter }: Partial<QuestionAuthorProps>) => {
	return (
		<Flex justify={isCenter ? 'center' : 'start'} gap="4">
			<TextSkeleton variant="body2-accent" width={50} />
			<TextSkeleton variant="body2-accent" width={200} />
		</Flex>
	);
};
