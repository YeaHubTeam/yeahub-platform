import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { useScreenSize } from '@/shared/libs';

import { Card } from '../Card';
import { Flex } from '../Flex';
import { ImageWithWrapper } from '../ImageWithWrapper';
import { Text } from '../Text';

import styles from './PreviewListItem.module.css';

interface PreviewListItemProps {
	title: string;
	to: string;
	imageSrc?: string;
	Grade?: ReactNode;
}

export const PreviewListItem = ({ title, to, imageSrc, Grade }: PreviewListItemProps) => {
	const { isMobileS } = useScreenSize();

	return (
		<li>
			<Card withOutsideShadow size="small">
				<Link to={to} className={styles.link}>
					{!isMobileS && imageSrc && <ImageWithWrapper src={imageSrc} className={styles.image} />}
					<Flex direction="column" gap="8">
						<Text variant="body3-accent" maxRows={1} className={styles.title}>
							{title}
						</Text>
						{Grade}
					</Flex>
				</Link>
			</Card>
		</li>
	);
};
