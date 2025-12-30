// import React from 'react';

// import { useScreenSize } from '@/shared/libs';
// import { Card } from '@/shared/ui/Card';
// import { Flex } from '@/shared/ui/Flex';
// import { Text } from '@/shared/ui/Text';

// import { Topic } from '@/entities/topic';

// import { TopicAdditionalInfoDrawer } from '../TopicAdditionalInfoDrawer/TopicAdditionalInfoDrawer';

// import styles from './TopicHeader.module.css';

// interface TopicHeaderProps {
// 	topic: Topic;
// }

// export const TopicHeader = ({ topic }: TopicHeaderProps) => {
// 	const { isMobile, isTablet } = useScreenSize();
// 	const { title } = topic;

// 	return (
// 		<Card withOutsideShadow className={styles.header}>
// 			<Flex gap="10" direction={isMobile ? 'column' : 'row'}>
// 				<Flex direction="column" gap="8" maxWidth>
// 					<Flex justify="between" align="start" gap="8" maxWidth>
// 						<Text
// 							variant={isMobile ? 'body5' : 'body6'}
// 							color="black-800"
// 							isMainTitle
// 							className={styles.title}
// 						>
// 							{title}
// 						</Text>
// 						{(isMobile || isTablet) && <TopicAdditionalInfoDrawer topic={topic} />}
// 					</Flex>
// 				</Flex>
// 			</Flex>
// 		</Card>
// 	);
// };
