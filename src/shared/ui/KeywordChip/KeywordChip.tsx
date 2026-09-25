import classNames from 'classnames';

import { Pallete } from '@/shared/libs';
import { Text } from '@/shared/ui/Text';

import { TextVariant } from '../Text/types';

import styles from './KeywordChip.module.css';

export type KeywordChipVariant = 'accent' | 'default';

export interface KeywordChipProps {
	title: string;
	variant?: KeywordChipVariant;
	textColor?: Pallete;
	textVariant?: TextVariant;
}

export const KeywordChip = ({
	title,
	variant = 'default',
	textColor,
	textVariant,
}: KeywordChipProps) => {
	return (
		<div className={classNames(styles.chip, styles[variant])}>
			<Text variant={textVariant || 'body2'} color={textColor} className={styles.title}>
				{title}
			</Text>
		</div>
	);
};
