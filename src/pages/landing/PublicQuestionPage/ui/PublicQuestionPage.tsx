import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

import { useGetPublicQuestionByIdQuery } from '@/entities/question';

import { QuestionAdditionalInfo } from '@/widgets/question/QuestionAdditionalInfo';
import { QuestionBody } from '@/widgets/question/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader';

import styles from './PublicQuestionPage.module.css';
import { PublicQuestionPageSkeleton } from './PublicQuestionPage.skeleton';

const PublicQuestionPage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const navigate = useNavigate();
	const { questionId } = useParams<{ questionId: string }>();
	const { t } = useTranslation(i18Namespace.translation);

	const {
		data: question,
		isFetching,
		isLoading,
	} = useGetPublicQuestionByIdQuery({
		questionId,
	});

	const onBack = () => navigate(ROUTES.questions.page);

	if (isLoading || isFetching) {
		return <PublicQuestionPageSkeleton />;
	}

	if (!question) {
		return null;
	}

	const { createdBy, rate, keywords, complexity, questionSkills, shortAnswer, longAnswer } =
		question;

	return (
		<Flex direction="column" align="start">
			<Button
				size="small"
				onClick={onBack}
				preffix={<Icon icon="altArrowLeft" color="purple-700" size={20} />}
				variant="link-purple"
				className={styles['back-button']}
			>
				{t(Translation.RETURN)}
			</Button>
			<Flex gap="20" maxWidth>
				<Flex gap="20" direction="column" flex={1}>
					<QuestionHeader question={question} />
					<QuestionBody shortAnswer={shortAnswer} longAnswer={longAnswer} />
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<QuestionAdditionalInfo
							rate={rate}
							createdBy={createdBy}
							keywords={keywords}
							complexity={complexity}
							questionSkills={questionSkills}
							route={ROUTES.interview.questions.page}
						/>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default PublicQuestionPage;
