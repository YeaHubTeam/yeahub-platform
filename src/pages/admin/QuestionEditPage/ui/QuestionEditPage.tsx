import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { QuestionEditForm } from '@/features/question/editQuestion';

const QuestionEditPage = () => {
	const { questionId } = useParams<{ questionId: string }>();
	const profileId = useAppSelector(getProfileId);
	const { data: question } = useGetQuestionByIdQuery({
		questionId,
		profileId: profileId,
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
