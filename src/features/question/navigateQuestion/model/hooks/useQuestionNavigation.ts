import { useAppSelector } from '@/shared/libs';
import { calculatePageNavigation } from '@/shared/libs';

import { getProfileId, getSpecializationId } from '@/entities/profile';
import {
	Question,
	useGetQuestionsForLearnQuery,
	useGetQuestionsListQuery,
} from '@/entities/question';

import { normalizeFilters } from '../helpers/normalizeFilters';
import { QuestionNavigation } from '../types/questionNavigationTypes';

import { useInitQuestionId } from './useInitQuestionId';

export const useQuestionNavigation = ({ questionId, filter }: QuestionNavigation) => {
	const currentQuestionId = Number(questionId);
	const currentPage = filter.page ?? 1;
	const status = filter.status ?? '';

	const specializationId = useAppSelector(getSpecializationId);
	const profileId = useAppSelector(getProfileId);

	const params = {
		...normalizeFilters(filter),
		profileId,
		specialization: specializationId,
	};

	const isAllQuestions = status && ['all', 'favorite'].includes(status);

	const skipGetAllQuestions = status ? !['all', 'favorite'].includes(status) : false;
	const skipGetLearnedQuestions = status ? ['all', 'favorite'].includes(status) : true;

	const { data: currentAllQuestions, isFetching: isLoadingCurrentAllQuestions } =
		useGetQuestionsListQuery({ ...params, page: currentPage }, { skip: skipGetAllQuestions });

	const { data: currentLearnedQuestions, isFetching: isLoadingCurrentLearnedQuestions } =
		useGetQuestionsForLearnQuery(
			{ ...params, page: currentPage },
			{ skip: skipGetLearnedQuestions },
		);

	const currentQuestions = isAllQuestions ? currentAllQuestions : currentLearnedQuestions;

	const currentQuestionsData = currentQuestions?.data || [];
	const currentIndex = currentQuestionsData.findIndex((item) => item.id === currentQuestionId);
	const isNotFound = currentIndex === -1;

	const initQuestionId = useInitQuestionId(currentQuestionId, currentQuestionsData);

	const total = currentQuestions?.total || 0;
	const limit = currentQuestions?.limit || 10;
	const lastPageNum = Math.ceil(total / limit);

	const prevPageNum = currentPage > 1 ? currentPage - 1 : lastPageNum;
	const nextPageNum = currentPage < lastPageNum && !isNotFound ? currentPage + 1 : 1;

	const skipGetPrevQuestions = currentIndex > 0 && !isNotFound;
	const skipGetNextQuestions = currentIndex < currentQuestionsData.length - 1 && !isNotFound;

	const { data: prevAllQuestions, isFetching: isLoadingPrevAllQuestions } =
		useGetQuestionsListQuery(
			{ ...params, page: prevPageNum },
			{ skip: skipGetAllQuestions || skipGetPrevQuestions || !lastPageNum },
		);
	const { data: prevLearnedQuestions, isFetching: isLoadingPrevLearnedQuestions } =
		useGetQuestionsForLearnQuery(
			{ ...params, page: prevPageNum },
			{ skip: skipGetLearnedQuestions || skipGetPrevQuestions || !lastPageNum },
		);

	const { data: nextAllQuestions, isFetching: isLoadingNextAllQuestions } =
		useGetQuestionsListQuery(
			{ ...params, page: nextPageNum },
			{ skip: skipGetAllQuestions || skipGetNextQuestions || !lastPageNum },
		);
	const { data: nextLearnedQuestions, isFetching: isLoadingNextLearnedQuestions } =
		useGetQuestionsForLearnQuery(
			{ ...params, page: nextPageNum },
			{ skip: skipGetLearnedQuestions || skipGetNextQuestions || !lastPageNum },
		);

	const isLoading =
		isLoadingCurrentAllQuestions ||
		isLoadingCurrentLearnedQuestions ||
		isLoadingPrevAllQuestions ||
		isLoadingPrevLearnedQuestions ||
		isLoadingNextAllQuestions ||
		isLoadingNextLearnedQuestions;

	const { prevId, nextPage, nextId, prevPage } = calculatePageNavigation<Question>({
		currentPageData: currentQuestions,
		prevPageData: isAllQuestions ? prevAllQuestions : prevLearnedQuestions,
		nextPageData: isAllQuestions ? nextAllQuestions : nextLearnedQuestions,
		currentItemId: currentQuestionId,
		initItemId: initQuestionId,
		currentPage,
	});

	const isDisabled = isLoading || !prevId || !nextId;

	return { prevId, prevPage, nextId, nextPage, isDisabled };
};
