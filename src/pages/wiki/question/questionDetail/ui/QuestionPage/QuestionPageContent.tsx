import { ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getGuruWithMatchingSpecialization, GurusBanner } from '@/entities/guru';
import { ProgressBlock, type Question, QuestionAdditionalInfo } from '@/entities/question';
import { getChannelsForSpecialization } from '@/entities/socialMedia';

import { QuestionBody } from '@/widgets/question/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader';

import { QuestionActions } from '@/pages/wiki/question/questionDetail/ui/QuestionActions/QuestionActions';

import styles from './QuestionPage.module.css';

interface QuestionPageContentProps {
	question: Question;
	questionId: string;
	isDisabled: boolean;
	onMovePrev: () => void;
	onMoveNext: () => void;
}

export const QuestionPageContent = (props: QuestionPageContentProps) => {
	const { question, questionId, isDisabled, onMovePrev, onMoveNext } = props;

	const { isMobile, isTablet } = useScreenSize();

	const guru = getGuruWithMatchingSpecialization(question.questionSpecializations);
	const showAuthor = guru ? false : true;
	const media = getChannelsForSpecialization(question.questionSpecializations);

	const {
		createdBy,
		checksCount,
		rate,
		keywords,
		complexity,
		questionSkills,
		shortAnswer,
		longAnswer,
		isFavorite,
	} = question;

	return (
		<Flex gap="20">
			<Flex gap="20" direction="column" flex={1} maxWidth>
				<QuestionHeader question={question} />
				<QuestionActions
					questionId={questionId}
					checksCount={checksCount}
					isFavorite={isFavorite}
					onMovePrev={onMovePrev}
					onMoveNext={onMoveNext}
					isDisabled={isDisabled}
				/>
				<QuestionBody shortAnswer={shortAnswer} longAnswer={longAnswer} />
				{(isMobile || isTablet) && guru && <GurusBanner gurus={[guru]} />}
			</Flex>
			{!isMobile && !isTablet && (
				<Flex direction="column" gap="20" className={styles.additional}>
					<ProgressBlock checksCount={checksCount} />
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
	);
};
