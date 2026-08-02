import { CardSkeleton } from '@/shared/ui/Card';

import { InfoBlockHeaderSkeleton } from '../InfoBlockHeader/InfoBlockHeader.skeleton';
import { InfoBlockTextSkeleton } from '../InfoBlockText/InfoBlockText.skeleton';

import styles from './InfoBlock.module.css';

export const InfoBlockSkeleton = ({ isEdit }: { isEdit?: boolean }) => {
	return (
		<CardSkeleton className={styles.container}>
			<div className={styles['info']}>
				<InfoBlockHeaderSkeleton isEdit={isEdit} />
				<InfoBlockTextSkeleton />
			</div>
		</CardSkeleton>
	);
};
