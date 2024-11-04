import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { Skills, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { BackButton } from '@/shared/ui/BackButton';
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
		<Flex align="center" gap="8">
			<BackButton />
			<h1>{t(Skills.CREATE_PAGE_TITLE)}</h1>
			<Button disabled={isLoading} onClick={handleSubmit(onCreateSkill)}>
				{t(Translation.CREATE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
