import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Translation } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { useCreateFeatureFlagMutation } from '../../api/createFeatureFlagApi';
import { CreateFeatureFlagFormValues } from '../../model/types/featureFlagCreateTypes';

export const FeatureFlagCreateFormHeader = () => {
	const [createFeatureFlagMutation, { isLoading }] = useCreateFeatureFlagMutation();
	const navigate = useNavigate();

	const backModal = useModal();
	const cancelModal = useModal();

	const {
		handleSubmit,
		reset,
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

	const handleOpenCancelModal = () => {
		cancelModal.onOpen();
	};

	const handleConfirmCancel = () => {
		reset();
		cancelModal.onClose();
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
				{isDirty && (
					<Button
						disabled={isLoading}
						variant="destructive-secondary"
						onClick={handleOpenCancelModal}
					>
						{t(Translation.CANCEL)}
					</Button>
				)}
				<Button disabled={isLoading} onClick={handleSubmit(onCreateFeatureFlag)}>
					{t(Translation.SAVE)}
				</Button>

				{cancelModal.isOpen && (
					<BlockerDialog
						isOpen={cancelModal.isOpen}
						onClose={cancelModal.onClose}
						onOk={handleConfirmCancel}
						onCancel={cancelModal.onClose}
						message={Translation.MODAL_CANCEL_CHANGES}
					/>
				)}

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
