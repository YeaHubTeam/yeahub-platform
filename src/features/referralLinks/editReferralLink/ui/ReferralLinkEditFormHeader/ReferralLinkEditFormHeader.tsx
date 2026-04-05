import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditReferralLinkMutation } from '../../api/editReferralLinkApi';
import { EditReferralLinkBodyRequest } from '../../model/types/referralEditPageTypes';

export const ReferralLinkEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit, reset } = useFormContext<EditReferralLinkBodyRequest>();

	const [editReferralLinkMutation, { isLoading }] = useEditReferralLinkMutation();

	const onResetFormValues = () => {
		reset();
	};

	const onEditReferralLink = async (data: EditReferralLinkBodyRequest) => {
		await editReferralLinkMutation(data);
	};

	return (
		<BackHeader>
			<Button onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL)}
			</Button>
			<Button disabled={isLoading} onClick={handleSubmit(onEditReferralLink)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
