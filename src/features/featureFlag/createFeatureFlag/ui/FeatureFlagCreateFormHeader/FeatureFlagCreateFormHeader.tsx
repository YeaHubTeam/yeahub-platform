import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Translation } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { useCreateFeatureFlagMutation } from '../../api/createFeatureFlagApi';
import { CreateFeatureFlagFormValues } from '../../model/types/featureFlagCreateTypes';

export const FeatureFlagCreateFormHeader = () => {
	const [createFeatureFlagMutation, { isLoading }] = useCreateFeatureFlagMutation();
	const navigate = useNavigate();

	const backModal = useModal();

	const {
		handleSubmit,
		formState: { isDirty },
	} = useFormContext<CreateFeatureFlagFormValues>();
	const { t } = useTranslation(i18Namespace.translation);

	const handleBackClick = () => {
		if (isDirty) {
			backModal.onOpen();
			return;
		}

		navigate(-1);
	};

	const handleConfirmBack = () => {
		backModal.onClose();
		navigate(-1);
	};

	const onCreateFeatureFlag = async (data: CreateFeatureFlagFormValues) => {
		await createFeatureFlagMutation(data);
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<IconButton
				data-testid="BackButton"
				onClick={handleBackClick}
				aria-label={t(Translation.BACK_BUTTON)}
				icon={<Icon icon="arrowLeft" size={20} />}
				form="round"
				variant="outline"
			/>

			<Flex gap="10" justify="between">
				<FormCancelButton disabled={isLoading} />
				<Button disabled={isLoading} onClick={handleSubmit(onCreateFeatureFlag)}>
					{t(Translation.SAVE)}
				</Button>

				{backModal.isOpen && (
					<BlockerDialog
						isOpen={backModal.isOpen}
						onClose={backModal.onClose}
						onOk={handleConfirmBack}
						onCancel={backModal.onClose}
					/>
				)}
			</Flex>
		</Flex>
	);
};
