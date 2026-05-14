import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Translation } from '@/shared/config';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { useCreateFeatureFlagMutation } from '../../api/createFeatureFlagApi';
import { CreateFeatureFlagFormValues } from '../../model/types/featureFlagCreateTypes';

export const FeatureFlagCreateFormHeader = () => {
	const [createFeatureFlagMutation, { isLoading }] = useCreateFeatureFlagMutation();
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
	const [isBackModalOpen, setIsBackModalOpen] = useState(false);
	const navigate = useNavigate();

	const {
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useFormContext<CreateFeatureFlagFormValues>();
	const { t } = useTranslation(i18Namespace.translation);

	const handleBackClick = () => {
		if (isDirty) {
			setIsBackModalOpen(true);
			return;
		}

		navigate(-1);
	};

	const handleCloseBackModal = () => {
		setIsBackModalOpen(false);
	};

	const handleConfirmBack = () => {
		setIsBackModalOpen(false);
		navigate(-1);
	};

	const onCreateFeatureFlag = async (data: CreateFeatureFlagFormValues) => {
		await createFeatureFlagMutation(data);
	};

	const handleOpenCancelModal = () => {
		setIsCancelModalOpen(true);
	};

	const handleCloseCancelModal = () => {
		setIsCancelModalOpen(false);
	};

	const handleConfirmCancel = () => {
		reset();
		handleCloseCancelModal();
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

				{isCancelModalOpen && (
					<BlockerDialog
						isOpen={isCancelModalOpen}
						onClose={handleCloseCancelModal}
						onOk={handleConfirmCancel}
						onCancel={handleCloseCancelModal}
					/>
				)}

				{isBackModalOpen && (
					<BlockerDialog
						isOpen={isBackModalOpen}
						onClose={handleCloseBackModal}
						onOk={handleConfirmBack}
						onCancel={handleCloseBackModal}
					/>
				)}
			</Flex>
		</Flex>
	);
};
