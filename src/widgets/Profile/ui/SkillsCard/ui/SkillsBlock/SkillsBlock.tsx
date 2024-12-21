import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';

import { Skill } from '@/entities/skill';

import { SkillsBlockHeader } from '../SkillsBlockHeader/SkillsBlockHeader';
import { SkillsBlockList } from '../SkillsBlockList/SkillsBlockList';

import styles from './SkillsBlock.module.css';

interface SkillsBlockProps {
	skillsList: Skill[];
}
export const SkillsBlock = ({ skillsList }: SkillsBlockProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Card>
			<div className={styles['skills']}>
				<SkillsBlockHeader />
				{skillsList.length ? (
					<SkillsBlockList skillsList={skillsList} />
				) : (
					<div>{t(Profile.SKILLS_EMPTY)}</div>
				)}
			</div>
		</Card>
	);
};
