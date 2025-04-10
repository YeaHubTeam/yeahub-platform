import React from 'react';

import styles from './SimpleChip.module.css';
import { Flex } from '../Flex';

interface SimpleChipProps {
	children: React.ReactNode;
	onDelete: () => void;
}
export const SimpleChip = ({ children, onDelete }: SimpleChipProps) => {
	return (
		<Flex direction="row" className={styles.container}>
			<span className={styles.text}>{children}</span>
			<button onClick={onDelete} className={styles.button}>
				x
			</button>
		</Flex>
	);
};
