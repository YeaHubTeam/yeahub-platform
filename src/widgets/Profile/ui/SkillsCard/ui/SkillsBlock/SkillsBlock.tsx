import { Block } from '@/shared/ui/Block';

import { Skill } from '@/entities/skill';

import { SkillsBlockHeader } from '../SkillsBlockHeader/SkillsBlockHeader';
import { SkillsBlockList } from '../SkillsBlockList/SkillsBlockList';

import styles from './SkillsBlock.module.css';

interface props {
	skillsList: Skill[];
}
export const SkillsBlock = ({ skillsList }: props) => {
	return (
		<Block>
			<div className={styles['skills']}>
				<SkillsBlockHeader />
				<div>Список навыков пуст</div>
				{!!skillsList && <SkillsBlockList skillsList={skillsList} />}
			</div>
		</Block>
	);
};
