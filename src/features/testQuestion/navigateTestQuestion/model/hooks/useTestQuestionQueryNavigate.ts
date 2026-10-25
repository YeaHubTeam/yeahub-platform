import { useNavigate, useSearchParams } from 'react-router-dom';

import { useCurrentProject } from '@/shared/libs';

import { getTestQuestionRoute } from '@/entities/testQuestion';

export const useTestQuestionQueryNavigate = () => {
	const [queryParams] = useSearchParams();
	const project = useCurrentProject();
	const navigate = useNavigate();

	const handleNavigation = (newId: number | string, newPage?: number) => {
		const params = new URLSearchParams(queryParams);
		if (newPage) params.set('page', newPage.toString());

		const path = getTestQuestionRoute[project](newId);
		navigate(`${path}?${params.toString()}`);
	};

	return { queryParams, handleNavigation };
};
