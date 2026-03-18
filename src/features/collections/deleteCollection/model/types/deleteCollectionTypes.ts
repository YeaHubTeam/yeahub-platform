export type DeleteCollectionError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.author_can_change_only_own'
	| 'collection.collection.not_found'
	| 'storage.image.not_found'
	| 'storage.image.url.invalid'
	| 'collection.collection.constraint.foreign_key_violation';
