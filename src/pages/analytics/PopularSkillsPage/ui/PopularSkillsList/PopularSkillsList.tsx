import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';

import { PopularSkill } from '@/entities/skill';

import {
	AnalyticPageTemplateMobileList,
	AnalyticPageTemplateMobileListItem,
} from '@/widgets/analytics/AnalyticPageTemplate';

interface PopularSkillsListProps {
	skills: PopularSkill[];
}

export const PopularSkillsList = ({ skills }: PopularSkillsListProps) => {
	const { t } = useTranslation([i18Namespace.analytics]);

	const skillsFields: AnalyticPageTemplateMobileListItem[] = skills.map((skill) => {
		return {
			title: skill.skill.title,
			fields: [
				{
					label: t(Analytics.POPULAR_SKILLS_TABLE_POPULARITY),
					value: `${skill.frequencyStat}%`,
				},
			],
		};
	});

	return <AnalyticPageTemplateMobileList items={skillsFields} />;
};
