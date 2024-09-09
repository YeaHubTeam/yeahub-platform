import { HttpResponse, http } from 'msw';
import mockProfileResponse from './data/mockProfileResponse';

export default http.get(process.env.API_URL + 'auth/profile', () => {
	return HttpResponse.json(mockProfileResponse);
});
