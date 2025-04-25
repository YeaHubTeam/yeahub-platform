import classNames from 'classnames';
import { ReactNode } from 'react';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './CardLayout.module.css';

interface CardLayoutProps {
	firstRow: ReactNode;
	secondRow: ReactNode;
	thirdRow: ReactNode;
	hasOffset?: boolean;
	title: string;
	description: string;
	gap?: string;
}

export const CardLayout = ({
	firstRow,
	secondRow,
	thirdRow,
	title,
	description,
	hasOffset = false,
	gap = '',
}: CardLayoutProps) => {
	const specialtiesClasses = classNames({ [styles.offset]: hasOffset }, gap);

	return (
		<Card className={styles.card}>
			<Flex direction={'column'} gap={'16'} className={specialtiesClasses}>
				<Flex gap={'16'}>{firstRow}</Flex>
				<Flex gap={'16'}>{secondRow}</Flex>
				<Flex gap={'16'}>{thirdRow}</Flex>
			</Flex>
			<Text variant={'head4'} className={styles.title}>
				{title}
			</Text>
			<Text variant={'body3'} className={styles.description}>
				{description}
			</Text>
		</Card>
	);
};
