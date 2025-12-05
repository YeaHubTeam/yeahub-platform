import { Pallete } from '@/shared/libs';
import { VariantType } from '@/shared/ui/Button/types';

import type { ModalVariant } from './ModalTypes';

export const titleColors: Record<ModalVariant, Pallete> = {
	default: 'black-900',
	error: 'red-700',
};

export const closeIconColors: Record<ModalVariant, Pallete> = {
	default: 'purple-700',
	error: 'red-600',
};

export const primaryButtonVariants: Record<ModalVariant, VariantType> = {
	default: 'primary',
	error: 'destructive',
};

export const outlineButtonVariants: Record<ModalVariant, VariantType> = {
	default: 'outline',
	error: 'destructive-outline',
};

export const modalTestIds = {
	modal: 'Modal',
	modalOverlay: 'Modal_Overlay',
	modalTitle: 'Modal_Title',
	modalCloseIcon: 'Modal_Close_Icon',
	modalContentWrapper: 'Modal_Content_Wrapper',
	modalPrimaryButton: 'Modal_Primary_Button',
	modalOutlineButton: 'Modal_Outline_Button',
};
