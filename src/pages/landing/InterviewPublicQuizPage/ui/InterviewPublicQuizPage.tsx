import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { getJSONFromLS, removeFromLS, setToLS } from '@/shared/helpers/manageLocalStorage';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';

// eslint-disable-next-line import/order
import {
	InterviewSlider,
	QuestionNavPanel,
	useSlideSwitcher,
	LS_ACTIVE_MOCK_QUIZ_KEY,
	useLazyCreateNewMockQuizQuery,
} from '@/entities/quiz';

// eslint-disable-next-line @conarti/feature-sliced/public-api
import { LS_ACTIVE_MOCK_QUIZ_RESULT_KEY } from '@/entities/quiz/model/constants/quizConstants';
import {
	CreateNewMockQuizResponse,
	QuizQuestionAnswerType,
	// eslint-disable-next-line @conarti/feature-sliced/public-api
} from '@/entities/quiz/model/types/quiz';

import styles from './InterviewPublicQuizPage.module.css';
import { InterviewPublicQuizPageSkeleton } from './InterviewPublicQuizPage.skeleton';

const InterviewQuizPage = () => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);
	const [quizResult, setQuizResult] = useState<CreateNewMockQuizResponse | null>(null);

	const { t } = useTranslation(i18Namespace.interviewQuiz);

	const mockParams = getJSONFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);

	const [CreateMockQuiz, { isLoading: isLoadingQuiz }] = useLazyCreateNewMockQuizQuery();

	useEffect(() => {
		if (mockParams) {
			CreateMockQuiz({
				skills: mockParams.skills,
				complexity: mockParams.complexity,
				limit: mockParams.limit,
				specialization: mockParams.specialization,
			})
				.unwrap()
				.then((result) => {
					setQuizResult(result as unknown as CreateNewMockQuizResponse);
				});
		}
	}, []);

	const isAllQuestionsAnswered = quizResult?.response.answers.every(
		(question) => question.answer !== undefined && question.answer !== null,
	);

	const {
		questionId,
		questionTitle,
		imageSrc,
		//	shortAnswer,
		currentCount,
		activeQuestion,
		totalCount,
		answer,
		changeAnswer,
		goToNextSlide,
		goToPrevSlide,
	} = useSlideSwitcher(quizResult?.response.answers ?? []);

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

	const handleAnswerChange = (newAnswer: QuizQuestionAnswerType) => {
		if (!quizResult) return;

		const updatedAnswers = [...quizResult.response.answers];
		updatedAnswers[activeQuestion - 1] = {
			...updatedAnswers[activeQuestion - 1],
			answer: newAnswer,
		};

		setQuizResult({
			...quizResult,
			response: { ...quizResult.response, answers: updatedAnswers },
		});

		changeAnswer(newAnswer);
	};
	const onSubmitQuiz = () => {
		if (quizResult) {
			setToLS(LS_ACTIVE_MOCK_QUIZ_RESULT_KEY, quizResult.response.answers);
			removeFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
		}
	};

	const onInterruptQuiz = () => {
		if (quizResult) {
			const quizToSave = quizResult.response.answers.map((quest) => ({
				...quest,
				answer: quest.answer ?? 'UNKNOWN',
			}));

			setToLS(LS_ACTIVE_MOCK_QUIZ_RESULT_KEY, quizToSave);
			removeFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
		}
	};

	if (isLoadingQuiz) return <InterviewPublicQuizPageSkeleton />;
	return (
		<Flex direction="column" gap="20" className={styles.container}>
			<Card withOutsideShadow>
				<div className={styles['progress-bar']}>
					<p className={styles['progress-bar-title']}>{t(InterviewQuiz.TITLE)}</p>
					<span className={styles['progress-num']}>
						{activeQuestion}/{totalCount}
					</span>
					<ProgressBar
						className={styles['progress-component']}
						currentCount={currentCount}
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
						shortAnswer={'question'}
						answer={answer}
						changeAnswer={handleAnswerChange}
						isAnswerVisible={isAnswerVisible}
						setIsAnswerVisible={setIsAnswerVisible}
					/>
					<Flex direction="row">
						<Button onClick={isNextButton ? onRightSlide : onSubmitQuiz} disabled={isDisabled}>
							{isNextButton ? t(InterviewQuiz.NEXT) : t(InterviewQuiz.CHECK)}
						</Button>
						{isNextButton && (
							<Button className={styles['end-button']} onClick={onInterruptQuiz}>
								{t(InterviewQuiz.COMPLETE)}
							</Button>
						)}
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};

export default InterviewQuizPage;
