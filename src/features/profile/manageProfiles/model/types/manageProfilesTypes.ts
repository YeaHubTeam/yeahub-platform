import { ModalProps } from '@/shared/ui/Modal';

import { Profile } from '@/entities/auth';

export type ProfileRequestData = {
	id: string;
};

export type CreateProfileRequestData = Pick<
	Profile,
	'profileType' | 'specializationId' | 'markingWeight'
> & {
	userId: string;
};

export type DeleteProfileModalProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
	profileId: string;
};
