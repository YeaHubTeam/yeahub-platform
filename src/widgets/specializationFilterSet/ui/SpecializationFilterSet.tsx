import { UserSelect } from '@/entities/user';

import { useSpecializationFilter } from '../hooks/useSpecializationFilter';

export const SpecializationFilterSet = () => {
	const {
		filter: { authorId },
		handleFilterChange,
	} = useSpecializationFilter();

	const onChangeAuthor = (authorId: string | string[]) => {
		const value = Array.isArray(authorId) ? authorId[0] : authorId;
		handleFilterChange({ authorId: value });
	};

	return <UserSelect onChange={onChangeAuthor} value={authorId} hasMultiple={false} />;
};
