import { Chip } from '@/shared/ui/Chip';

import styles from './SkillChip.module.css';

interface SkillChipProps {
	src: string;
	alt: string;
	showLabel?: boolean;
	chipPadding6?: boolean;
}

export const SkillChip = ({ src, alt, showLabel = false, chipPadding6 }: SkillChipProps) => {
	const imgSize = showLabel ? 34 : 36;

	return (
		<Chip
			variant={'big'}
			className={styles.chip}
			chipPadding6={chipPadding6}
			label={showLabel ? alt : ''}
			prefix={
				<img style={{ width: imgSize, height: imgSize }} src={src} alt={alt} loading="lazy" />
			}
		/>
	);
};
