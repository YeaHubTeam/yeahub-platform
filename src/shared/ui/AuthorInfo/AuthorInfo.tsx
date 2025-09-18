import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useCurrentProject } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

export interface AuthorInfoProps {
	createdBy: {
		id: string;
		username: string;
	};
	isCenter?: boolean;
}

export const AuthorInfo = ({ createdBy, isCenter }: AuthorInfoProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const project = useCurrentProject();
	const path = project === 'admin' ? ROUTES.admin.users.detail.page : ROUTES.users.page;

	return (
		<Flex justify={isCenter ? 'center' : 'start'} gap="4">
			<Text variant="body2-accent" color="black-800">
				{t(Translation.AUTHOR)}:
			</Text>
			<NavLink to={route(path, createdBy.id)}>
				<Text variant="body2-accent" color="purple-700">
					{createdBy.username}
				</Text>
			</NavLink>
		</Flex>
	);
};
