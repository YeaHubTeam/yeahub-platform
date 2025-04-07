import { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/order
import {
	InterviewSlider,
	QuestionNavPanel,
	useSlideSwitcher,
	LS_ACTIVE_MOCK_QUIZ_KEY,
} from '@/entities/quiz';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { getJSONFromLS, removeFromLS, setToLS } from '@/shared/helpers/manageLocalStorage';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';

import {
	Answers,
	QuizQuestionAnswerType,
	// eslint-disable-next-line @conarti/feature-sliced/public-api
} from '@/entities/quiz/model/types/quiz';

import styles from './PublicQuizPage.module.css';

const PublicQuizPage = () => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);
	const { t } = useTranslation(i18Namespace.interviewQuiz);
	const navigate = useNavigate();
	const activeMockQuiz = getJSONFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
	const isAllQuestionsAnswered = activeMockQuiz?.response.answers.every(
		(question: Answers) => question.answer !== undefined && question.answer !== null,
	);

	useEffect(() => {
		if (!activeMockQuiz) {
			navigate('/');
		}
	}, [activeMockQuiz]);

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
	} = useSlideSwitcher(activeMockQuiz?.response.answers ?? []);

	const onPrevSlide = () => {
		setIsAnswerVisible(false);
		goToPrevSlide();
	};

	const onRightSlide = () => {
		setIsAnswerVisible(false);
		goToNextSlide();
	};

	const onCheckQuizResult = () => {
		navigate(ROUTES.quiz.result.page, { replace: true });
	};

	const isLastQuestion = activeQuestion === totalCount;
	const isNextButton = !isLastQuestion && !isAllQuestionsAnswered;
	const isDisabled = (isLastQuestion && !isAllQuestionsAnswered) || (!isLastQuestion && !answer);

	const forceUpdate = useReducer((x) => x + 1, 0)[1];

	const handleAnswerChange = (newAnswer: QuizQuestionAnswerType) => {
		if (!activeMockQuiz) return;
		const updatedAnswers = [...activeMockQuiz.response.answers];
		updatedAnswers[activeQuestion - 1] = {
			...updatedAnswers[activeQuestion - 1],
			answer: newAnswer,
		};
		const newMockData = {
			...activeMockQuiz,
			response: { ...activeMockQuiz.response, answers: updatedAnswers },
		};
		setToLS(LS_ACTIVE_MOCK_QUIZ_KEY, newMockData);
		forceUpdate();
		changeAnswer(newAnswer);
	};

	const onInterruptQuiz = () => {
		if (activeMockQuiz) {
			removeFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
			navigate(`${ROUTES.quiz.page}`);
		}
	};

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
						<Button onClick={isNextButton ? onRightSlide : onCheckQuizResult} disabled={isDisabled}>
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

export default PublicQuizPage;
