import { EventCalendarSkeleton } from '@/shared/ui/Calendar';
import { Flex } from '@/shared/ui/Flex';

import { FullPassedTestsListSkeleton } from '@/widgets/test/PassedTestsList';

export const TestHistoryPageSkeleton = () => {
	return (
		<Flex gap="20" maxWidth>
			<FullPassedTestsListSkeleton />
			<EventCalendarSkeleton />
		</Flex>
	);
};
