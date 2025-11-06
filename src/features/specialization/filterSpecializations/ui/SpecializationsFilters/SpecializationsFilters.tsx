import { Flex } from '@/shared/ui/Flex';

import { UserSelect } from '@/entities/user';

import { SpecializationsFilterParams } from '../../model/types/filters';

interface SpecializationsFiltersProps {
	filters: SpecializationsFilterParams;
	onChangeAuthor: (author?: SpecializationsFilterParams['author']) => void;
}

export const SpecializationsFilters = ({
	filters,
	onChangeAuthor,
}: SpecializationsFiltersProps) => {
	const { author } = filters;

	return (
		<Flex direction="column" gap="24">
			<UserSelect onChange={onChangeAuthor} value={author} />
		</Flex>
	);
};
