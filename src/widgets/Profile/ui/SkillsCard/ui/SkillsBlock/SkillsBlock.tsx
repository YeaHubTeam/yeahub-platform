import { Card } from '@/shared/ui/Card';

import { Skill } from '@/entities/skill';

import { SkillsBlockHeader } from '../SkillsBlockHeader/SkillsBlockHeader';
import { SkillsBlockList } from '../SkillsBlockList/SkillsBlockList';

import styles from './SkillsBlock.module.css';

interface SkillsBlockProps {
	skillsList: Skill[];
}
export const SkillsBlock = ({ skillsList }: SkillsBlockProps) => {
	return (
		<Card>
			<div className={styles['skills']}>
				<SkillsBlockHeader />
				{skillsList.length ? (
					<SkillsBlockList skillsList={skillsList} />
				) : (
					<div>Список навыков пуст</div>
				)}
			</div>
		</Card>
	);
};
