import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { getJSONFromLS, removeFromLS, setToLS } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { PageWrapper } from '@/widgets/PageWrapper';

import { useResumeAnalyzeMutation } from '../../api/resumeAnalyzeApi';
import { ResumeAnalyzerGeneralInfo } from '../ResumeAnalyzerGeneralInfo/ResumeAnalyzerGeneralInfo';
import { UploadResumeForm } from '../UploadResumeForm/UploadResumeForm';

import styles from './ResumeAnalyzerPage.module.css';

const ResumeAnalyzerPage = () => {
	const [uploadResume, { data, isLoading, reset }] = useResumeAnalyzeMutation();
	const { t } = useTranslation(i18Namespace.translation);
	const [isReset, setIsReset] = useState(false);

	const handleUploadResume = async (data: {
		specializationId: number;
		file: FormData;
		fileName: string;
	}) => {
		try {
			const response = await uploadResume({
				specializationId: data.specializationId,
				file: data.file,
			}).unwrap();
			setToLS('resume-analysis', {
				response,
				analyzedAt: new Date().toISOString(),
				fileName: data.fileName,
			});
			setIsReset(false);
		} catch {
			toast.error(t(Translation.FILE_UPLOADED_RESUME_ANALYSIS_FAILED));
		}
	};

	const handleReset = () => {
		reset();
		removeFromLS('resume-analysis');
		setIsReset(true);
	};

	const savedAnalysis = isReset ? null : getJSONFromLS('resume-analysis');
	const resumeData = data ?? savedAnalysis?.response;
	const fileName = savedAnalysis?.fileName;
	const analyzedAt = savedAnalysis?.analyzedAt;

	const content = (
		<Flex direction="column" className={styles.content}>
			<Flex gap="20" align="center" justify="between">
				{resumeData ? (
					<Button variant="primary" onClick={handleReset}>
						Проверить ещё
					</Button>
				) : null}
			</Flex>
			{resumeData ? (
				<ResumeAnalyzerGeneralInfo data={resumeData} fileName={fileName} analyzedAt={analyzedAt} />
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
