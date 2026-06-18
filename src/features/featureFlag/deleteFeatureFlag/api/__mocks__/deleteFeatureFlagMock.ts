import { http, HttpResponse } from 'msw';

import { featureFlagsMock } from '@/entities/featureFlag';

import { deleteFeatureFlagApiUrls } from '../../model/constants/deleteFeatureFlagConstants';

export const deleteFeatureFlagMock = http.delete<{ featureFlagId: string }, null>(
	`${process.env.API_URL}${deleteFeatureFlagApiUrls.deleteFeatureFlag}`,
	({ params }) => {
		const { featureFlagId } = params;
		const foundFeatureFlag = featureFlagsMock.data.find((flag) => flag.id === featureFlagId);

		if (!foundFeatureFlag)
			return HttpResponse.json({ message: 'Feature flag not found' }, { status: 404 });

		featureFlagsMock.data = featureFlagsMock.data.filter((flag) => flag.id !== featureFlagId);
		featureFlagsMock.total = featureFlagsMock.total - 1;

		return new HttpResponse(null, { status: 200 });
	},
);
