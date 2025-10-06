import { ChooseAuthor } from '@/entities/user';

import { useSpecializationFilter } from '../hooks/useSpecializationFilter';

export const SpecializationFilterSet = () => {
	const {
		filter: { authorId },
		handleFilterChange,
	} = useSpecializationFilter();

	const onChangeAuthor = (authorId: string | undefined) => {
		handleFilterChange({ authorId });
	};

	return (
		<>
			<ChooseAuthor selectedAuthorId={authorId} onChangeAuthor={onChangeAuthor} />
		</>
	);
};
