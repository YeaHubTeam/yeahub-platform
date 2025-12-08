import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { Card } from '@/shared/ui/Card';

import { Skill } from '@/entities/skill';

import { SkillsBlockHeader } from '../SkillsBlockHeader/SkillsBlockHeader';
import { SkillsBlockList } from '../SkillsBlockList/SkillsBlockList';

import styles from './SkillsBlock.module.css';

interface SkillsBlockProps {
	skillsList: Skill[] | undefined;
}
export const SkillsBlock = ({ skillsList }: SkillsBlockProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Card withOutsideShadow>
			<div className={styles['skills']}>
				<SkillsBlockHeader />
				{skillsList?.length ? (
					<SkillsBlockList skillsList={skillsList} />
				) : (
					<div>{t(Profile.SKILLS_EMPTY)}</div>
				)}
			</div>
		</Card>
	);
};
