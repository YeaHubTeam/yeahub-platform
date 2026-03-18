import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const TasksListSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Flex direction="column" gap="20">
			{[...Array(4)].map((_, index) => (
				<>
					{!isMobileS && <Skeleton key={index} width={70} height={50} />}
					{isMobileS && <Skeleton key={index} width={200} height={21} />}
				</>
			))}
		</Flex>
	);
};
