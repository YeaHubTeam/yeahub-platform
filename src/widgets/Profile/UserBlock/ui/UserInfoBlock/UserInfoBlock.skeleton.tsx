import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const UserInfoBlockSkeleton = () => {
	return (
		<Flex direction="column" gap="12">
			<Flex align="center" gap="8">
				<Skeleton width={271} height={27} />
				<Skeleton width={73} height={20} borderRadius={20} style={{ alignSelf: 'self-start' }} />
			</Flex>
			<Flex direction="column" gap="8" style={{ marginBottom: '30px' }}>
				{[...Array(4)].map((_, index) => (
					<span key={index}>
						<Skeleton width={190} height={14} />
					</span>
				))}
			</Flex>
			<Flex direction="column" gap="8">
				{[...Array(2)].map((_, index) => (
					<span key={index}>
						<Skeleton width={190} height={14} />
					</span>
				))}
			</Flex>
			<Flex gap="4">
				{[...Array(6)].map((_, index) => (
					<span key={index}>
						<Skeleton height={24} width={24} borderRadius={50} />
					</span>
				))}
			</Flex>
		</Flex>
	);
};
