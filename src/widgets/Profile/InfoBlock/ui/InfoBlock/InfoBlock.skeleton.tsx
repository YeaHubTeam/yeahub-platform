import { Card } from '@/shared/ui/Card';

import { InfoBlockHeaderSkeleton } from '../InfoBlockHeader/InfoBlockHeader.skeleton';
import { InfoBlockTextSkeleton } from '../InfoBlockText/InfoBlockText.skeleton';

import styles from './InfoBlock.module.css';

export const InfoBlockSkeleton = () => {
	return (
		<Card className={styles['card-skeleton']}>
			<InfoBlockHeaderSkeleton />
			<InfoBlockTextSkeleton />
		</Card>
	);
};
