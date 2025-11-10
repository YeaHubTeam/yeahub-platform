import { useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize, useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { getGuruWithMatchingSpecialization, GurusBanner } from '@/entities/guru';
import { getChannelsForSpecialization } from '@/entities/media';
import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { useGetQuestionsFilterParams } from '@/features/question/filterQuestions';
import {
	useQuestionNavigation,
	useQuestionQueryNavigate,
} from '@/features/question/navigateQuestion';

import { ProgressBlock } from '@/widgets/question/ProgressBlock';
import { QuestionActions } from '@/widgets/question/QuestionActions';
import { QuestionAdditionalInfo } from '@/widgets/question/QuestionAdditionalInfo';
import { QuestionBody } from '@/widgets/question/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader';

import styles from './QuestionPage.module.css';
import { QuestionPageSkeleton } from './QuestionPage.skeleton';

export const QuestionPage = () => {
	const filter = useGetQuestionsFilterParams({ page: 1, status: 'all' });
	const { isMobile, isTablet } = useScreenSize();
	const { questionId = '' } = useParams<{ questionId: string }>();

	const profileId = useAppSelector(getProfileId);
	const { data: question, isLoading } = useGetQuestionByIdQuery({
		questionId,
		profileId,
	});

	const { handleNavigation } = useQuestionQueryNavigate();

	const { prevId, prevPage, nextId, nextPage, isDisabled } = useQuestionNavigation({
		questionId,
		filter,
	});

	if (isLoading) {
		return <QuestionPageSkeleton />;
	}

	if (!question) {
		return null;
	}

	const guru = getGuruWithMatchingSpecialization(question.questionSpecializations);
	const showAuthor = guru ? false : true;

	const media = getChannelsForSpecialization(question.questionSpecializations);

	const onMovePrev = () => {
		handleNavigation(prevId, prevPage);
	};

	const onMoveNext = () => {
		handleNavigation(nextId, nextPage);
	};

	const {
		createdBy,
		checksCount,
		rate,
		keywords,
		complexity,
		questionSkills,
		shortAnswer,
		longAnswer,
		isFavorite,
	} = question;

	return (
		<Flex gap="20">
			<Flex gap="20" direction="column" flex={1} maxWidth>
				<QuestionHeader question={question} />
				<QuestionActions
					questionId={questionId}
					checksCount={checksCount}
					isFavorite={isFavorite}
					onMovePrev={onMovePrev}
					onMoveNext={onMoveNext}
					isDisabled={isDisabled}
				/>
				<QuestionBody shortAnswer={shortAnswer} longAnswer={longAnswer} />
				{(isMobile || isTablet) && guru && <GurusBanner gurus={[guru]} />}
			</Flex>
			{!isMobile && !isTablet && (
				<Flex direction="column" gap="20" className={styles.additional}>
					<ProgressBlock checksCount={checksCount} />
					<QuestionAdditionalInfo
						showAuthor={showAuthor}
						rate={rate}
						createdBy={createdBy}
						keywords={keywords}
						complexity={complexity}
						questionSkills={questionSkills}
						route={ROUTES.interview.questions.page}
						media={media}
					/>
					{guru && <GurusBanner gurus={[guru]} />}
				</Flex>
			)}
		</Flex>
	);
};

export default QuestionPage;
