import { useCallback, useState } from 'react';

import { QuestionCreateMultipleForm } from '@/features/question/createMultipleQuestions';
import {
	CreateMultipleQuestionsResponseItem,
	GENERATED_QUESTIONS_LS_KEY,
} from '@/features/question/createMultipleQuestions';

import { PageWrapper } from '@/widgets/PageWrapper';
import { GeneratedQuestionsWidget } from '@/widgets/question/GeneratedQuestionsWidget';

const QuestionCreateMultiplePage = () => {
	const getGeneratedQuestions: () => CreateMultipleQuestionsResponseItem[] = useCallback(() => {
		try {
			const raw = localStorage.getItem(GENERATED_QUESTIONS_LS_KEY);
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	}, []);

	const [generatedQuestions, setGeneratedQuestions] =
		useState<CreateMultipleQuestionsResponseItem[]>(getGeneratedQuestions());

	const handleClose = () => {
		setGeneratedQuestions([]);
	};

	const handleOpenGeneratedQuestionsWidget = () => {
		setGeneratedQuestions(getGeneratedQuestions());
	};

	const content =
		generatedQuestions.length > 0 ? (
			<GeneratedQuestionsWidget generatedQuestions={generatedQuestions} onClose={handleClose} />
		) : (
			<QuestionCreateMultipleForm
				handleOpenGeneratedQuestionsWidget={handleOpenGeneratedQuestionsWidget}
			/>
		);

	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default QuestionCreateMultiplePage;
