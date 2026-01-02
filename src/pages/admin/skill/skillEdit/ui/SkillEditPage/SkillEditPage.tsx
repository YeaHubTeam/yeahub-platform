import { useParams } from 'react-router-dom';

import { useGetSkillByIdQuery } from '@/entities/skill';

import { SkillEditForm } from '../SkillEditForm/SkillEditForm';

const SkillEditPage = () => {
	const { skillId } = useParams<{ skillId: string }>();
	const { data: skill } = useGetSkillByIdQuery({ skillId: skillId! });

	if (!skill) {
		return null;
	}

	return <SkillEditForm skill={skill} />;
};

export default SkillEditPage;
