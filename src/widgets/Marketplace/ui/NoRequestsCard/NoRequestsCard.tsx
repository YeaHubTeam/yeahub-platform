import { ReactNode } from 'react';

import SearchIcon from '@/shared/assets/images/searchPage.png';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './NoRequestsCard.module.css';

interface NoRequestsCardProps {
	text: string;
	children?: ReactNode;
}

export const NoRequestsCard = ({ text, children }: NoRequestsCardProps) => {
	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex justify="between" align="center" gap="20" direction="column" className={styles.flex}>
				<img src={SearchIcon} alt="" className={styles['card-img']}></img>
				<Text variant="body4" className={styles.text}>
					{text}
				</Text>
				{children}
			</Flex>
		</Card>
	);
};
