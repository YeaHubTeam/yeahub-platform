import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { PageWrapper } from '@/widgets/PageWrapper';

import { useResumeAnalyzeMutation } from '../../api/resumeAnalyzeApi';
import { ResumeRecommendations } from '../ResumeRecommendations/ResumeRecommendations';
import { UploadResumeForm } from '../UploadResumeForm/UploadResumeForm';

const ResumeAnalyzerPage = () => {
	const [uploadResume, { data, isLoading, reset }] = useResumeAnalyzeMutation();

	const content = (
		<>
			<Flex direction="column" gap="30">
				<Flex gap="20" align="center" justify="between">
					{data ? (
						<Button variant="primary" onClick={reset}>
							Проверить ещё
						</Button>
					) : null}
				</Flex>
				{data ? (
					<ResumeRecommendations resumeInfo={data} />
				) : (
					<UploadResumeForm onSubmit={uploadResume} isLoading={isLoading} />
				)}
			</Flex>
		</>
	);

	return (
		<PageWrapper hasData stubs={{}} roles={['candidate-premium']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ResumeAnalyzerPage;
