import { Flex } from '@/shared/ui/Flex';

import { About } from '../About/About';
import { SkillsCard } from '../Cards/SkillsCard/SkillsCard';
import { SpecialtiesCard } from '../Cards/SpecialtiesCard/SpecialtiesCard';
import { List } from '../List/List';

import styles from './SkillsBlock.module.css';

export const SkillsBlock = () => {
	return (
		<div className={styles.container}>
			<section>
				<Flex className={styles.content}>
					<About />
					<Flex gap={'20'} className={styles.cards}>
						<SpecialtiesCard />
						<SkillsCard />
					</Flex>
				</Flex>
				<List />
			</section>
		</div>
	);
};
