import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { Dropdown } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetSkillsListQuery } from '../../api/skillApi';
import { Skill } from '../../model/types/skill';

import { SkillSelectSkeleton } from './SkillSelect.skeleton';

export type SkillSelectProps = Omit<
	React.ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'children'
> & {
	value: number[];
	onChange: (value: number[]) => void;
	selectedSpecializations?: number[];
};

export const SkillSelect = ({
	onChange,
	value,
	selectedSpecializations,
	disabled,
}: SkillSelectProps) => {
	const { t } = useTranslation(i18Namespace.skill);

	const { data: skills, isLoading } = useGetSkillsListQuery({
		limit: 100,
		specializations: selectedSpecializations,
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

	if (isLoading) {
		return <SkillSelectSkeleton />;
	}

	return (
		<SelectWithChips
			disabled={disabled}
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
