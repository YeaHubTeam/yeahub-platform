import { ReactNode, useRef } from 'react';

import { useTruncation } from '@/shared/libs';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

interface TableCellWithTooltipProps {
	children: ReactNode;
	title: ReactNode;
	className?: string;
}

export const TableCellWithTooltip = ({ children, title }: TableCellWithTooltipProps) => {
	const ref = useRef(null);
	const isTruncated = useTruncation(ref, 'column');

	return (
		<td>
			<Tooltip shouldShowTooltip={isTruncated} title={title}>
				<Text variant="body3-accent" ref={ref} maxRows={2}>
					{children}
				</Text>
			</Tooltip>
		</td>
	);
};
