import { useEffect, useState } from 'react';
import { Button } from 'yeahub-ui-kit';

import { useGetSkillsListQuery } from '@/entities/skill';

import { BaseFilterSection } from '../BaseFilterSection/BaseFilterSection';

interface CategoryFilterSectionProps {
	selectedSkills?: number[];
	onChangeSkills: (skills: number[]) => void;
}

const defaultLimit = 5;

export const CategoryFilterSection = ({
	selectedSkills,
	onChangeSkills,
}: CategoryFilterSectionProps) => {
	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(5);
	const { data: skills } = useGetSkillsListQuery({ limit });
	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (showAll) {
			setLimit(skills?.total ?? defaultLimit);
		} else {
			setLimit(5);
		}
	}, [skills?.total, showAll]);

	const onClick = (id: number) => {
		if (selectedSkills?.includes(id)) {
			onChangeSkills(selectedSkills.filter((skill) => skill !== id));
		} else {
			onChangeSkills([...(selectedSkills || []), id]);
		}
	};

	const prepareData = skills?.data.map((skill) => ({
		...skill,
		active: selectedSkills?.includes(skill.id),
	}));

	if (!prepareData) return null;
	return (
		<>
			<BaseFilterSection data={prepareData} title="Категория вопросов" onClick={onClick} />
			<Button theme="link" onClick={toggleShowAll}>
				Показать все
			</Button>
		</>
	);
};
