import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Vacancies } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ShowToggleButton } from '@/shared/ui/ShowToggleButton';
import { StatusChip } from '@/shared/ui/StatusChip';

import { ResumeRecommendationsCardHeader } from './ResumeRecommendationsCardHeader/ResumeRecommendationsCardHeader';
import { ResumeRecommendationsCardList } from './ResumeRecommendationsCardList/ResumeRecommendationsCardList';
interface ResumeRecommendationsCardProps {
	resumeAnalysis: string;
}

export const ResumeRecommendationsCard = ({ resumeAnalysis }: ResumeRecommendationsCardProps) => {
	const response = JSON.parse(resumeAnalysis).response;
	console.log(response);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const { t } = useTranslation(i18Namespace.vacancies);
	return (
		<Card>
			<Flex direction="column" align="start" gap="20">
				<ResumeRecommendationsCardHeader
					title={t(Vacancies.RESUME_ANALYZER_PRIORITIES_TITLE)}
					coverageText={t(Vacancies.RESUME_ANALYZER_PRIORITIES_COVERAGE_PERCENT, {
						percent: Math.round(response.profile.extraMatchPercent),
					})}
				/>
				<StatusChip
					size="medium"
					status={{
						variant: 'purple',
						text: t(Vacancies.RESUME_ANALYZER_PRIORITIES_COVERAGE, {
							covered: response.profile.coveredExtraCount,
							total: response.profile.totalExtraCount,
						}),
					}}
				/>
				{response.profile.matchedExtraSignals.length > 0 && (
					<ResumeRecommendationsCardList
						title={t(Vacancies.RESUME_ANALYZER_PRIORITIES_MATCHED)}
						variant="matched"
						signals={response.profile.matchedExtraSignals}
						isExpanded={isExpanded}
					/>
				)}
				{response.profile.missingExtraSignals.length > 0 && (
					<ResumeRecommendationsCardList
						title={t(Vacancies.RESUME_ANALYZER_PRIORITIES_MISSING)}
						variant="missing"
						signals={response.profile.missingExtraSignals}
						isExpanded={isExpanded}
					/>
				)}
				{response.profile.weaklySupportedSignals.length > 0 && (
					<ResumeRecommendationsCardList
						title={t(Vacancies.RESUME_ANALYZER_PRIORITIES_WEAKLY)}
						variant="weakly"
						signals={response.profile.weaklySupportedSignals}
						isExpanded={isExpanded}
					/>
				)}
				<ShowToggleButton onToggle={() => setIsExpanded((prev) => !prev)} isExpanded={isExpanded} />
			</Flex>
		</Card>
	);
};
