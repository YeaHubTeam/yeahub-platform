import React from 'react';

import { Flex } from '../Flex';

import styles from './SimpleChip.module.css';

type SimpleChipTestId = {
	simpleChip?: string;
	simpleChipText?: string;
	simpleChipDeleteButton?: string;
};

interface SimpleChipProps {
	dataTestIds?: SimpleChipTestId;
	children: React.ReactNode;
	onDelete: () => void;
}
export const SimpleChip = ({
	children,
	onDelete,
	dataTestIds = {
		simpleChip: 'SimpleChip',
		simpleChipText: 'SimpleChip_Text',
		simpleChipDeleteButton: 'SimpleChip_Delete_Button',
	},
}: SimpleChipProps) => {
	return (
		<Flex direction="row" className={styles.container} dataTestId={dataTestIds.simpleChip}>
			<span className={styles.text} data-testid={dataTestIds.simpleChipText}>
				{children}
			</span>
			<button
				onClick={onDelete}
				className={styles.button}
				data-testid={dataTestIds.simpleChipDeleteButton}
			>
				x
			</button>
		</Flex>
	);
};
