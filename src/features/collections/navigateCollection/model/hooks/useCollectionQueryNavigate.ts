import { useNavigate, useSearchParams } from 'react-router-dom';

import { useCurrentProject } from '@/shared/hooks';

import { getCollectionRoute } from '@/entities/collection';

export const useCollectionQueryNavigate = () => {
	const [queryParams] = useSearchParams();
	const project = useCurrentProject();
	const navigate = useNavigate();

	const onQueryNavigate = (newId: number | string, newPage?: number) => {
		const params = new URLSearchParams(queryParams);
		if (newPage) params.set('page', newPage.toString());

		const collectionPath = getCollectionRoute[project](newId);
		navigate(`${collectionPath}?${params.toString()}`);
	};

	return { onQueryNavigate };
};
