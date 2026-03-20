import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { GeneratedQuestionsWithErrors } from '@/features/question/createMultipleQuestions';

import styles from './GeneratedQuestionsErrors.module.css';

interface GeneratedQuestionsErrorsProps {
	generatedQuestionsWithErrors: GeneratedQuestionsWithErrors[];
}

export const GeneratedQuestionsErrors = ({
	generatedQuestionsWithErrors,
}: GeneratedQuestionsErrorsProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<Flex direction="column" gap="16">
			<Text variant="body4" color="red-700">
				{t(Translation.GENERATED_QUESTIONS_ERRORS_TITLE)}
			</Text>
			<ul className={styles.list}>
				{generatedQuestionsWithErrors.map((item, index) => (
					<li key={index} className={styles.item}>
						<Flex direction="column" gap="4">
							<Text variant="body3-strong">{item.requestedQuestionText}</Text>
							<Text variant="body2" color="red-700">
								{item.generationError || item.savingError}
							</Text>
						</Flex>
					</li>
				))}
			</ul>
		</Flex>
	);
};
