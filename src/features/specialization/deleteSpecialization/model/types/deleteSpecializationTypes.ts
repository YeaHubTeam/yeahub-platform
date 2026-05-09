export type DeleteSpecializationError =
	| 'storage.image.url.invalid'
	| 'storage.image.not_found'
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'specialization.specialization.not_found'
	| 'specialization.specialization.constraint.foreign_key_violation'
	| 'specialization.question.constraint.foreign_key_violation'
	| 'specialization.collection.constraint.foreign_key_violation';
