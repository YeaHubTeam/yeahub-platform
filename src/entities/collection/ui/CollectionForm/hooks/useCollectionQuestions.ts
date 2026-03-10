import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetCollectionQuestionsQuery } from '../../../api/collectionApi';

export const useCollectionQuestions = (collectionId?: string | number, questionsCount?: number) => {
	const { setValue, watch } = useFormContext();
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
			setValue(
				'questions',
				collectionQuestions.data.map((collection) => collection.id),
			);
			setSelectedQuestions(
				collectionQuestions.data.map((collection) => ({
					id: collection.id,
					title: collection.title,
				})),
			);
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

	return { selectedQuestions, handleSelectQuestion, handleUnselectQuestion };
};
