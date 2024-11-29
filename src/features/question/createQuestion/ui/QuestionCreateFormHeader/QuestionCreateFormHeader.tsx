import { useFormContext } from 'react-hook-form';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateQuestionMutation } from '../../api/createQuestionApi';
import { CreateQuestionFormValues } from '../../model/types/questionCreateTypes';

export const QuestionCreateFormHeader = () => {
	const [createQuestionMutation, { isLoading }] = useCreateQuestionMutation();
	const { handleSubmit } = useFormContext<CreateQuestionFormValues>();
	const { t } = useI18nHelpers(i18Namespace.translation);

	const onCreateQuestion = async (data: CreateQuestionFormValues) => {
		await createQuestionMutation(data);
	};

	return (
		<Flex align="center" gap="8" justify={'between'}>
			<BackButton />
			<Button disabled={isLoading} onClick={handleSubmit(onCreateQuestion)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
