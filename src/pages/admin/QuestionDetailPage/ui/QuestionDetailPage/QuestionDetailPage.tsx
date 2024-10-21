import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackButton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';
import { QuestionCard, useGetQuestionByIdQuery } from '@/entities/question';

/**
 * Page showing detail info about a single question
 * @constructor
 */
const QuestionDetailPage = () => {
	const { t } = useI18nHelpers(i18Namespace.translation);
	const { questionId } = useParams<{ questionId: string }>();
	const { data: profile } = useProfileQuery();
	const { data: question } = useGetQuestionByIdQuery({
		questionId,
		profileId: profile?.profiles[0].id,
	});

	if (!question) {
		return null;
	}

	return (
		<main>
			<Flex align="center" gap="8" style={{ marginBottom: 34 }}>
				<BackButton />
				<NavLink style={{ marginLeft: 'auto' }} to="edit">
					<Button> {t(Translation.EDIT)}</Button>
				</NavLink>
			</Flex>
			<QuestionCard question={question} />
		</main>
	);
};

export default QuestionDetailPage;
