import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { PageWrapper } from '@/widgets/PageWrapper';

import { useResumeAnalyzeMutation } from '../../api/resumeAnalyzeApi';
import { ResumeRecommendations } from '../ResumeRecommendations/ResumeRecommendations';
import { UploadResumeForm } from '../UploadResumeForm/UploadResumeForm';

const ResumeAnalyzerPage = () => {
	const [uploadResume, { data, isLoading, isError, reset }] = useResumeAnalyzeMutation();

	const handleSubmit = async (formData: { specializationId: number; file: FormData }) => {
		try {
			await uploadResume(formData).unwrap();
		} catch (error) {
			console.error('Ошибка анализа:', error);
		}
	};

	const handleComplete = () => {
		// Анализ завершен, данные уже в data
	};

	const handleReset = () => {
		reset();
	};

	const content = (
		<Card withOutsideShadow>
			<Flex direction="column" gap="30">
				<Flex gap="20" align="center" justify="between">
					<Text variant="head3" isMainTitle>
						Рекомендации по резюме
					</Text>
					{data ? (
						<Button variant="primary" onClick={handleReset}>
							Проверить ещё
						</Button>
					) : null}
				</Flex>
				{data ? (
					<ResumeRecommendations resumeInfo={data} />
				) : (
					<UploadResumeForm
						onSubmit={handleSubmit}
						isLoading={isLoading}
						isError={isError}
						resetError={reset}
						onComplete={handleComplete}
					/>
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
