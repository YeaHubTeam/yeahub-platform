import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { PageWrapper } from '@/widgets/PageWrapper';

import { getResumeAnalysis } from '../../model/selectors/resumeAnalyzerPageSelectors';
import { UploadResumeForm } from '../UploadResumeForm/UploadResumeForm';

const ResumeAnalyzerPage = () => {
	const data = useAppSelector(getResumeAnalysis);

	const content = (
		<Flex direction="column" gap="30">
			<Flex gap="20" align="center" justify="between">
				{data ? <>{/*<ResumeRecommendations resumeInfo={data} />*/}</> : <UploadResumeForm />}
			</Flex>
		</Flex>
	);

	return (
		<PageWrapper hasData stubs={{}} roles={['candidate-premium']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ResumeAnalyzerPage;
