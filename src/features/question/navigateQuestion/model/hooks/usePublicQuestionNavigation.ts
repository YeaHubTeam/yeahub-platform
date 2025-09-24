import { Question, useGetPublicQuestionsListQuery } from '@/entities/question';

import { calculatePageNavigation } from '../helpers/calculatePageNavigation';
import { QuestionNavigation } from '../types/questionNavigationTypes';

import { useInitQuestionId } from './useInitQuestionId';

export const usePublicQuestionNavigation = ({ filter, questionId }: QuestionNavigation) => {
	const { status, page, ...params } = filter;
	const currentQuestionId = Number(questionId);
	const currentPage = page ?? 1;

	const skipCurrentPage = status !== 'all' || !filter.specialization;

	const { data: currentPublicQuestions, isFetching: isLoadingCurrentPage } =
		useGetPublicQuestionsListQuery({ ...params, page: currentPage }, { skip: skipCurrentPage });

	const currentQuestionsData = currentPublicQuestions?.data || [];
	const currentIndex = currentQuestionsData.findIndex((item) => item.id === currentQuestionId);
	const isNotFound = currentIndex === -1;

	const initQuestionId = useInitQuestionId(currentQuestionId, currentQuestionsData);

	const total = currentPublicQuestions?.total || 0;
	const limit = currentPublicQuestions?.limit || 10;
	const lastPageNum = Math.ceil(total / limit);

	const skipPrevPage = currentIndex > 0 && !isNotFound;
	const skipNextPage = currentIndex < currentQuestionsData.length - 1 && !isNotFound;

	const prevPageNum = currentPage > 1 ? currentPage - 1 : lastPageNum;
	const nextPageNum = currentPage < lastPageNum && !isNotFound ? currentPage + 1 : 1;

	const { data: prevPublicQuestions, isFetching: isLoadingPrevPage } =
		useGetPublicQuestionsListQuery(
			{ ...params, page: prevPageNum },
			{ skip: skipPrevPage || !lastPageNum },
		);
	const { data: nextPublicQuestions, isFetching: isLoadingNextPage } =
		useGetPublicQuestionsListQuery(
			{ ...params, page: nextPageNum },
			{ skip: skipNextPage || !lastPageNum },
		);

	const isLoading = isLoadingCurrentPage || isLoadingPrevPage || isLoadingNextPage;

	const { prevId, nextId, nextPage, prevPage } = calculatePageNavigation<Question>({
		currentItemId: currentQuestionId,
		initItemId: initQuestionId,
		currentPageData: currentPublicQuestions,
		prevPageData: prevPublicQuestions,
		nextPageData: nextPublicQuestions,
		currentPage,
	});

	const isDisabled = isLoading || !prevId || !nextId;

	return { prevId, nextId, prevPage, nextPage, isDisabled };
};
