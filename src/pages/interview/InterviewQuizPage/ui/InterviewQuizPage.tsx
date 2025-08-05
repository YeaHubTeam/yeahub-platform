import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { setToLS } from '@/shared/helpers/manageLocalStorage';
import { useAppDispatch, useAppSelector, useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Modal } from '@/shared/ui/Modal';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { getHasPremiumAccess, getProfileId } from '@/entities/profile';
import {
	QuestionNavPanel,
	getActiveQuizQuestions,
	useGetActiveQuizQuery,
	useSaveQuizResultMutation,
	useSlideSwitcher,
	getIsAllQuestionsAnswered,
	useInterruptQuizMutation,
	LS_ACTIVE_MOCK_QUIZ_KEY,
	clearActiveMockQuizState,
} from '@/entities/quiz';

import { InterviewSlider } from '@/widgets/interview/InterviewSlider';

import styles from './InterviewQuizPage.module.css';

const InterviewQuizPage = () => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);
	const { isOpen: isOpenModal, onToggle: onToggleModal } = useModal();
	const navigate = useNavigate();
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const dispatch = useAppDispatch();

	const { t } = useTranslation(i18Namespace.interviewQuiz);

	const profileId = useAppSelector(getProfileId);
	const { data: activeQuiz } = useGetActiveQuizQuery(
		{
			profileId,
			page: 1,
			limit: 1,
		},
		{ skip: !hasPremium },
	);

	const [saveResult] = useSaveQuizResultMutation();
	const [saveInteruptedResult] = useInterruptQuizMutation();

	const activeQuizQuestions = useAppSelector(getActiveQuizQuestions);
	const isAllQuestionsAnswered = useAppSelector(getIsAllQuestionsAnswered);

	useEffect(() => {
		if (!hasPremium) {
			setToLS(LS_ACTIVE_MOCK_QUIZ_KEY, { [profileId]: activeQuizQuestions });
		}
	}, []);

	const favorites = activeQuiz?.data?.reduce(
		(acc, quiz) => {
			if (quiz.questions) {
				quiz.questions.forEach((question) => {
					if (question.isFavorite) {
						acc[question.id] = question.isFavorite;
					}
				});
			}
			return acc;
		},
		{} as Record<string, boolean>,
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
	} = useSlideSwitcher(updatedQuiz ?? activeQuizQuestions ?? []);

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

	const onSubmitQuiz = () => {
		if (hasPremium) {
			if (activeQuiz) {
				const quizToSave = {
					...activeQuiz.data[0],
					response: {
						answers: activeQuizQuestions,
					},
				};
				saveResult(quizToSave);
			}
		} else {
			navigate('result');
		}
	};

	const onInterruptQuiz = () => {
		if (activeQuiz) {
			const quizToSave = {
				...activeQuiz.data[0],
				response: {
					answers: activeQuizQuestions.map((quest) => ({
						...quest,
						answer: quest.answer ?? 'UNKNOWN',
					})),
				},
			};
			saveInteruptedResult({ data: quizToSave, isInterrupted: true });
		} else {
			dispatch(clearActiveMockQuizState({ profileId: profileId }));
			navigate(ROUTES.interview.page);
		}
	};

	return (
		<>
			<Modal
				isOpen={isOpenModal}
				title={t(InterviewQuiz.INTERRUPT_QUIZ_TITLE)}
				onClose={onToggleModal}
				buttonPrimaryText={t(InterviewQuiz.INTERRUPT_QUIZ_YES)}
				buttonOutlineText={t(InterviewQuiz.INTERRUPT_QUIZ_NO)}
				buttonPrimaryClick={onInterruptQuiz}
				buttonOutlineClick={onToggleModal}
			>
				<Text variant="body3-accent">{t(InterviewQuiz.INTERRUPT_QUIZ_DESCRIPTION)}</Text>
			</Modal>
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
						<Flex direction="row">
							<Button onClick={isNextButton ? onRightSlide : onSubmitQuiz} disabled={isDisabled}>
								{isNextButton ? t(InterviewQuiz.NEXT) : t(InterviewQuiz.CHECK)}
							</Button>
							{isNextButton && (
								<Button className={styles['end-button']} onClick={onToggleModal}>
									{t(InterviewQuiz.COMPLETE)}
								</Button>
							)}
						</Flex>
					</Flex>
				</Card>
			</Flex>
		</>
	);
};

export default InterviewQuizPage;
