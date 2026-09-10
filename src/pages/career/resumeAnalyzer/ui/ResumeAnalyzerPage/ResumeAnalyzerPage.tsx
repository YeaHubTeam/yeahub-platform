import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { setToLS } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { PageWrapper } from '@/widgets/PageWrapper';

import { useResumeAnalyzeMutation } from '../../api/resumeAnalyzeApi';
import { ResumeRecommendations } from '../ResumeRecommendations/ResumeRecommendations';
import { UploadResumeForm } from '../UploadResumeForm/UploadResumeForm';

const ResumeAnalyzerPage = () => {
	const [uploadResume, { data, isLoading, reset }] = useResumeAnalyzeMutation();
	const { t } = useTranslation(i18Namespace.translation);
	const handleUploadResume = async (data: { specializationId: number; file: FormData }) => {
		try {
			const response = await uploadResume(data).unwrap();
			setToLS('resume-analysis', { response, analyzedAt: new Date().toISOString() });
		} catch {
			toast.error(t(Translation.FILE_UPLOADED_RESUME_ANALYSIS_FAILED));
		}
	};

	const content = (
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
				<UploadResumeForm onSubmit={handleUploadResume} isLoading={isLoading} />
			)}
		</Flex>
	);

	return (
		<PageWrapper hasData stubs={{}} roles={['candidate-premium']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ResumeAnalyzerPage;
