import { Block } from '@/shared/ui/Block';

import { SkillsBlockHeader } from '../SkillsBlockHeader/SkillsBlockHeader';
import { SkillsBlockList } from '../SkillsBlockList/SkillsBlockList';

import styles from './SkillsBlock.module.css';

export const SkillsBlock = () => {
	return (
		<Block>
			<div className={styles['skills']}>
				<SkillsBlockHeader />
				<SkillsBlockList />
			</div>
		</Block>
	);
};
