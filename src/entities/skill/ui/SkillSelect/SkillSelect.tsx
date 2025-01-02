import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetSkillsListQuery } from '../../api/skillApi';
import { Skill } from '../../model/types/skill';

type SkillSelectProps = Omit<React.ComponentProps<typeof Select>, 'options' | 'type' | 'value'> & {
	value: number[];
	onChange: (value: number[]) => void;
	selectedSPecializations?: number[];
};

export const SkillSelect = ({ onChange, value, selectedSPecializations }: SkillSelectProps) => {
	const { t } = useTranslation(i18Namespace.skill);

	const { data: skills } = useGetSkillsListQuery({
		limit: 100,
		specializations: selectedSPecializations,
	});

	const [selectedSkills, setSelectedSkills] = useState<number[]>(value);

	const handleChange = (newValue: string | undefined) => {
		if (!newValue) return;
		const updates = [...(selectedSkills || []), +newValue];
		setSelectedSkills(updates);
		onChange(updates);
	};

	const handleDeleteSkill = (id: number) => () => {
		const updates = selectedSkills.filter((skillId) => skillId !== id);
		setSelectedSkills(updates);
		onChange(updates);
	};

	const options = useMemo(() => {
		return (skills?.data || [])
			.map((skill) => ({
				label: skill.title,
				value: skill.id.toString(),
			}))
			.filter((skill) => !selectedSkills?.includes(+skill.value));
	}, [skills?.data, selectedSkills]);

	const skillsDictionary = useMemo(() => {
		return skills?.data?.reduce(
			(acc, skill) => {
				acc[skill.id] = skill;
				return acc;
			},
			{} as Record<string, Skill>,
		);
	}, [skills]);

	return (
		<SelectWithChips
			title={t(t(Skills.SELECT_SELECTED))}
			options={options}
			onChange={handleChange}
			placeholder={options.length ? t(Skills.SELECT_CHOOSE) : t(Skills.SELECT_EMPTY)}
			selectedItems={selectedSkills}
			handleDeleteItem={handleDeleteSkill}
			itemsDictionary={skillsDictionary}
		/>
	);
};
