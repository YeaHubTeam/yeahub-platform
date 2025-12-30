import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditSkillMutation } from '../../api/editSkillApi';
import { EditSkillFormValues } from '../../model/types/skillEditPageTypes';

export const SkillEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);

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
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
