export type DeleteTopicError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.author_can_change_only_own'
	| 'topic.topic.not_found'
	| 'storage.image.not_found'
	| 'storage.image.url.invalid'
	| 'topic.question.constraint.foreign_key_violation'
	| 'topic.topic.constraint.foreign_key_violation';
