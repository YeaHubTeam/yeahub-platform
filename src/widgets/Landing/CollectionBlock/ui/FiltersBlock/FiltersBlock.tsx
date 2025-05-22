import { Flex } from '@/shared/ui/Flex';

import { filtersList } from '../../model/constants';
import { FilterChip } from '../FilterChip/FilterChip';

import styles from './FiltersBlock.module.css';

export const FiltersBlock = () => {
	return (
		<div className={styles.list}>
			<Flex gap="14" className={styles['slider-container']}>
				{filtersList.map(({ src, alt }, index) => (
					<FilterChip key={index} src={src} alt={alt} />
				))}
			</Flex>
		</div>
	);
};
