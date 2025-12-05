import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewQuiz } from '@/shared/config';
import { useAppSelector, setToLS } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';

import { getHasPremiumAccess, getProfileId } from '@/entities/profile';
import {
	getActiveQuizQuestions,
	getIsAllQuestionsAnswered,
	getLastActiveQuizInfo,
	LS_ACTIVE_MOCK_QUIZ_KEY,
	QuestionNavPanel,
	useGetActiveQuizQuery,
	useSlideSwitcher,
} from '@/entities/quiz';

import { FinishQuizButton } from '@/features/quiz/finishQuiz';
import { InterruptQuizButton } from '@/features/quiz/interruptQuiz';

import { InterviewSlider } from '@/widgets/interview/InterviewSlider';

import styles from './InterviewQuizPage.module.css';

const InterviewQuizPage = () => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const { t } = useTranslation(i18Namespace.interviewQuiz);

	const lastActiveQuizInfo = useAppSelector(getLastActiveQuizInfo);
	const initialSlideIndex = useMemo(() => {
		return lastActiveQuizInfo && lastActiveQuizInfo.question
			? lastActiveQuizInfo.fromQuestionNumber - 1
			: 0;
	}, [lastActiveQuizInfo]);

	const profileId = useAppSelector(getProfileId);
	const { data: activeQuiz } = useGetActiveQuizQuery(
		{
			profileId,
			page: 1,
			limit: 1,
		},
		{ skip: !hasPremium },
	);

	const activeQuizQuestions = useAppSelector(getActiveQuizQuestions);
	const isAllQuestionsAnswered = useAppSelector(getIsAllQuestionsAnswered);

	useEffect(() => {
		if (!hasPremium) {
			setToLS(LS_ACTIVE_MOCK_QUIZ_KEY, { [profileId]: activeQuizQuestions });
		}
	}, []);

	const favorites = activeQuiz?.questions?.reduce(
		(result, question) => {
			if (question.isFavorite) {
				result[question.id] = question.isFavorite;
			}
			return result;
		},
		{} as Record<number, boolean>,
	);

	const updatedQuiz = favorites
		? activeQuizQuestions.map((question) => ({
				...question,
				isFavorite: favorites[question.questionId] || false,
			}))
		: undefined;

	const {
		questionId,
		questionTitle,
		imageSrc,
		shortAnswer,
		answeredCount,
		activeQuestion,
		totalCount,
		answer,
		isFavorite,
		changeAnswer,
		goToNextSlide,
		goToPrevSlide,
	} = useSlideSwitcher(updatedQuiz ?? activeQuizQuestions ?? [], initialSlideIndex);

	const onPrevSlide = () => {
		setIsAnswerVisible(false);
		goToPrevSlide();
	};

	const onRightSlide = () => {
		setIsAnswerVisible(false);
		goToNextSlide();
	};

	const isLastQuestion = activeQuestion === totalCount;
	const isNextButton = !isLastQuestion && !isAllQuestionsAnswered;
	const isDisabled = (isLastQuestion && !isAllQuestionsAnswered) || (!isLastQuestion && !answer);

	return (
		<>
			<Flex direction="column" gap="20" className={styles.container}>
				<Card withOutsideShadow>
					<div className={styles['progress-bar']}>
						<p className={styles['progress-bar-title']}>{t(InterviewQuiz.TITLE)}</p>
						<span className={styles['progress-num']}>
							{activeQuestion}/{totalCount}
						</span>
						<ProgressBar
							className={styles['progress-component']}
							currentCount={answeredCount}
							totalCount={totalCount}
						/>
					</div>
				</Card>
				<Card withOutsideShadow>
					<Flex direction="column" gap="20" className={styles.question}>
						<QuestionNavPanel
							goToNextSlide={onRightSlide}
							goToPrevSlide={onPrevSlide}
							answer={answer}
							changeAnswer={changeAnswer}
							questionNumber={activeQuestion}
							totalCount={totalCount}
						/>
						<InterviewSlider
							id={questionId}
							title={questionTitle}
							imageSrc={imageSrc}
							shortAnswer={shortAnswer}
							answer={answer}
							changeAnswer={changeAnswer}
							isAnswerVisible={isAnswerVisible}
							setIsAnswerVisible={setIsAnswerVisible}
							isFavorite={isFavorite}
						/>
						<Flex direction="row" justify="between">
							{isNextButton ? (
								<>
									<Button onClick={onRightSlide} disabled={isDisabled}>
										{t(InterviewQuiz.NEXT)}
									</Button>
									<InterruptQuizButton
										activeQuiz={activeQuiz}
										activeQuizQuestions={activeQuizQuestions}
									/>
								</>
							) : (
								<FinishQuizButton
									activeQuiz={activeQuiz}
									activeQuizQuestions={activeQuizQuestions}
									isDisabled={isDisabled}
								/>
							)}
						</Flex>
					</Flex>
				</Card>
			</Flex>
		</>
	);
};

export default InterviewQuizPage;
