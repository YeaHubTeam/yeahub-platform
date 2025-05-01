import classNames from 'classnames';

import { Chip } from '@/shared/ui/Chip';

import styles from './SkillChip.module.css';

interface SkillChipProps {
	src: string;
	alt: string;
	showLabel?: boolean;
	highlighted?: boolean;
}

export const SkillChip = ({ src, alt, showLabel = false, highlighted = false }: SkillChipProps) => {
	const chipClasses = classNames(styles.chip, {
		[styles.highlighted]: highlighted,
		[styles['chip-with-label']]: showLabel,
	});
	const prefixWrapperClass = classNames(styles['chip-gap'], {
		[styles['chip-empty-gap']]: !showLabel,
	});
	const labelClass = classNames({
		[styles['highlighted-with-label-color']]: highlighted && showLabel,
	});
	const iconClasses = classNames(styles.icon, { [styles['icon-with-label']]: showLabel });

	return (
		<Chip
			className={chipClasses}
			label={showLabel ? alt : ''}
			prefixWrapperClassName={prefixWrapperClass}
			labelClassName={labelClass}
			prefix={<img className={iconClasses} src={src} alt={alt} loading="lazy" />}
		/>
	);
};
