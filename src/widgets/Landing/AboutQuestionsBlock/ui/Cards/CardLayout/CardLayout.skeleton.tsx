import classNames from 'classnames';
import { ReactNode } from 'react';

import { Card } from '@/shared/ui/Card';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './CardLayout.module.css';

interface CardLayoutProps {
	contentSlot: ReactNode;
}
export const CardLayoutSkeleton = ({ contentSlot }: CardLayoutProps) => {
	return (
		<Card className={styles.card}>
			{contentSlot}
			<TextSkeleton width="100%" variant="head4" className={classNames(styles.title)} />
			<TextSkeleton width="100%" variant="body3" className={styles.description} />
		</Card>
	);
};
