import { Flex } from '../Flex';
import { GradeChip } from '../GradeChip';

export interface GradeListItem {
	label: string;
	value?: number;
}

export interface GradeListProps {
	items: GradeListItem[];
	className?: string;
	size?: 'small' | 'medium';
}

export const GradeList = ({ items, className, size }: GradeListProps) => (
	<Flex componentType="ul" gap="24" className={className}>
		{items.map(({ label, value }) =>
			value !== undefined ? (
				<GradeChip key={label} label={label} value={value} size={size} />
			) : null,
		)}
	</Flex>
);
