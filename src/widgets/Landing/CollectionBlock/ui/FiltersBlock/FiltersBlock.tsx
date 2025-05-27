import { Flex } from '@/shared/ui/Flex';

import { filtersList } from '../../model/constants';
import { FilterChip } from '../FilterChip/FilterChip';

import styles from './FiltersBlock.module.css';

export const FiltersBlock = () => {
	return (
		<div data-testid="FiltersBlock" className={styles.list}>
			<Flex
				dataTestId="FiltersBlock_SliderContainer"
				gap="14"
				className={styles['slider-container']}
			>
				{filtersList.map(({ src, alt }, index) => (
					<FilterChip key={index} src={src} alt={alt} />
				))}
			</Flex>
		</div>
	);
};
