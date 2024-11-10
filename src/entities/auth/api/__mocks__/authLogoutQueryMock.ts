import { HttpResponse, http } from 'msw';

import { authApiUrls } from '../../model/constants/authConstants';

export const authLogoutQueryMock = () =>
	http.get(process.env.API_URL + authApiUrls.logout, () => {
		return HttpResponse.text('', { status: 200 });
	});
