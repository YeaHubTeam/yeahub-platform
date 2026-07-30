import { Link } from 'react-router-dom';

import { Pallete } from '@/shared/libs';
import { Text } from '@/shared/ui/Text';
import { TextVariant } from '@/shared/ui/Text/types';

interface TableCellLinkProps {
	to: string;
	text: string;
	variant?: TextVariant;
	color?: Pallete;
}

export const TableCellLink = ({
	to,
	text,
	variant = 'body3-accent',
	color,
}: TableCellLinkProps) => {
	return (
		<Link to={to}>
			<Text variant={variant} color={color}>
				{text}
			</Text>
		</Link>
	);
};
