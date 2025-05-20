import React from 'react';

import { Flex } from '../../Flex';

import styles from './SimpleChip.module.css';

type SimpleChipTestId = {
	simpleChip?: string;
	simpleChipText?: string;
	simpleChipDelButt?: string;
};

interface SimpleChipProps {
	dataTestId?: SimpleChipTestId;
	chipTextTestId?: string;
	chipDeleteButtTestId?: string;
	children: React.ReactNode;
	onDelete: () => void;
}
export const SimpleChip = ({
	children,
	onDelete,
	dataTestId = {
		simpleChip: 'SimpleChip',
		simpleChipText: 'SimpleChip_Text',
		simpleChipDelButt: 'SimpleChip_Delete_Button',
	},
}: SimpleChipProps) => {
	return (
		<Flex direction="row" className={styles.container} dataTestId={dataTestId.simpleChip}>
			<span className={styles.text} data-testid={dataTestId.simpleChipText}>
				{children}
			</span>
			<button
				onClick={onDelete}
				className={styles.button}
				data-testid={dataTestId.simpleChipDelButt}
			>
				x
			</button>
		</Flex>
	);
};
