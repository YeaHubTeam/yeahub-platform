import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useEditSkillMutation } from '../../api/editSkillApi';
import { EditSkillFormValues } from '../../model/types/skillEditPageTypes';

export const SkillEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit } = useFormContext<EditSkillFormValues>();

	const [editSkillMutation, { isLoading }] = useEditSkillMutation();

	const onEditSkill = async (data: EditSkillFormValues) => {
		await editSkillMutation(data);
	};

	return (
		<BackHeader>
			<FormCancelButton disabled={isLoading} />
			<Button disabled={isLoading} onClick={handleSubmit(onEditSkill)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
