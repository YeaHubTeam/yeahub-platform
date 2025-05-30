import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './EventCalendar.skeleton.module.css';

export const EventCalendarSkeleton = () => {
	return (
		<div className={'additional-info-wrapper'}>
			<CardSkeleton className={'calendar-block'}>
				<Flex direction="column">
					<Flex justify="between" className="react-calendar__navigation">
						<IconSkeleton size={24} className={styles['element-wrapper']} />
						<Skeleton
							width={124}
							height={24}
							borderRadius={4}
							className={styles['element-wrapper']}
						/>
						<IconSkeleton size={24} className={styles['element-wrapper']} />
					</Flex>
					<Flex justify="between">
						{[...Array(7)].map((_, i) => (
							<Flex key={i} justify="center" maxWidth>
								<Skeleton
									width={24}
									height={20}
									borderRadius={4}
									className={styles['element-wrapper']}
								/>
							</Flex>
						))}
					</Flex>
					<Flex direction="column">
						{[...Array(5)].map((_, index) => (
							<Flex key={index} justify="between">
								{[...Array(7)].map((_, i) => (
									<Skeleton
										key={i}
										width={32}
										height={24}
										borderRadius={4}
										className={styles['element-wrapper']}
									/>
								))}
							</Flex>
						))}
					</Flex>
				</Flex>
			</CardSkeleton>
		</div>
	);
};
