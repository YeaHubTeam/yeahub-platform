import { Flex } from '@/shared/ui/Flex';

import { skills } from '../../../../model/constants';
import { SkillChip } from '../../../SkillChip/SkillChip';
import { CardBlockLayout } from '../../CardBlockLayout/CardBlockLayout';

export const SkillsBlock = () => {
	return (
		<CardBlockLayout>
			<Flex gap={'16'}>
				<SkillChip src={skills.swift.src} alt={skills.swift.alt} />
				<SkillChip src={skills.python.src} alt={skills.python.alt} />
			</Flex>
			<Flex gap={'16'}>
				<SkillChip src={skills.git.src} alt={skills.git.alt} />
				<SkillChip src={skills.react.src} alt={skills.react.alt} highlighted />
				<SkillChip src={skills.html.src} alt={skills.html.alt} />
			</Flex>
			<Flex gap={'16'}>
				<SkillChip src={skills.java.src} alt={skills.java.alt} />
				<SkillChip src={skills.docker.src} alt={skills.docker.alt} />
				<SkillChip src={skills.javascript.src} alt={skills.javascript.alt} />
				<SkillChip src={skills.typescript.src} alt={skills.typescript.alt} />
			</Flex>
		</CardBlockLayout>
	);
};
