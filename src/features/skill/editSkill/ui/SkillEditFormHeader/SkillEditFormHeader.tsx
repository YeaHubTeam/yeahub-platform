import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Skills, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { Skill } from '@/entities/skill';

import { useEditSkillMutation } from '../../api/editSkillApi';

export const SkillEditFormHeader = () => {
	const { t } = useI18nHelpers();
	const navigate = useNavigate();

	const { handleSubmit, reset } = useFormContext<Skill>();

	const [editSkillMutation, { isLoading }] = useEditSkillMutation();
	const onResetFormValues = () => {
		reset();
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
		<Flex align="center" gap="8">
			<BackButton />
			<h1>{t(Skills.EDIT_PAGE_TITLE, { ns: i18Namespace.skill })}</h1>
			<Button onClick={onResetFormValues}>
				{t(Translation.CANCEL, { ns: i18Namespace.translation })}
			</Button>
			<Button disabled={isLoading} onClick={handleSubmit(onEditSkill)}>
				{t(Translation.SAVE, { ns: i18Namespace.translation })}
			</Button>
		</Flex>
	);
};
