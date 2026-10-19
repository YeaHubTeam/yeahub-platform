import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getIsEmptySpecialization, getSpecializationId } from '@/entities/profile';
import { useGetTestQuestionsListQuery } from '@/entities/testQuestion';

import { PreviewTestQuestionsList } from '@/widgets/testing/TestQuestionsList';

import styles from './TestingPage.module.css';
import { TestingPageSkeleton } from './TestingPage.skeleton';

const TestingPage = () => {
	const specializationId = useAppSelector(getSpecializationId);
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);

	const { isLoading: isTestQuestionsListLoading } = useGetTestQuestionsListQuery({
		random: true,
		limit: 3,
		specializationId,
	});

	if (isTestQuestionsListLoading) {
		return <TestingPageSkeleton />;
	}

	return (
		<>
			{!isSpecializationEmpty && (
				<Flex direction="column" gap="20" className={styles.list}>
					<PreviewTestQuestionsList />
				</Flex>
			)}
		</>
	);
};

export default TestingPage;
