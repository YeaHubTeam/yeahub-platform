import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

export const EventCalendarSkeleton = () => {
	return (
		<div className={'additional-info-wrapper'}>
			<CardSkeleton className={'calendar-block'}>
				<Flex direction="column" gap="16">
					<Flex justify="between">
						<IconSkeleton size={24} />
						<TextSkeleton width={60} variant="body4" />
						<IconSkeleton size={24} />
					</Flex>
					<Flex justify="between">
						{[...Array(7)].map((_, i) => (
							<TextSkeleton key={i} variant="body2-accent" width={20} />
						))}
					</Flex>
					<Flex direction="column" gap="12">
						{[...Array(5)].map((_, index) => (
							<Flex key={index} justify="between">
								{[...Array(7)].map((_, i) => (
									<TextSkeleton key={i} variant="body2-accent" width={20} />
								))}
							</Flex>
						))}
					</Flex>
				</Flex>
			</CardSkeleton>
		</div>
	);
};
