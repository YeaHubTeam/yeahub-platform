import { useParams } from 'react-router-dom';

import { useGetSkillByIdQuery } from '@/entities/skill';

import { SkillEditForm } from '@/features/skill/editSkill';

const SkillEditPage = () => {
	const { skillId } = useParams<{ skillId: string }>();
	const { data: skill } = useGetSkillByIdQuery(skillId as string);

	if (!skill) {
		return null;
	}

	return <SkillEditForm skill={skill} />;
};

export default SkillEditPage;
