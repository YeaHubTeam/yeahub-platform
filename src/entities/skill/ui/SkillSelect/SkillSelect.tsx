import { ComponentProps, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Skills } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetSkillsListQuery } from '../../api/skillApi';
import { Skill } from '../../model/types/skill';

import { SkillSelectSkeleton } from './SkillSelect.skeleton';

export type SkillSelectProps = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value: number[] | number;
	onChange: (value: number[]) => void;
	onBlur?: () => void;
	selectedSpecializations?: number[];
	hasMultiple?: boolean;
};

export const SkillSelect = ({
	onChange,
	onBlur,
	value,
	selectedSpecializations,
	hasMultiple = true,
	disabled,
}: SkillSelectProps) => {
	const { t } = useTranslation(i18Namespace.skill);

	const { data: skills, isLoading } = useGetSkillsListQuery({
		limit: 100,
		specializations: selectedSpecializations,
	});

	const [selectedSkills, setSelectedSkills] = useState<number[]>(
		Array.isArray(value) ? value : value !== undefined ? [value] : [],
	);

	const handleChange = (newValue: string | undefined) => {
		if (!newValue) return;
		if (hasMultiple) {
			const updates = [...(selectedSkills || []), +newValue];
			setSelectedSkills(updates);
			onChange(updates);
			onBlur?.();
		} else {
			setSelectedSkills([+newValue]);
			onChange([+newValue]);
		}
	};

	const handleDeleteSkill = (id: number) => () => {
		const updates = selectedSkills.filter((skillId) => skillId !== id);
		setSelectedSkills(updates);
		onChange(updates);
		onBlur?.();
	};

	const options = useMemo(() => {
		if (hasMultiple) {
			return (skills?.data || [])
				.map((skill) => ({
					label: skill.title,
					value: skill.id.toString(),
				}))
				.filter((skill) => !selectedSkills?.includes(+skill.value));
		} else {
			return (skills?.data || []).map((skill) => ({
				label: skill.title,
				value: skill.id.toString(),
			}));
		}
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

	if (!hasMultiple) {
		return (
			<>
				<Dropdown
					label={options.length ? t(Skills.SELECT_CHOOSE) : t(Skills.SELECT_EMPTY)}
					disabled={disabled}
					value={skillsDictionary?.[Array.isArray(value) ? value[0] : value]?.title}
					onSelect={(val) => handleChange(String(val))}
					size="S"
				>
					{options.map((option) => (
						<Option value={option.value} label={option.label} key={option.label} />
					))}
				</Dropdown>
			</>
		);
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
