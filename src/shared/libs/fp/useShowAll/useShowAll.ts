import { useState } from 'react';

export const useShowAll = () => {
	const [showAll, setShowAll] = useState(false);

	const onToggleShowAll = () => {
		setShowAll((prev) => !prev);
	};

	return [showAll, onToggleShowAll] as const;
};
