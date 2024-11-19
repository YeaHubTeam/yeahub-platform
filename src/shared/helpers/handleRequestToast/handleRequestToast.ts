import i18n from '@/shared/config/i18n/i18n';
import { toast } from '@/shared/ui/Toast';

interface HandleRequestToastArgs {
	/**
	 * The function that runs after the successful execution of the request
	 */
	onSuccess?: () => void;
	/**
	 * The function that runs after the unsuccessful execution of the request
	 */
	onError?: () => void;
	/**
	 * The message that is displayed after successful request
	 */
	successMessage: string;
	/**
	 * The message that is displayed after unsuccessful request
	 */
	failedMessage: string;
}

/**
 * Function for processing the execution of a request with subsequent notifications
 * @param onSuccess
 * @param onError
 * @param successMessage
 * @param failedMessage
 */
export const handleRequestToast = ({
	onSuccess,
	onError,
	successMessage,
	failedMessage,
}: HandleRequestToastArgs) => {
	try {
		toast.success(i18n.t(successMessage));
		onSuccess?.();
	} catch (error) {
		toast.error(i18n.t(failedMessage));
		onError?.();
		// eslint-disable-next-line no-console
		console.log(error);
	}
};
