import { useParams } from 'react-router-dom';

import { useProfileQuery } from '@/entities/auth';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { QuestionEditForm } from '@/features/question/editQuestion';

const QuestionEditPage = () => {
	const { questionId } = useParams<{ questionId: string }>();
	const { data: profile } = useProfileQuery();
	const { data: question } = useGetQuestionByIdQuery({
		questionId,
		profileId: profile?.profiles[0].id,
	});

	if (!question) {
		return null;
	}

	return <QuestionEditForm question={question} />;
};

export default QuestionEditPage;
