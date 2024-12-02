import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Specialization, Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateSpecializationMutation } from '../../api/createSpecializationApi';
import { CreateSpecializationFormValues } from '../../model/types/specializationCreateTypes';

export const SpecializationCreateFormHeader = () => {
	const [createSpecializationMutation, { isLoading }] = useCreateSpecializationMutation();
	const { handleSubmit } = useFormContext<CreateSpecializationFormValues>();
	const { t } = useTranslation(['specialization', 'translation']);

	const onCreateSpecialization = async (data: CreateSpecializationFormValues) => {
		await createSpecializationMutation(data);
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
