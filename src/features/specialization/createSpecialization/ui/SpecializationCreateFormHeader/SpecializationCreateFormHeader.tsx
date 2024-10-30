import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { Specialization, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { BackButton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';

import { SpecializationFormValues } from '@/entities/specialization';

import { useCreateSpecializationMutation } from '../../api/createSpecializationApi';
import { SpecializationCreateSchema } from '../../model/types/specializationCreateTypes';

export const SpecializationCreateFormHeader = () => {
	const [createSpecializationMutation, { isLoading }] = useCreateSpecializationMutation();
	const { handleSubmit } = useFormContext<SpecializationCreateSchema>();
	const navigate = useNavigate();
	const { t } = useTranslation(['specialization', 'translation']);

	const onCreateSpecialization = async (data: SpecializationFormValues) => {
		await createSpecializationMutation(data)
			.unwrap()
			.then(() => {
				navigate(ROUTES.admin.specialization.page);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	return (
		<Flex align="center" gap="8">
			<BackButton />
			<h1>{t(Specialization.SPECIALIZATION_CREATE_PAGE_TITLE)}</h1>
			<Button disabled={isLoading} onClick={handleSubmit(onCreateSpecialization)}>
				{t(Translation.CREATE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
