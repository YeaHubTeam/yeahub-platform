import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useCurrentProject } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Author } from '../../model/types/question';

export interface QuestionAuthorProps {
	createdBy: Author;
	isCenter?: boolean;
}

export const QuestionAuthor = ({ createdBy, isCenter }: QuestionAuthorProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	const project = useCurrentProject();
	const path = project === 'admin' ? ROUTES.admin.users.detail.page : ROUTES.users.page;

	return (
		<Flex justify={isCenter ? 'center' : 'start'} gap="4">
			<Text variant="body2-accent" color="black-800">
				{t(Questions.AUTHOR)}
			</Text>
			<NavLink to={route(path, createdBy?.id)}>
				<Text variant="body2-accent" color="purple-700">
					{createdBy?.username}
				</Text>
			</NavLink>
		</Flex>
	);
};
