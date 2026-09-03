export type TopicEditError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.author_can_change_only_own'
	| 'topic.topic.title.conflict'
	| 'topic.topic.not_found'
	| 'tinify.tinify.compress_failed'
	| 'tinify.tinify.resize_failed';
