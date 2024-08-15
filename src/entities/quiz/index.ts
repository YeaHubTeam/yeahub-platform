export { QuizQuestionMode } from './ui/QuizQuestionMode/QuizQuestionMode';
export { InterviewResults } from './ui/InterviewResults/InterviewResults';
export { QuestionProgressBar } from './ui/QuestionProgressBar/QuestionProgressBar';
export { QuestionNavPanel } from './ui/QuestionNavPanel/QuestionNavPanel';
export { ResponseButtons } from './ui/ResponseButtons/ResponseButtons';
export { useSlideSwitcher } from '../quiz/hooks/useSlideSwitcher';
export { InterviewSlider } from './ui/InterviewSlider/InterviewSlider';
export { QuestionCategories } from './ui/QuestionCategores/QuestionCategories';

export {
	useLazyCreateNewQuizQuery,
	useGetActiveQuizzesQuery,
	useGetHistoryQuizQuery,
} from './api/quizApi';

export type {
	Answers,
	ExtraArgument,
	Interview,
	InterviewQuestion,
	InterviewQuestionBtn,
	ActiveQuizzesState,
} from './model/types/quiz';

export {
	QUIZ_QUESTIONS,
	INTERVIEW_QUESTIONS,
	MOCK_QUIZ,
	INTERVIEW_BTNS_DATA,
} from './model/data/interviewQuestions';

export type { QuestionModeType, QuizHistoryParams, QuizHistoryResponse } from './model/types/quiz';

export { getActiveQuizzes } from './model/selectors/quizSelectors';

export { activeQuizzesSlice, setQuizzes } from './model/slices/activeQuizzesSlice';
