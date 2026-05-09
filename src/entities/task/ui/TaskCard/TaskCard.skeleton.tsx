import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

export const TaskCardSkeleton = () => {
	const { isMobileS } = useScreenSize();
	return (
		<Card withOutsideShadow>
			<Flex direction="column" gap="20">
				<TextSkeleton
					variant={isMobileS ? 'body5-accent' : 'body6'}
					width={isMobileS ? 250 : 400}
				/>
				<Flex align="center" gap="10" wrap="wrap">
					<Skeleton width={60} height={32} />
					<Skeleton width={32} height={32} />
					<Skeleton width={120} height={32} />
					<Skeleton width={60} height={32} />
				</Flex>
			</Flex>
		</Card>
	);
};
