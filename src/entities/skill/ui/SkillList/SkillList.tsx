import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';

import { Skill } from '../../model/types/skill';

interface SkillListProps {
	skills: Skill[];
	onClick?: (skillId: number) => void;
}

export const SkillList = ({ skills, onClick }: SkillListProps) => {
	return (
		<Flex componentType="ul" gap="10" wrap="wrap">
			{skills?.map((skill) => {
				return (
					<li key={skill.id}>
						<Chip
							onClick={() => onClick?.(skill.id)}
							label={skill.title}
							theme="primary"
							active
							prefix={
								skill.imageSrc && (
									<img style={{ width: 20, height: 20 }} src={skill.imageSrc} alt={skill.title} />
								)
							}
						/>
					</li>
				);
			})}
		</Flex>
	);
};
