import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
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
				<TextSkeleton
					variant={isMobileS ? 'body5-accent' : 'body6'}
					width={isMobileS ? 150 : 250}
				/>
			</Flex>
		</Card>
	);
};
