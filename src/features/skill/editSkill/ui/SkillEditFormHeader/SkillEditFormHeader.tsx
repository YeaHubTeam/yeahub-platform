import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { Skill } from '@/entities/skill';

import { useEditSkillMutation } from '../../api/editSkillApi';

export const SkillEditFormHeader = () => {
	const { t } = useI18nHelpers();
	const navigate = useNavigate();

	const { handleSubmit, reset } = useFormContext<Skill>();

	const [editSkillMutation, { isLoading }] = useEditSkillMutation();
	const onResetFormValues = () => {
		reset();
		navigate(-1);
	};

	const onEditSkill = async (data: Skill) => {
		await editSkillMutation(data)
			.unwrap()
			.then(() => {
				navigate(-1);
			})
			.catch((e) => console.error(e));
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
