import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';

import { SpecializationsProgress } from '@/entities/specialization';

import {
	AnalyticPageTemplateMobileList,
	AnalyticPageTemplateMobileListItem,
} from '@/widgets/analytics/AnalyticPageTemplate';

interface ProgressSpecializationsPageTableProps {
	specializationsProgress: SpecializationsProgress[];
}

export const ProgressSpecializationsList = ({
	specializationsProgress,
}: ProgressSpecializationsPageTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const specializationsProgressFields: AnalyticPageTemplateMobileListItem[] =
		specializationsProgress.map((stat) => {
			return {
				title: stat.specialization.title,
				fields: [
					{
						label: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_SKILLS),
						value: stat.skillCount,
					},
					{
						label: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_QUESTIONS),
						value: stat.questionCount,
					},
					{
						label: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_PROGRESS),
						value: `${stat.averageProgress}%`,
					},
				],
			};
		});

	return <AnalyticPageTemplateMobileList items={specializationsProgressFields} />;
};
