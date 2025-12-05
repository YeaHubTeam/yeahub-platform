import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateSkillMutation } from '../../api/createSkillApi';
import { CreateSkillFormValues } from '../../model/types/skillCreateTypes';

export const SkillCreateFormHeader = () => {
	const [createSkillMutation, { isLoading }] = useCreateSkillMutation();
	const { handleSubmit } = useFormContext<CreateSkillFormValues>();
	const { t } = useTranslation(['skill', 'translation']);

	const onCreateSkill = async (data: CreateSkillFormValues) => {
		await createSkillMutation(data);
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
