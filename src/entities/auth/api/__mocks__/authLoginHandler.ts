import { HttpResponse, http } from 'msw';
import mockLoginResponse from './data/mockLoginResponse';

export default http.get(process.env.API_URL + 'auth/login', () => {
	return HttpResponse.json(mockLoginResponse);
});
