import { HttpResponse, http } from 'msw';

export default http.post(process.env.API_URL + 'auth/logout', () => {
	return HttpResponse.text('', { status: 200 });
});
