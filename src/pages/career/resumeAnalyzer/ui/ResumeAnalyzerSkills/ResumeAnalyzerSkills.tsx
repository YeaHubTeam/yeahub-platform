import { useTranslation } from 'react-i18next';

import { i18Namespace, Vacancies } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import styles from './ResumeAnalyzerSkills.module.css';
import { ResumeAnalyzerSkillsHeader } from './ResumeAnalyzerSkillsHeader/ResumeAnalyzerSkillsHeader';
import { ResumeAnalyzerSkillsList } from './ResumeAnalyzerSkillsList/ResumeAnalyzerSkillsList';

type Skill = {
	title: string;
	percent: number;
};
type Skills = {
	matchedSkills: Skill[];
	missingSkills: Skill[];
	totalMatched: number;
	totalSkills: number;
};
interface ResumeAnalysis {
	response: {
		skills: Skills;
	};
}

export const ResumeAnalyzerSkills = () => {
	const { t } = useTranslation(i18Namespace.vacancies);
	const data = localStorage.getItem('resume-analysis');
	const resumeAnalysis: ResumeAnalysis = data ? JSON.parse(data) : null;
	const skills = resumeAnalysis.response.skills;
	const totalMatched = skills.totalMatched;
	const totalSkills = skills.totalSkills;
	const missingCount = totalSkills - totalMatched;

	return (
		<div className={styles.container}>
			<Card>
				<Flex direction="column" gap="10">
					<ResumeAnalyzerSkillsHeader
						matchedCount={t(Vacancies.RESUME_ANALYSIS_SKILLS_MATCHED_COUNT, {
							totalMatched,
							totalSkills,
						})}
					/>
					<div className={styles['content-container']}>
						<ResumeAnalyzerSkillsList
							title={t(Vacancies.RESUME_ANALYSIS_SKILLS_IN_RESUME, { totalMatched })}
							skills={skills.matchedSkills}
						/>

						<ResumeAnalyzerSkillsList
							title={t(Vacancies.RESUME_ANALYSIS_SKILLS_MISSING, { missingCount })}
							skills={skills.missingSkills}
							color="red"
						/>
					</div>
				</Flex>
			</Card>
		</div>
	);
};
