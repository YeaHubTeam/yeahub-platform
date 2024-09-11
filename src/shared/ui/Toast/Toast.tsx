import t from 'react-hot-toast';

import { Error } from './Error';
import { Success } from './Success';
import { Warning } from './Warning';

const DURATION_TOAST = 3000;

export const toast = {
	error: (message: JSX.Element | string | null, args?: Parameters<typeof t>['1']) =>
		t.custom(
			(currentToast) => <Error currentToast={currentToast} message={message} />,

			{
				duration: DURATION_TOAST,
				...args,
			},
		),
	success: (message: JSX.Element | string | null, args?: Parameters<typeof t>['1']) =>
		t.custom(
			(currentToast) => <Success currentToast={currentToast} message={message} />,

			{
				duration: DURATION_TOAST,
				...args,
			},
		),

	warning: (message: JSX.Element | string | null, args?: Parameters<typeof t>['1']) =>
		t.custom(
			(currentToast) => <Warning currentToast={currentToast} message={message} />,

			{
				duration: DURATION_TOAST,
				...args,
			},
		),
};
