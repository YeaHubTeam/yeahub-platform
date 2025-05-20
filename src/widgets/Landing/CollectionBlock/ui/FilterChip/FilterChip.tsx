import { Chip } from '@/shared/ui/Chip';

import styles from './FilterChip.module.css';

interface FilterChipProps {
	src: string;
	alt: string;
}

export const FilterChip = ({ src, alt }: FilterChipProps) => {
	return (
		<Chip
			variant={'big'}
			className={styles.chip}
			label={alt}
			prefix={<img className={styles.image} src={src} alt={alt} loading="lazy" />}
		/>
	);
};
