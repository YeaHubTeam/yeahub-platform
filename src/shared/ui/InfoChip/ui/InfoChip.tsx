import classNames from 'classnames';

import { Flex } from '../../Flex';

import styles from './InfoChip.module.css';

interface InfoChipProps {
	label: string;
	value?: number;
}

export const InfoChip = ({ label, value }: InfoChipProps) => {
	return (
		<Flex align="center" gap="12" className={classNames(styles['info-chip-wrapper'])}>
			<span className={classNames(styles['info-chip-label'])}>{label}</span>
			<span className={classNames(styles['info-chip-value'])}>{value}</span>
		</Flex>
	);
};
