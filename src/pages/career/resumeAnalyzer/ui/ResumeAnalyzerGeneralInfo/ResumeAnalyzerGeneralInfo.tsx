import type { ResumeAnalysis } from '@/entities/vacancy';

import { useGetUploadedFileDate } from '../../model/hooks/useGetUploadedFileDate';

import { AnalysisInfo } from './AnalysisInfo/AnalysisInfo';
import { MetricCards } from './MetricCards/MetricCards';
import { OverallVacancyCoverage } from './OverallVacancyCoverage/OverallVacancyCoverage';

interface ResumeAnalyzerGeneralInfoProps {
	data: ResumeAnalysis;
	fileName?: string;
	analyzedAt?: string;
}

export const ResumeAnalyzerGeneralInfo = ({
	data,
	fileName,
	analyzedAt,
}: ResumeAnalyzerGeneralInfoProps) => {
	const formattedDate = useGetUploadedFileDate(analyzedAt ?? null);

	return (
		<>
			<AnalysisInfo
				fileName={fileName ?? ''}
				analyzedAt={formattedDate ?? ''}
				analyzedVacancyCount={data.analyzedVacancyCount}
			/>
			<MetricCards
				skills={data.skills}
				tasks={data.tasks}
				keywords={data.keywords}
				priority={data.profile.profileQualityScore}
			/>
			<OverallVacancyCoverage percent={data.overall.score} />
		</>
	);
};
