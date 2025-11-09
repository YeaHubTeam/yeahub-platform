import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Pallete } from '@/shared/types/types';
import { IconName } from '@/shared/ui/Icon';
import { ToastVariant } from '@/shared/ui/Toast/types';

export const TOAST_DURATION = 3000;

export const toastColor: Record<ToastVariant, Pallete> = {
	error: 'red-700',
	warning: 'yellow-900',
	success: 'green-900',
};

export const toastIcon: Record<ToastVariant, IconName> = {
	error: 'closeCircle',
	warning: 'warning',
	success: 'checkCircle',
};

export const toastTitle: Record<ToastVariant, string> = {
	error: Translation.TOAST_TITLE_ERROR,
	warning: Translation.TOAST_TITLE_WARNING,
	success: Translation.TOAST_TITLE_SUCCESS,
};

export const toastTestIds = {
	toastRoot: 'Toast_Root',
	toastIcon: 'Toast_Icon',
	toastText: 'Toast_Text',
	toastCloseBtn: 'Toast_CloseBtn',
	toastMessage: 'Toast_Message',
};
