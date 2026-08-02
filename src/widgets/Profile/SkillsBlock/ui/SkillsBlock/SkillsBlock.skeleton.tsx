import { Card } from '@/shared/ui/Card';

import { SkillsBlockHeaderSkeleton } from '../SkillsBlockHeader/SkillsBlockHeader.skeleton';
import { SkillsBlockListSkeleton } from '../SkillsBlockList/SkillsBlockList.skeleton';

import styles from './SkillsBlock.module.css';

export const SkillsBlockSkeleton = ({ isEdit }: { isEdit?: boolean }) => {
	return (
		<Card className={styles['card-skeleton']}>
			<SkillsBlockHeaderSkeleton isEdit={isEdit} />
			<SkillsBlockListSkeleton />
		</Card>
	);
};
