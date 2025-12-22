import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Skills, Translation } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetSkillsListQuery } from '../../api/skillApi';
import { MAX_SHOW_LIMIT_SKILLS } from '../../model/constants/skillConstants';

interface SkillsListFieldProps {
	selectedSkills?: number[];
	onChangeSkills: (skills: number[] | undefined) => void;
	selectedSpecialization: number;
	showAllLabel?: boolean;
}

export const SkillsListField = ({
	selectedSkills,
	onChangeSkills,
	selectedSpecialization,
	showAllLabel = true,
}: SkillsListFieldProps) => {
	const { t } = useTranslation([i18Namespace.skill, i18Namespace.translation]);
	const { isMobile } = useScreenSize();

	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(MAX_SHOW_LIMIT_SKILLS);

	const { data: skills } = useGetSkillsListQuery({
		limit,
		specializations: selectedSpecialization,
	});

	const onToggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit(skills?.total ?? MAX_SHOW_LIMIT_SKILLS);
		} else {
			setLimit(MAX_SHOW_LIMIT_SKILLS);
		}
	}, [skills?.total, showAll, isMobile]);

	const onChooseSkill = (id: number) => {
		if (selectedSkills?.includes(id)) {
			const filteredSkills = selectedSkills.filter((skill) => skill !== id);
			onChangeSkills(filteredSkills.length > 0 ? filteredSkills : undefined);
		} else {
			onChangeSkills([...(selectedSkills || []), id]);
		}
	};

	const skillsItems: BaseFilterItem<number>[] | undefined = skills?.data.map(
		({ id, title, imageSrc }) => ({
			id,
			title,
			imageSrc,
			active: selectedSkills?.includes(id),
		}),
	);

	if (!skillsItems) return null;

	return (
		<Flex direction="column" align="start" gap="8">
			<BaseFilterSection
				data={skillsItems}
				title={t(Skills.SELECT_CHOOSE)}
				onClick={onChooseSkill}
			/>

			{!isMobile && showAllLabel && (
				<Button variant="link" onClick={onToggleShowAll}>
					{!showAll
						? t(Translation.SHOW_ALL, { ns: i18Namespace.translation })
						: t(Translation.HIDE, { ns: i18Namespace.translation })}
				</Button>
			)}
		</Flex>
	);
};
