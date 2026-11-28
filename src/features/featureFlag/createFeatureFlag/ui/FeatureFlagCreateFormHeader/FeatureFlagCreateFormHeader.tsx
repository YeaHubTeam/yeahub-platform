import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useCreateFeatureFlagMutation } from '../../api/createFeatureFlagApi';
import { CreateFeatureFlagFormValues } from '../../model/types/featureFlagCreateTypes';

export const FeatureFlagCreateFormHeader = () => {
	const [createFeatureFlag, { isLoading }] = useCreateFeatureFlagMutation();
	const { handleSubmit } = useFormContext<CreateFeatureFlagFormValues>();
	const { t } = useTranslation(i18Namespace.translation);

	const onSubmit = async (data: CreateFeatureFlagFormValues) => {
		try {
			await createFeatureFlag(data).unwrap();
		} catch {
			return;
		}
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Flex gap="10" justify="between">
				<FormCancelButton disabled={isLoading} label={Translation.CANCEL} />
				<Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
					{t(Translation.SAVE)}
				</Button>
			</Flex>
		</Flex>
	);
};
