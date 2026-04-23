export type deleteCompanyError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'storage.image.url.invalid'
	| 'storage.image.not_found'
	| 'company.company.not_found'
	| 'company.collection.constraint.foreign_key_violation'
	| 'company.company.constraint.foreign_key_violation';
