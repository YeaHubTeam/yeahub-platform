import { DefaultBodyType, http, HttpResponse } from 'msw';

import { specializationApiUrls } from '../../model/constants/specializationConstants';
import {
	GetSpecializationByIdParamsRequest,
	GetSpecializationByIdResponse,
} from '../../model/types/specialization';

import { specializationsMock } from './data/index';

export const specializationByIdMock = http.get<
	Record<keyof GetSpecializationByIdParamsRequest, string>,
	DefaultBodyType,
	GetSpecializationByIdResponse
>(
	`${process.env.API_URL}${specializationApiUrls.getSpecializationsList}/:specializationId`,
	({ params }) => {
		const { specializationId } = params;

		const specialization = specializationsMock.data.find((s) => String(s.id) === specializationId);

		return HttpResponse.json(specialization);
	},
);
