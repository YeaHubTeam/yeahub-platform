import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { SkillFormValues } from '@/entities/skill';

import { useCreateSkillMutation } from '../../api/createSkillApi';

export const SkillCreateFormHeader = () => {
	const [createSkillMutation, { isLoading }] = useCreateSkillMutation();
	const { handleSubmit } = useFormContext<SkillFormValues>();
	const navigate = useNavigate();
	const { t } = useTranslation(['skill', 'translation']);

	const onCreateSkill = async (data: SkillFormValues) => {
		await createSkillMutation(data)
			.unwrap()
			.then(() => {
				navigate(ROUTES.admin.skills.page);
			})
			.catch((e) => {
				// eslint-disable-next-line no-console
				console.error(e);
			});
	};

	return (
		<Flex align="center" gap="8" justify={'between'}>
			<BackButton />
			<Button disabled={isLoading} onClick={handleSubmit(onCreateSkill)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
