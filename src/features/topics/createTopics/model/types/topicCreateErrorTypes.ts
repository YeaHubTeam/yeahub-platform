export type TopicCreateError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'topic.skill.not_found'
	| 'topic.topic.title.conflict'
	| 'tinify.tinify.compress_failed'
	| 'tinify.tinify.resize_failed'
	| 'toast.topics.create.failed';
