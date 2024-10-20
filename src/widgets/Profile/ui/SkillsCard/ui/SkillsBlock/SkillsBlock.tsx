import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import { Skill } from '@/entities/skill';

import { SkillsBlockHeader } from '../SkillsBlockHeader/SkillsBlockHeader';
import { SkillsBlockList } from '../SkillsBlockList/SkillsBlockList';

import styles from './SkillsBlock.module.css';

interface SkillsBlockProps {
	skillsList: Skill[];
}
export const SkillsBlock = ({ skillsList }: SkillsBlockProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<Card>
			<div className={styles['skills']}>
				<SkillsBlockHeader />
				{skillsList.length ? (
					<SkillsBlockList skillsList={skillsList} />
				) : (
					<div>{t(Profile.PROFILEPAGE_SKILLS_NOSKILLS)}</div>
				)}
			</div>
		</Card>
	);
};
