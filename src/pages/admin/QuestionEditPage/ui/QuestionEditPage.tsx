import { useParams } from 'react-router-dom';

import { useProfileQuery } from '@/entities/auth';
import { useGetQuestionByIdQuery } from '@/entities/question';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

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

	const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
		return arg ? arg.map((el) => el.id) : [];
	};

	const { questionSkills, questionSpecializations, ...formattedQuestion } = question;

	return (
		<QuestionEditForm
			question={{
				...formattedQuestion,
				skills: formatToFormField<Skill[]>(questionSkills),
				specializations: formatToFormField<Specialization[]>(questionSpecializations),
			}}
		/>
	);
};

export default QuestionEditPage;
