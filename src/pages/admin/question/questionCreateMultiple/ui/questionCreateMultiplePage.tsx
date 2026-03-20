import { useState } from 'react';

import { getJSONFromLS } from '@/shared/libs';

import { QuestionCreateMultipleForm } from '@/features/question/createMultipleQuestions';
import {
	CreateMultipleQuestionsResponseItem,
	GENERATED_QUESTIONS_LS_KEY,
} from '@/features/question/createMultipleQuestions';

import { PageWrapper } from '@/widgets/PageWrapper';
import { GeneratedQuestionsWidget } from '@/widgets/question/GeneratedQuestionsWidget';

const QuestionCreateMultiplePage = () => {
	const [generatedQuestions, setGeneratedQuestions] = useState<
		CreateMultipleQuestionsResponseItem[] | null
	>(getJSONFromLS(GENERATED_QUESTIONS_LS_KEY));

	console.log('generatedQuestions', generatedQuestions);

	const handleClose = () => {
		setGeneratedQuestions([]);
	};

	const handleOpenGeneratedQuestionsWidget = () => {
		setGeneratedQuestions(getJSONFromLS(GENERATED_QUESTIONS_LS_KEY));
	};

	const content =
		generatedQuestions && generatedQuestions.length > 0 ? (
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
