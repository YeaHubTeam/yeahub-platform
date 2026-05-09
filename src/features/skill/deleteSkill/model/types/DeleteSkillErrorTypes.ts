export type DeleteSkillError =
	| 'storage.image.url.invalid'
	| 'storage.image.not_found'
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'skill.skill.not_found'
	| 'skill.skill.constraint.foreign_key_violation'
	| 'skill.specialization.constraint.foreign_key_violation'
	| 'skill.question.constraint.foreign_key_violation'
	| 'skill.profile.constraint.foreign_key_violation';
