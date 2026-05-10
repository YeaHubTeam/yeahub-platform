import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { PageWrapper } from '@/widgets/PageWrapper';

import { useResumeAnalyzeMutation } from '../../api/resumeAnalyzeApi';
import { ResumeRecommendations } from '../ResumeRecommendations/ResumeRecommendations';
import { UploadResumeForm } from '../UploadResumeForm/UploadResumeForm';

const ResumeAnalyzerPage = () => {
	const [uploadResume, { data, isLoading, reset }] = useResumeAnalyzeMutation();

	const content = (
		<Card withOutsideShadow>
			<Flex direction="column" gap="30">
				<Flex gap="20" align="center" justify="between">
					<Text variant="head3" isMainTitle>
						Рекомендации по резюме
					</Text>
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
		</Card>
	);

	return (
		<PageWrapper hasData stubs={{}} roles={['candidate-premium']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ResumeAnalyzerPage;
