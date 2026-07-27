import { DropdownSkeleton } from '../Dropdown';
import { Flex } from '../Flex';

export const KeywordSelectSkeleton = () => {
	return (
		<Flex direction="column" align="start" gap="8">
			<DropdownSkeleton size="S" />
		</Flex>
	);
};
