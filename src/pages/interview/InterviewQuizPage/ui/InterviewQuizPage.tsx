import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector, useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Modal } from '@/shared/ui/Modal';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { getProfileId } from '@/entities/profile';
import {
	InterviewSlider,
	QuestionNavPanel,
	getActiveQuizQuestions,
	useGetActiveQuizQuery,
	useSaveQuizResultMutation,
	useSlideSwitcher,
	getIsAllQuestionsAnswered,
	useInterruptQuizMutation,
} from '@/entities/quiz';

import styles from './InterviewQuizPage.module.css';

const InterviewQuizPage = () => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);
	const { isOpen: isOpenModal, onToggle: onToggleModal } = useModal();

	const { t } = useTranslation(i18Namespace.interviewQuiz);

	const profileId = useAppSelector(getProfileId);
	const { data: activeQuiz } = useGetActiveQuizQuery({
		profileId,
		page: 1,
		limit: 1,
	});
	const [saveResult] = useSaveQuizResultMutation();
	const [saveInteruptedResult] = useInterruptQuizMutation();

	const activeQuizQuestions = useAppSelector(getActiveQuizQuestions);
	const isAllQuestionsAnswered = useAppSelector(getIsAllQuestionsAnswered);

	const {
		questionId,
		questionTitle,
		imageSrc,
		shortAnswer,
		answeredCount,
		activeQuestion,
		totalCount,
		answer,
		changeAnswer,
		goToNextSlide,
		goToPrevSlide,
	} = useSlideSwitcher(activeQuizQuestions ?? []);

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
		if (activeQuiz) {
			const quizToSave = {
				...activeQuiz.data[0],
				response: {
					answers: activeQuizQuestions,
				},
			};
			saveResult(quizToSave);
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
