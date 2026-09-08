import { Flex } from '@/shared/ui/Flex';

import { PageWrapper } from '@/widgets/PageWrapper';

import { useRestoreResumeAnalysis } from '../../model/hooks/useRestoreResumeAnalysis';
import { ResumeAnalyzerKeywordsCard } from '../ResumeAnalyzerKeywordsCard/ResumeAnalyzerKeywordsCard';
import { UploadResumeForm } from '../UploadResumeForm/UploadResumeForm';

const ResumeAnalyzerPage = () => {
	const data = useRestoreResumeAnalysis();

	const content = (
		<Flex direction="column" gap="30">
			{data ? <ResumeAnalyzerKeywordsCard keywords={data.keywords} /> : <UploadResumeForm />}
		</Flex>
	);

	return (
		<PageWrapper hasData stubs={{}} roles={['candidate-premium']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ResumeAnalyzerPage;
