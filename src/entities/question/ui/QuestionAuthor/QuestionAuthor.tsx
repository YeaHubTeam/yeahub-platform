import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useCurrentProject } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

export interface QuestionAuthorProps {
	createdBy: string;
	isCenter?: boolean;
}

export const QuestionAuthor = ({ createdBy, isCenter }: QuestionAuthorProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	const project = useCurrentProject();
	const path = project === 'admin' ? ROUTES.admin.users.detail.page : ROUTES.users.page;

	const author = useMemo(() => {
		try {
			const { firstName, lastName, userId } = JSON.parse(createdBy);

			return {
				fullName: `${firstName || ''} ${lastName || ''}`.trim(),
				userId,
			};
		} catch (error) {
			console.error('Error parsing createdBy:', error);
			return null;
		}
	}, [createdBy]);

	return (
		<Flex justify={isCenter ? 'center' : 'start'} gap="4">
			<Text variant="body2-accent" color="black-800">
				{t(Questions.AUTHOR)}
			</Text>
			<NavLink to={route(path, author?.userId)}>
				<Text variant="body2-accent" color="purple-700">
					{author?.fullName}
				</Text>
			</NavLink>
		</Flex>
	);
};
