export type DeleteFeatureFlagError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'feature-flag.feature-flag.not_found';
