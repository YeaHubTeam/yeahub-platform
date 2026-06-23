export type TopicEditError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.admin_or_author_required'
	| 'topic.topic.title.conflict'
	| 'topic.topic.not_found';
