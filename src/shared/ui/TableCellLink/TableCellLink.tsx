import { Link } from 'react-router-dom';

import { Text } from '@/shared/ui/Text';

interface TableCellLinkProps {
	to: string;
	text: string;
}

export const TableCellLink = ({ to, text }: TableCellLinkProps) => {
	return (
		<Link to={to}>
			<Text variant="body3-accent" color="purple-700">
				{text}
			</Text>
		</Link>
	);
};
