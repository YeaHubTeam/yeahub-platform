import { useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { ProgressBlock } from '@/widgets/question/ProgressBlock';
import { QuestionActions } from '@/widgets/question/QuestionActions';
import { QuestionAdditionalInfo } from '@/widgets/question/QuestionAdditionalInfo';
import { QuestionBody } from '@/widgets/question/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader';

import styles from './QuestionPage.module.css';
import { QuestionPageSkeleton } from './QuestionPage.skeleton';

export const QuestionPage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const { questionId = '' } = useParams<{ questionId: string }>();

	const profileId = useAppSelector(getProfileId);
	const {
		data: question,
		isFetching,
		isLoading,
	} = useGetQuestionByIdQuery({
		questionId,
		profileId,
	});

	if (isLoading || isFetching) {
		return <QuestionPageSkeleton />;
	}

	if (!question) {
		return null;
	}

	const {
		createdBy,
		checksCount,
		rate,
		keywords,
		complexity,
		questionSkills,
		shortAnswer,
		longAnswer,
	} = question;

	return (
		<Flex gap="20">
			<Flex gap="20" direction="column" flex={1}>
				<QuestionHeader question={question} />
				<QuestionActions questionId={questionId} checksCount={checksCount} />
				<QuestionBody shortAnswer={shortAnswer} longAnswer={longAnswer} />
			</Flex>
			{!isMobile && !isTablet && (
				<Flex direction="column" gap="20" className={styles.additional}>
					<ProgressBlock checksCount={checksCount} />
					<QuestionAdditionalInfo
						rate={rate}
						createdBy={createdBy}
						keywords={keywords}
						complexity={complexity}
						questionSkills={questionSkills}
						route={ROUTES.interview.questions.page}
					/>
				</Flex>
			)}
		</Flex>
	);
};

export default QuestionPage;
