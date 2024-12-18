import { useFormContext } from 'react-hook-form';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditSkillMutation } from '../../api/editSkillApi';
import { EditSkillFormValues } from '../../model/types/skillEditPageTypes';

export const SkillEditFormHeader = () => {
	const { t } = useI18nHelpers();

	const { handleSubmit, reset } = useFormContext<EditSkillFormValues>();

	const [editSkillMutation, { isLoading }] = useEditSkillMutation();

	const onResetFormValues = () => {
		reset();
	};

	const onEditSkill = async (data: EditSkillFormValues) => {
		await editSkillMutation(data);
	};

	return (
		<BackHeader>
			<Button disabled={isLoading} onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL)}
			</Button>
			<Button disabled={isLoading} onClick={handleSubmit(onEditSkill)}>
				{t(Translation.SAVE, { ns: i18Namespace.translation })}
			</Button>
		</BackHeader>
	);
};
