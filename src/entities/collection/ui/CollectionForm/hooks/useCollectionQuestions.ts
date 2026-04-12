import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { getJSONFromLS } from '@/shared/libs';

import {
	GENERATED_QUESTIONS_LS_KEY,
	GeneratedQuestionDto,
} from '@/entities/question/@x/collection';

import { useGetCollectionQuestionsQuery } from '../../../api/collectionApi';

export const useCollectionQuestions = (collectionId?: string | number, questionsCount?: number) => {
	const { setValue, watch } = useFormContext();
	const [searchParams] = useSearchParams();
	const withGeneratedQuestions = searchParams.get('withGeneratedQuestions') === 'true';

	const [selectedQuestions, setSelectedQuestions] = useState<{ title: string; id: number }[]>([]);
	const watchCollectionQuestions = watch('questions', []);

	const { data: collectionQuestions } = useGetCollectionQuestionsQuery(
		{
			collectionId: String(collectionId),
			limit: questionsCount,
		},
		{ skip: questionsCount === undefined || !collectionId },
	);

	useEffect(() => {
		if (collectionQuestions) {
			const filteredCollectionQuestions = collectionQuestions.data.filter(
				(question) => !watchCollectionQuestions.includes(question.id),
			);
			const mappedQuestions = filteredCollectionQuestions.map((collection) => ({
				id: collection.id,
				title: collection.title,
			}));
			const mappedQuestionIds = filteredCollectionQuestions.map((collection) => collection.id);
			setValue('questions', [...mappedQuestionIds, ...watchCollectionQuestions]);
			setSelectedQuestions((prev) => [...mappedQuestions, ...prev]);
		}
	}, [collectionQuestions, setValue]);

	const handleSelectQuestion = (question: { title: string; id: number }) => {
		setSelectedQuestions((prev) => [...prev, question]);
		setValue('questions', [...watchCollectionQuestions, question.id]);
	};

	const handleUnselectQuestion = (id: number) => {
		setSelectedQuestions((prev) => prev.filter((item) => item.id !== id));
		setValue(
			'questions',
			watchCollectionQuestions.filter((questionId: number) => questionId !== id),
		);
	};

	useEffect(() => {
		const generatedQuestions: { generatedDto: GeneratedQuestionDto; questionId: number }[] =
			getJSONFromLS(GENERATED_QUESTIONS_LS_KEY);

		if (generatedQuestions && withGeneratedQuestions) {
			const filteredGeneratedQuestions = generatedQuestions.filter(
				(question) =>
					question.questionId && !watchCollectionQuestions.includes(question.questionId),
			);

			const mappedQuestions =
				filteredGeneratedQuestions.map((question) => ({
					id: question.questionId,
					title: question.generatedDto.title,
				})) || [];
			const mappedQuestionIds =
				filteredGeneratedQuestions.map((question) => question.questionId) || [];

			if (mappedQuestions.length > 0) {
				setValue('questions', [...watchCollectionQuestions, ...mappedQuestionIds]);
				setSelectedQuestions((prev) => [...prev, ...mappedQuestions]);
			}
		}
	}, []);

	return { selectedQuestions, handleSelectQuestion, handleUnselectQuestion };
};
