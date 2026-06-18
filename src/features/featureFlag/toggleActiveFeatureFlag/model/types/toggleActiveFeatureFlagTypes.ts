export type ToggleActiveFeatureFlagError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'feature-flag.feature-flag.not_found'
	| 'feature-flag.feature-flag.already_exists';
