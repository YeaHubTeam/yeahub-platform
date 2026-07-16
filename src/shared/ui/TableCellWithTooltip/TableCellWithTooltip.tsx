import classNames from 'classnames';
import { ReactNode, useRef } from 'react';

import { useTruncation } from '@/shared/libs';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import styles from './TableCellWithTooltip.module.css';

interface TableCellWithTooltipProps {
	children: ReactNode;
	title: ReactNode;
	className?: string;
}

export const TableCellWithTooltip = ({ children, title, className }: TableCellWithTooltipProps) => {
	const ref = useRef(null);
	const isTruncated = useTruncation(ref, 'column');

	return (
		<td>
			<Tooltip shouldShowTooltip={isTruncated} title={title}>
				<Text variant="body3-accent" ref={ref} className={classNames(styles.text, className)}>
					{children}
				</Text>
			</Tooltip>
		</td>
	);
};
