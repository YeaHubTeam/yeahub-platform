import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import {
	CreateMultipleQuestionsResponseItem,
	GENERATED_QUESTIONS_LS_KEY,
} from '@/features/question/createMultipleQuestions';
import {
	GeneratedQuestionsSuccess,
	GeneratedQuestionsWithErrors,
} from '@/features/question/createMultipleQuestions';

import { GeneratedQuestionsErrors } from '../GeneratedQuestionsErrors/GeneratedQuestionsErrors';
import { GeneratedQuestionsTable } from '../GeneratedQuestionsTable/GeneratedQuestionsTable';

interface GeneratedQuestionsWidgetProps {
	generatedQuestions: CreateMultipleQuestionsResponseItem[];
	onClose: () => void;
}

export const GeneratedQuestionsWidget = ({
	generatedQuestions,
	onClose,
}: GeneratedQuestionsWidgetProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const clearStorage = () => {
		localStorage.removeItem(GENERATED_QUESTIONS_LS_KEY);
	};

	const handleClose = () => {
		clearStorage();
		onClose();
	};

	const { generatedQuestionsSuccess, generatedQuestionsWithErrors } = useMemo(() => {
		return generatedQuestions.reduce<{
			generatedQuestionsSuccess: GeneratedQuestionsSuccess[];
			generatedQuestionsWithErrors: GeneratedQuestionsWithErrors[];
		}>(
			(acc, question) => {
				if (question.questionId && question.generatedDto && !question.generationError) {
					acc.generatedQuestionsSuccess.push(question);
				} else {
					acc.generatedQuestionsWithErrors.push(question);
				}
				return acc;
			},
			{ generatedQuestionsSuccess: [], generatedQuestionsWithErrors: [] },
		);
	}, [generatedQuestions]);

	return (
		<Flex direction="column" gap="24">
			<Flex align="center" justify="between">
				<Text variant="head3">{t(Translation.GENERATED_QUESTIONS_TITLE)}</Text>
				<Button variant="outline" size="large" onClick={handleClose}>
					{t(Translation.RETURN)}
				</Button>
			</Flex>
			<Card>
				<Flex direction="column" gap="24">
					{generatedQuestionsSuccess.length > 0 && (
						<GeneratedQuestionsTable generatedQuestionsSuccess={generatedQuestionsSuccess} />
					)}
					{generatedQuestionsWithErrors.length > 0 && (
						<GeneratedQuestionsErrors generatedQuestionsWithErrors={generatedQuestionsWithErrors} />
					)}
				</Flex>
			</Card>
		</Flex>
	);
};
