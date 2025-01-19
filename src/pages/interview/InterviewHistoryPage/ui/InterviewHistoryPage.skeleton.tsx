import { EventCalendarSkeleton } from '@/shared/ui/Calendar';
import { Flex } from '@/shared/ui/Flex';

import { FullPassedQuizzesListSkeleton } from '@/widgets/interview/PassedQuizzesList';

export const InterviewHistoryPageSkeleton = () => {
	return (
		<Flex gap="20">
			<FullPassedQuizzesListSkeleton />
			<EventCalendarSkeleton />
		</Flex>
	);
};
