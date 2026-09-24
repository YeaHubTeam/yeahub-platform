import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { getJSONFromLS, useAppSelector } from '@/shared/libs';

import { getProfileId } from '@/entities/profile/@x/collection';
import {
	GENERATED_QUESTIONS_LS_KEY,
	GeneratedQuestionDto,
	useLazyGetQuestionByIdQuery,
} from '@/entities/question/@x/collection';

import { useGetCollectionQuestionsQuery } from '../../../api/collectionApi';

export const useCollectionQuestions = (collectionId?: string | number, questionsCount?: number) => {
	const { setValue, watch } = useFormContext();
	const [searchParams] = useSearchParams();
	const withGeneratedQuestions = searchParams.get('withGeneratedQuestions') === 'true';

	const [selectedQuestions, setSelectedQuestions] = useState<{ title: string; id: number }[]>([]);
	const watchCollectionQuestions = watch('questions', []);
	const profileId = useAppSelector(getProfileId);
	const [getQuestionById] = useLazyGetQuestionByIdQuery();
	const questionIdsKey = watchCollectionQuestions.join(',');

	const { data: collectionQuestions } = useGetCollectionQuestionsQuery(
		{
			collectionId: String(collectionId),
			limit: questionsCount,
		},
		{ skip: questionsCount === undefined || !collectionId },
	);

	useEffect(() => {
		const questionIds = questionIdsKey ? questionIdsKey.split(',').map(Number) : [];

		if (collectionId || questionIds.length === 0) {
			return;
		}

		let isActive = true;

		const restoreSelectedQuestions = async () => {
			const restoredQuestions = await Promise.all(
				questionIds.map(async (questionId: number) => {
					try {
						const question = await getQuestionById(
							{ questionId: String(questionId), profileId },
							true,
						).unwrap();

						return { id: question.id, title: question.title };
					} catch {
						return null;
					}
				}),
			);

			if (isActive) {
				setSelectedQuestions(
					restoredQuestions.filter(
						(question): question is { id: number; title: string } => question !== null,
					),
				);
			}
		};

		void restoreSelectedQuestions();

		return () => {
			isActive = false;
		};
	}, [collectionId, getQuestionById, profileId, questionIdsKey]);

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
