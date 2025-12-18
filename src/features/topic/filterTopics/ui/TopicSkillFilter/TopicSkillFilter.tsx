import { useAppSelector } from '@/shared/libs';

import { getSpecializationId } from '@/entities/profile';
import { SkillsListField } from '@/entities/skill';

import styles from './TopicSkillFilter.module.css';

interface TopicSkillFilterProps {
	value?: number[];
	onChange: (value?: number[]) => void;
}

export const TopicSkillFilter = ({ value, onChange }: TopicSkillFilterProps) => {
	const specializationId = useAppSelector(getSpecializationId);

	const onChangeSkills = (skills?: number[]) => {
		onChange(skills);
	};

	return (
		<div className={styles.root}>
			<SkillsListField
				selectedSkills={value}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={specializationId || 0}
				showAllLabel
			/>
		</div>
	);
};

export default TopicSkillFilter;
