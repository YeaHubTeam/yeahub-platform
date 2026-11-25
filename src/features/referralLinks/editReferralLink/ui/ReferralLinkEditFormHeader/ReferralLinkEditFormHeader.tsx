import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useEditReferralLinkMutation } from '../../api/editReferralLinkApi';
import { EditReferralLinkBodyRequest } from '../../model/types/referralEditPageTypes';

export const ReferralLinkEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit } = useFormContext<EditReferralLinkBodyRequest>();

	const [editReferralLinkMutation, { isLoading }] = useEditReferralLinkMutation();

	const onEditReferralLink = async (data: EditReferralLinkBodyRequest) => {
		await editReferralLinkMutation(data);
	};

	return (
		<BackHeader>
			<FormCancelButton />
			<Button disabled={isLoading} onClick={handleSubmit(onEditReferralLink)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
