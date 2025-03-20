import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

export interface QuestionAuthorProps {
	createdBy: string;
	isCenter?: boolean;
}

export const QuestionAuthor = ({ createdBy, isCenter }: QuestionAuthorProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const authorFullName = useMemo(() => {
		if (createdBy) {
			const author = JSON.parse(createdBy);
			return `${author.firstName} ${author.lastName}`;
		}
	}, [createdBy]);

	return (
		<Flex justify={isCenter ? 'center' : 'start'} gap="4">
			<Text variant="body2-accent" color="black-800">
				{t(Questions.AUTHOR)}
			</Text>
			<NavLink to={`#`}>
				<Text variant="body2-accent" color="purple-700">
					{authorFullName}
				</Text>
			</NavLink>
		</Flex>
	);
};
