export type DeleteQuestionError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.author_can_change_only_own'
	| 'question.question.not_found'
	| 'question.collection.question_in_collection';
