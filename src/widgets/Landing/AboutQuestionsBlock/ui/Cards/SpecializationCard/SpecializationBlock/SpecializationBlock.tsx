import { Flex } from '@/shared/ui/Flex';

import { specializations } from '../../../../model/constants';
import { SkillChip } from '../../../SkillChip/SkillChip';
import { CardBlockLayout } from '../../CardBlockLayout/CardBlockLayout';

export const SpecializationBlock = () => {
	return (
		<CardBlockLayout hasOffset>
			<Flex gap={'16'}>
				<SkillChip
					src={specializations.dataScience.src}
					alt={specializations.dataScience.alt}
					showLabel
				/>
				<SkillChip src={specializations.ml.src} alt={specializations.ml.alt} showLabel />
				<SkillChip src={specializations.testing.src} alt={specializations.testing.alt} showLabel />
			</Flex>
			<Flex gap={'16'}>
				<SkillChip src={specializations.testing.src} alt={specializations.testing.alt} showLabel />
				<SkillChip
					src={specializations.frontend.src}
					alt={specializations.frontend.alt}
					showLabel
				/>
				<SkillChip
					src={specializations.gameDevelopment.src}
					alt={specializations.gameDevelopment.alt}
					showLabel
				/>
			</Flex>
			<Flex gap={'16'}>
				<SkillChip
					src={specializations.androidDev.src}
					alt={specializations.androidDev.alt}
					showLabel
				/>
				<SkillChip
					src={specializations.androidDev.src}
					alt={specializations.androidDev.alt}
					showLabel
				/>
				<SkillChip src={specializations.iosDev.src} alt={specializations.iosDev.alt} showLabel />
			</Flex>
		</CardBlockLayout>
	);
};
