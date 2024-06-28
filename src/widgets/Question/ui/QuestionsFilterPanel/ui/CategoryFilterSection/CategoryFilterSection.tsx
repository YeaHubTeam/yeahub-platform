import { useGetSkillsListQuery } from '@/entities/skill';

import { BaseFilterSection } from '../BaseFilterSection/BaseFilterSection';

export const CategoryFilterSection = () => {
	const { data: skills } = useGetSkillsListQuery({});

	if (!skills) return null;
	return <BaseFilterSection data={skills?.data} title="Категория вопросов" />;
};
