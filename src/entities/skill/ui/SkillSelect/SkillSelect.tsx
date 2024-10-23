import { useMemo, useState } from 'react';
import { Select, Chip, Text } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { useGetSkillsListQuery } from '../../api/skillApi';
import { Skill } from '../../model/types/skill';

import styles from './SkillSelect.module.css';

type SkillSelectProps = Omit<React.ComponentProps<typeof Select>, 'options' | 'type' | 'value'> & {
	value: number[];
	onChange: (value: number[]) => void;
};

export const SkillSelect = ({ onChange, value }: SkillSelectProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const { data: skills } = useGetSkillsListQuery({});

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
			.filter((skill) => !selectedSkills?.includes(+skill.value))
			.slice(0, 10);
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
		<div className={styles.wrapper}>
			<Select
				onChange={handleChange}
				options={options}
				type="default"
				placeholder={
					options.length ? t(Profile.SKILLFORM_SKILLSELECT) : t(Profile.SKILLFORM_EMPTYSKILLSELECT)
				}
				className={styles.select}
			/>
			{Boolean(selectedSkills?.length) && (
				<>
					<Text text={t('skillForm.selectedSkills')} className={styles.title} />
					<div className={styles.selection}>
						{selectedSkills?.map((skillId) => {
							return (
								<Chip
									theme="primary"
									onDelete={handleDeleteSkill(skillId)}
									key={skillId}
									label={skillsDictionary?.[skillId].title}
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};
