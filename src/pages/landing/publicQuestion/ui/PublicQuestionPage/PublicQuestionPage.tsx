import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { i18Namespace, Translation, ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

import { getGuruWithMatchingSpecialization, GurusBanner } from '@/entities/guru';
import { useGetPublicQuestionByIdQuery } from '@/entities/question';
import { getChannelsForSpecialization } from '@/entities/socialMedia';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { useGetQuestionsFilterParams } from '@/features/question/filterQuestions';
import {
	usePublicQuestionNavigation,
	useQuestionQueryNavigate,
} from '@/features/question/navigateQuestion';

import { QuestionAdditionalInfo } from '@/widgets/question/QuestionAdditionalInfo';
import { QuestionBody } from '@/widgets/question/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader';
import { QuestionNavigation } from '@/widgets/question/QuestionNavigation';

import styles from './PublicQuestionPage.module.css';
import { PublicQuestionPageSkeleton } from './PublicQuestionPage.skeleton';

const PublicQuestionPage = () => {
	const filter = useGetQuestionsFilterParams({
		specialization: DEFAULT_SPECIALIZATION_ID,
		page: 1,
	});
	const { isMobile, isTablet } = useScreenSize();
	const navigate = useNavigate();
	const { questionId = '' } = useParams<{ questionId: string }>();
	const { t } = useTranslation(i18Namespace.translation);

	const {
		data: question,
		isFetching,
		isLoading,
	} = useGetPublicQuestionByIdQuery({
		questionId,
	});

	const { handleNavigation } = useQuestionQueryNavigate();

	const { prevId, prevPage, nextId, nextPage, isDisabled } = usePublicQuestionNavigation({
		filter,
		questionId,
	});

	const onBack = () => navigate(-1);

	if (isLoading || isFetching) {
		return <PublicQuestionPageSkeleton />;
	}

	if (!question) {
		return null;
	}

	const { createdBy, rate, keywords, complexity, questionSkills, shortAnswer, longAnswer } =
		question;

	const guru = getGuruWithMatchingSpecialization(question.questionSpecializations);
	const showAuthor = guru ? false : true;

	const media = getChannelsForSpecialization(question.questionSpecializations);

	const onMovePrev = () => {
		handleNavigation(prevId, prevPage);
	};

	const onMoveNext = () => {
		handleNavigation(nextId, nextPage);
	};

	return (
		<Flex direction="column" align="start">
			<Flex>
				<Button
					size="medium"
					onClick={onBack}
					preffix={<Icon icon="altArrowLeft" color="purple-700" size={20} />}
					variant="link-purple"
					className={styles['back-button']}
				>
					{t(Translation.RETURN)}
				</Button>
			</Flex>
			<Flex gap="20" maxWidth>
				<Flex gap="20" direction="column" flex={1} maxWidth>
					<QuestionHeader question={question} />
					<QuestionNavigation
						onMovePrev={onMovePrev}
						onMoveNext={onMoveNext}
						isDisabled={isDisabled}
					/>
					<QuestionBody shortAnswer={shortAnswer} longAnswer={longAnswer} />
					{(isMobile || isTablet) && guru && <GurusBanner gurus={[guru]} />}
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<QuestionAdditionalInfo
							showAuthor={showAuthor}
							rate={rate}
							createdBy={createdBy}
							keywords={keywords}
							complexity={complexity}
							questionSkills={questionSkills}
							route={ROUTES.wiki.questions.page}
							media={media}
						/>
						{guru && <GurusBanner gurus={[guru]} />}
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default PublicQuestionPage;
