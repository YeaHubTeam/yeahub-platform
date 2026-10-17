export type DeleteTestQuestionError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.author_can_change_only_own'
	| 'test_question.test_question.not_found'
	| 'test_question.collection.question_in_collection';
