import { screen } from '@testing-library/react';

import { State } from '@/shared/config';
import { renderComponent } from '@/shared/libs';

import { FeatureFlag, FeatureFlagType } from '@/entities/featureFlag';

import { WithFeature } from './WithFeature';

describe('WithFeature Component', () => {
	const featureId = 'featureId' as FeatureFlagType;
	const fallbackText = 'Fallback Content';
	const childrenText = 'Feature Content';

	const defaultProps = {
		featureId,
		fallback: <div>{fallbackText}</div>,
		children: <div>{childrenText}</div>,
	};

	const reducers = {
		featureFlag: (state = {}) => state,
		profile: (state = {}) => state,
	};

	type AppRoleName = NonNullable<
		NonNullable<State['profile']['fullProfile']>['userRoles']
	>[number]['name'];

	const userRole = 'mockUserRole' as AppRoleName;

	const createMockState = (
		featureConfig?: Partial<FeatureFlag>,
		roles: AppRoleName[] = [userRole],
	): DeepPartial<State> => ({
		featureFlag: featureConfig ? { [featureId]: featureConfig } : {},
		profile: {
			fullProfile: {
				userRoles: roles.map((name) => ({ name })),
			},
		},
	});

	it('should render fallback when feature is missing', () => {
		renderComponent(<WithFeature {...defaultProps} />, {
			reducers,
			initialState: createMockState(),
		});

		expect(screen.getByText(fallbackText)).toBeInTheDocument();
		expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
	});

	it('should render fallback when feature roles do not include user roles', () => {
		renderComponent(<WithFeature {...defaultProps} />, {
			reducers,
			initialState: createMockState({ roles: ['admin'], enabled: true }),
		});

		expect(screen.getByText(fallbackText)).toBeInTheDocument();
		expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
	});

	it('should render fallback when user does not have roles', () => {
		renderComponent(<WithFeature {...defaultProps} />, {
			reducers,
			initialState: createMockState({ roles: ['admin'], enabled: true }, []),
		});

		expect(screen.getByText(fallbackText)).toBeInTheDocument();
		expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
	});

	it('should render fallback when feature is disabled', () => {
		renderComponent(<WithFeature {...defaultProps} />, {
			reducers,
			initialState: createMockState({ roles: [userRole], enabled: false }),
		});

		expect(screen.getByText(fallbackText)).toBeInTheDocument();
		expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
	});

	it('should render nothing when feature is disabled and no fallback provided', () => {
		const { container } = renderComponent(
			<WithFeature featureId={featureId}>{childrenText}</WithFeature>,
			{
				reducers,
				initialState: createMockState({ enabled: false }),
			},
		);

		expect(container.firstChild).toBeNull();
	});

	it('should render children when feature roles are missing', () => {
		renderComponent(<WithFeature {...defaultProps} />, {
			reducers,
			initialState: createMockState({ enabled: true }),
		});

		expect(screen.getByText(childrenText)).toBeInTheDocument();
		expect(screen.queryByText(fallbackText)).not.toBeInTheDocument();
	});

	it('should render children when feature roles array is empty', () => {
		renderComponent(<WithFeature {...defaultProps} />, {
			reducers,
			initialState: createMockState({
				enabled: true,
				roles: [],
			}),
		});

		expect(screen.getByText(childrenText)).toBeInTheDocument();
		expect(screen.queryByText(fallbackText)).not.toBeInTheDocument();
	});

	it('should render children when feature is enabled and user has the required role', () => {
		renderComponent(<WithFeature {...defaultProps} />, {
			reducers,
			initialState: createMockState({ roles: [userRole], enabled: true }),
		});

		expect(screen.getByText(childrenText)).toBeInTheDocument();
		expect(screen.queryByText(fallbackText)).not.toBeInTheDocument();
	});
});
