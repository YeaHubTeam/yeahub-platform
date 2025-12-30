import { useNavigate, useSearchParams } from 'react-router-dom';

import { useCurrentProject } from '@/shared/libs';

import { getQuestionRoute } from '@/entities/question';

export const useQuestionQueryNavigate = () => {
	const [queryParams] = useSearchParams();
	const project = useCurrentProject();
	const navigate = useNavigate();

	const handleNavigation = (newId: number | string, newPage?: number) => {
		const params = new URLSearchParams(queryParams);
		if (newPage) params.set('page', newPage.toString());

		const path = getQuestionRoute[project](newId);
		navigate(`${path}?${params.toString()}`);
	};

	return { queryParams, handleNavigation };
};
