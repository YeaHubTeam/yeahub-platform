import { ChipSkeleton } from '@/shared/ui/Chip';
import { IconSkeleton } from '@/shared/ui/Icon';

import styles from './SkillChip.module.css';

interface SkillChipProps {
	showLabel?: boolean;
	label?: string;
}

export const SkillChipSkeleton = ({ label, showLabel = false }: SkillChipProps) => {
	const imgSize = showLabel ? 34 : 36;

	return (
		<ChipSkeleton
			variant={'big'}
			className={styles.chip}
			label={label ? label : ''}
			withText={80}
			prefix={<IconSkeleton size={imgSize} />}
		/>
	);
};
