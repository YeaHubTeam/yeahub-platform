import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Project, useCurrentProject } from '@/shared/libs';
import { IconButtonSize, IconButtonSkeleton } from '@/shared/ui/IconButton';

export const FiltersDrawerSkeleton = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const project = useCurrentProject();

	const filterIconSize: Record<Project, IconButtonSize> = {
		platform: 'medium',
		admin: 'large',
	};

	return (
		<div>
			<IconButtonSkeleton
				aria-label={t(Translation.LOADING)}
				role="status"
				form="square"
				size={filterIconSize[project]}
				variant="tertiary"
			/>
		</div>
	);
};
