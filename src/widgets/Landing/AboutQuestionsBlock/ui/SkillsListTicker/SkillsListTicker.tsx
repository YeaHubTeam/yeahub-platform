import { Flex } from '@/shared/ui/Flex';

import { skillsList } from '../../model/constants';
import { SkillChip } from '../SkillChip/SkillChip';

import styles from './SkillsListTicker.module.css';

export const SkillsListTicker = () => {
	return (
		<Flex gap={'16'} className={styles.list}>
			{skillsList.map(({ src, alt }, index) => (
				<SkillChip key={index} src={src} alt={alt} showLabel highlighted={index === 0} />
			))}
		</Flex>
	);
};
