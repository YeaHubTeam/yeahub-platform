import classNames from 'classnames';
import { ReactNode } from 'react';

import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import styles from './CardLayout.module.css';

interface CardLayoutProps {
	contentSlot: ReactNode;
	title: string;
	description: string;
}

export const CardLayout = ({ contentSlot, title, description }: CardLayoutProps) => {
	return (
		<Card className={styles.card}>
			{contentSlot}
			<Text variant={'head4'} className={classNames(styles.title)}>
				{title}
			</Text>
			<Text variant={'body3'} className={styles.description}>
				{description}
			</Text>
		</Card>
	);
};
