import styles from './Flex.module.css';
import type { FlexAlign, FlexDirection, FlexGap, FlexJustify, FlexWrap } from './types';

export const justifyClasses: Record<FlexJustify, string> = {
	around: styles['justify-around'],
	end: styles['justify-end'],
	between: styles['justify-between'],
	center: styles['justify-center'],
	start: styles['justify-start'],
};

export const directionClasses: Record<FlexDirection, string> = {
	row: styles['direction-row'],
	column: styles['direction-column'],
	'row-reverse': styles['direction-row-reverse'],
	'column-reverse': styles['direction-column-reverse'],
};

export const alignClasses: Record<FlexAlign, string> = {
	end: styles['align-end'],
	start: styles['align-start'],
	center: styles['align-center'],
	normal: styles['align-normal'],
};

export const wrapClasses: Record<FlexWrap, string> = {
	wrap: styles['wrap'],
	nowrap: styles['nowrap'],
};

export const gapClasses: Record<FlexGap, string> = {
	'2': styles.gap2,
	'4': styles.gap4,
	'6': styles.gap6,
	'8': styles.gap8,
	'10': styles.gap10,
	'12': styles.gap12,
	'14': styles.gap14,
	'16': styles.gap16,
	'20': styles.gap20,
	'24': styles.gap24,
	'26': styles.gap26,
	'28': styles.gap28,
	'30': styles.gap30,
	'32': styles.gap32,
	'40': styles.gap40,
	'48': styles.gap48,
	'52': styles.gap52,
	'56': styles.gap56,
	'60': styles.gap60,
	'100': styles.gap100,
	'120': styles.gap120,
};

export const flexClasses: Record<number, string> = {
	1: styles.flex1,
};
