export enum Translation {
	LANGUAGE = 'language',
	CREATE = 'create',
	SEARCH = 'search',
	REMOVE_SELECTED = 'remove.selected',
	LOADING = 'loading',
	SHOW = 'show',
	EDIT = 'edit',
	DELETE = 'delete',
	HELLO = 'hello',
	PROFILE = 'profile',
	SAVE = 'save',
	CANCEL = 'cancel',
	LOGO = 'logo',
	AVATAR = 'avatar',
	LOGOUT = 'logout',
	SUPPORT = 'support',
	TOTAL_QUESTIONS = 'total.questions',
	BACK_BUTTON = 'back.button',
	/* Header*/
	HEADER_MENU_CHANGE_PASSWORD = 'header.menu.password',
	/* Sidebar */
	SIDEBAR_CLOSE = 'sidebar.close',
	SIDEBAR_OPEN = 'sidebar.open',
	SIDEBAR_MENU_MAIN = 'sidebar.menu.main',
	SIDEBAR_MENU_PLATFORM = 'sidebar.menu.platform',
	SIDEBAR_MENU_ADMIN = 'sidebar.menu.admin',
	SIDEBAR_MENU_SETTINGS = 'sidebar.menu.settings',
	SIDEBAR_MENU_SPECIALIZATIONS = 'sidebar.menu.specializations',
	SIDEBAR_MENU_USERS = 'sidebar.menu.users',
	SIDEBAR_MENU_EDUCATION_TITLE = 'sidebar.menu.education.title',
	SIDEBAR_MENU_EDUCATION_INTERVIEW = 'sidebar.menu.education.interview',
	SIDEBAR_MENU_QUESTIONS = 'sidebar.menu.questions',
	SIDEBAR_MENU_SKILLS = 'sidebar.menu.skills',
	SIDEBAR_MENU_COLLECTIONS = 'sidebar.menu.collections',

	/* Stub */
	STUB_FILTER_TITLE = 'stub.filter.text',
	STUB_FILTER_SUBMIT = 'stub.filter.submit',

	/* Modal */
	MODAL_BLOCK_TITLE = 'modal.block.title',
	MODAL_BLOCK_DESCRIPTION = 'modal.block.description',
	MODAL_DELETE_TITLE = 'modal.delete.title',
	MODAL_ACTIONS_OK = 'modal.actions.ok',
	MODAL_ACTIONS_CANCEL = 'modal.actions.cancel',

	FILE_LOADER_LINK = 'file.loader.link',
	FILE_LOADER_TEXT = 'file.loader.text',
	FILE_LOADER_TYPES_PHOTO = 'file.loader.types.photo',
	FILE_LOADER_LIMIT = 'file.loader.limit',

	SETTINGS = 'settings',
	CRUMBS_PROFILE = 'crumbs.profile',
	CRUMBS_PROFILE_EDITING = 'crumbs.profile.editing',
	CRUMBS_INTERVIEW = 'crumbs.interview',
	CRUMBS_INTERVIEW_CREATION = 'crumbs.interview.creation',
	CRUMBS_INTERVIEW_PREPARATION = 'crumbs.interview.preparation',
	CRUMBS_INTERVIEW_HISTORY = 'crumbs.interview.history',
	CRUMBS_INTERVIEW_RESULT = 'crumbs.interview.result',
	CRUMBS_INTERVIEW_STATISTIC = 'crumbs.interview.statistic',
	CRUMBS_QUESTIONS_LIST = 'crumbs.questions.list',
	CRUMBS_QUESTION_DETAIL = 'crumbs.question.detail',
	CRUMBS_QUIZ = 'crumbs.quiz',

	/* Validation */
	VALIDATION_REQUIRED = 'validation.required',
	VALIDATION_EMAIL = 'validation.email',
	VALIDATION_PHONE = 'validation.phone',
	VALIDATION_LENGTH_MIN = 'validation.length.min',
	VALIDATION_LENGTH_MAX = 'validation.length.max',
	VALIDATION_PASSWORD_WEAK = 'validation.password.weak',
	VALIDATION_PASSWORD_SIMILAR = 'validation.password.similar',
	VALIDATION_PRIVACY = 'validation.privacy',
	VALIDATION_FILE_SIZE = 'validation.file.size',
	VALIDATION_FILE_TYPE = 'validation.file.type',

	/* Toast */
	TOAST_QUESTIONS_LEARNED_SUCCESS = 'toast.questions.learned.success',
	TOAST_QUESTIONS_LEARNED_FAILED = 'toast.questions.learned.failed',
	TOAST_QUESTIONS_RESET_PROGRESS_SUCCESS = 'toast.questions.reset.progress.success',
	TOAST_QUESTIONS_RESET_PROGRESS_FAILED = 'toast.questions.reset.progress.failed',
	TOAST_QUESTIONS_DELETE_SINGLE_SUCCESS = 'toast.questions.delete.single.success',
	TOAST_QUESTIONS_DELETE_SINGLE_FAILED = 'toast.questions.delete.single.failed',
	TOAST_QUESTIONS_DELETE_MULTIPLE_SUCCESS = 'toast.questions.delete.multiple.success',
	TOAST_QUESTIONS_DELETE_MULTIPLE_FAILED = 'toast.questions.delete.multiple.failed',
	TOAST_SKILLS_DELETE_SINGLE_SUCCESS = 'toast.skills.delete.single.success',
	TOAST_SKILLS_DELETE_SINGLE_FAILED = 'toast.skills.delete.single.failed',
	TOAST_SKILLS_DELETE_MULTIPLE_SUCCESS = 'toast.skills.delete.multiple.success',
	TOAST_SKILLS_DELETE_MULTIPLE_FAILED = 'toast.skills.delete.multiple.failed',
	TOAST_SPECIALIZATIONS_DELETE_SINGLE_SUCCESS = 'toast.specializations.delete.single.success',
	TOAST_SPECIALIZATIONS_DELETE_SINGLE_FAILED = 'toast.specializations.delete.single.failed',
	TOAST_SPECIALIZATIONS_DELETE_MULTIPLE_SUCCESS = 'toast.specializations.delete.multiple.success',
	TOAST_SPECIALIZATIONS_DELETE_MULTIPLE_FAILED = 'toast.specializations.delete.multiple.failed',
	TOAST_PROFILE_UPDATE_SUCCESS = 'toast.profile.update.success',
	TOAST_PROFILE_UPDATE_FAILED = 'toast.profile.update.failed',
	TOAST_QUESTION_CREATE_SUCCESS = 'toast.questions.create.success',
	TOAST_QUESTION_CREATE_FAILED = 'toast.questions.create.failed',
	TOAST_QUESTION_EDIT_SUCCESS = 'toast.questions.edit.success',
	TOAST_QUESTION_EDIT_FAILED = 'toast.questions.edit.failed',
	TOAST_COLLECTION_DELETE_SUCCESS = 'toast.collections.delete.success',
	TOAST_COLLECTION_DELETE_FAILED = 'toast.collections.delete.failed',
	TOAST_SKILL_CREATE_SUCCESS = 'toast.skills.create.success',
	TOAST_SKILL_CREATE_FAILED = 'toast.skills.create.failed',
	TOAST_SKILL_EDIT_SUCCESS = 'toast.skills.edit.success',
	TOAST_SKILL_EDIT_FAILED = 'toast.skills.edit.failed',
	TOAST_SPECIALIZATION_CREATE_SUCCESS = 'toast.specializations.create.success',
	TOAST_SPECIALIZATION_CREATE_FAILED = 'toast.specializations.create.failed',
	TOAST_SPECIALIZATION_EDIT_SUCCESS = 'toast.specializations.edit.success',
	TOAST_SPECIALIZATION_EDIT_FAILED = 'toast.specializations.edit.failed',
	TOAST_AVATAR_UPDATE_SUCCESS = 'toast.avatar.update.success',
	TOAST_AVATAR_UPDATE_FAILED = 'toast.avatar.update.failed',
	TOAST_AVATAR_CREATE_SUCCESS = 'toast.avatar.create.success',
	TOAST_AVATAR_CREATE_FAILED = 'toast.avatar.create.failed',
	TOAST_AVATAR_DELETE_SUCCESS = 'toast.avatar.delete.success',
	TOAST_AVATAR_DELETE_FAILED = 'toast.avatar.delete.failed',
	TOAST_INTERVIEW_NEW_QUIZ_SUCCESS = 'toast.interview.new.quiz.success',
	TOAST_INTERVIEW_NEW_QUIZ_FAILED = 'toast.interview.new.quiz.failed',
	TOAST_INTERVIEW_FINISH_SUCCESS = 'toast.interview.finish.success',
	TOAST_INTERVIEW_FINISH_FAILED = 'toast.interview.finish.failed',
	TOAST_SETTINGS_SEND_VERIFICATION_EMAIL_FAILED = 'toast.settings.sendVerificationEmail.failed',
	TOAST_CHANGE_PASSWORD_SUCCESS = 'toast.password.change.success',
	TOAST_CHANGE_PASSWORD_FAILED = 'toast.password.change.failed',
	TOAST_CHANGE_PASSWORD_FAILED_EMAIL = 'toast.password.change.failed.email',
	TOAST_SUCCESSFULLY_CHANGE_PASSWORD = 'toast.auth.resetPassword.success',
	TOAST_ERROR_CHANGE_PASSWORD = 'toast.auth.resetPassword.failed',
	TOAST_AUTH_LOGIN_FAILED = 'toast.auth.login.failed',
}
export enum Profile {
	EDIT_PAGE_TITLE = 'edit.page.title',
	TABS_PERSONAL = 'tabs.personal',
	TABS_ABOUT_ME = 'tabs.about.me',
	TABS_SKILLS = 'tabs.skills',
	PHOTO_TITLE = 'photo.title',
	PHOTO_DESCRIPTION = 'photo.description',
	PHOTO_UPDATE = 'photo.update',
	PHOTO_DELETE = 'photo.delete',
	PHOTO_UPDATE_FULL = 'photo.update.full',
	PHOTO_DELETE_FULL = 'photo.delete.full',
	PHOTO_MODAL_TITLE = 'photo.modal.title',
	PHOTO_MODAL_DESCRIPTION = 'photo.modal.description',
	PHOTO_MODAL_SUBMIT = 'photo.modal.submit',
	PHOTO_MODAL_CLICK_SECONDARY = 'photo.modal.click.secondary',
	PHOTO_MODAL_LARGE_PREVIEW = 'photo.modal.large.preview',
	PHOTO_MODAL_SMALL_PREVIEW = 'photo.modal.small.preview',
	PHOTO_MODAL_MIN_RES = 'photo.modal.min.res',
	PHOTO_MODAL_MAX_RES = 'photo.modal.max.res',
	PERSONAL_TITLE = 'personal.title',
	PERSONAL_DESCRIPTION = 'personal.description',
	LINKS_TITLE = 'links.title',
	LINKS_DESCRIPTION = 'links.description',
	ABOUT_ME_TITLE = 'about.me.title',
	ABOUT_ME_DESCRIPTION = 'about.me.description',
	ABOUT_ME_EMPTY = 'about.me.empty',
	SKILLS_TITLE = 'skills.title',
	SKILLS_DESCRIPTION = 'skills.description',
	SKILLS_EMPTY = 'skills.empty',
	FORM_FIRSTNAME = 'form.firstname',
	FORM_LASTNAME = 'form.lastname',
	FORM_SPECIALIZATION = 'form.specialization',
	FORM_PHONE = 'form.phone',
	FORM_EMAIL = 'form.email',
	FORM_LOCATION = 'form.location',
	FORM_SKILLS = 'form.skills',
	SETTINGS_TABS_SELECT_TARIFF = 'settings.tabs.select.tariff',
	SETTINGS_TABS_CHANGE_PASSWORD = 'settings.tabs.change.password',
	SETTINGS_TABS_VERIFY_EMAIL = 'settings.tabs.verify.email',
	EMAIL_VERIFICATION_TITLE = 'email.verification.title',
	EMAIL_VERIFICATION_DESCRIPTION = 'email.verification.description',
	EMAIL_VERIFICATION_EMAIL = 'email.verification.email',
	EMAIL_VERIFICATION_SUBMIT = 'email.verification.submit',
	EMAIL_VERIFICATION_SENT_SUCCESS = 'email.verification.sent.success',
	EMAIL_VERIFICATION_VERIFY_STUB_TITLE = 'email.verification.verify.stub.title',
	EMAIL_VERIFICATION_VERIFY_STUB_DESCRIPTION = 'email.verification.verify.stub.description',
	EMAIL_VERIFICATION_VERIFY_STUB_LINK = 'email.verification.verify.stub.link',
	EMAIL_VERIFICATION_SUCCESS_VERIFY_STUB_TITLE = 'email.verification.success.verify.stub.title',
	EMAIL_VERIFICATION_SUCCESS_VERIFY_STUB_DESCRIPTION = 'email.verification.success.verify.stub.description',
	CHANGE_PASSWORD_TITLE = 'change.password.title',
	CHANGE_PASSWORD_DESCRIPTION = 'change.password.description',
	CHANGE_PASSWORD_LABEL = 'change.password.label',
	CHANGE_PASSWORD_REPEAT_LABEL = 'change.password.repeat.label',
	CHANGE_PASSWORD_PLACEHOLDER = 'change.password.placeholder',
}

export enum Auth {
	LOGO_TEXT = 'logo.text',
	LOGOUT = 'logout',
	BENEFITS_TITLE = 'benefits.title',
	BENEFITS_STEP_PLAN = 'benefits.step.plan',
	BENEFITS_CAREER_GROWTH = 'benefits.career.growth',
	BENEFITS_BIG_COMMUNITY = 'benefits.big.community',
	BENEFITS_MENTOR_TRAINING = 'benefits.mentor.training',
	BENEFITS_INTERNSHIP_OPPORTUNITIES = 'benefits.internship.opportunities',
	LOGIN_HELLO = 'login.hello',
	LOGIN_TITLE = 'login.title',
	LOGIN_NO_ACCOUNT = 'login.no.account',
	LOGIN_FORGOT_PASSWORD_LINK = 'login.forgot.password.link',
	LOGIN_REGISTER_LINK = 'login.register.link',
	LOGIN_SUBMIT = 'login.submit',
	REGISTRATION_TITLE = 'registration.title',
	REGISTRATION_SUBMIT = 'registration.submit',
	REGISTRATION_PRIVACY_TITLE = 'registration.privacy.title',
	REGISTRATION_PRIVACY_POLICY = 'registration.privacy.policy',
	REGISTRATION_PRIVACY_OFFER_AGREEMENT = 'registration.privacy.offer.agreement',
	REGISTRATION_PRIVACY_ADD_CONSENT = 'registration.privacy.add.consent',
	REGISTRATION_HAVE_ACCOUNT = 'registration.have.account',
	REGISTRATION_LOGIN_LINK = 'registration.login.link',
	FORM_EMAIL_LABEL = 'form.email.label',
	FORM_EMAIL_PLACEHOLDER = 'form.email.placeholder',
	FORM_PASSWORD_LABEL = 'form.password.label',
	FORM_PASSWORD_PLACEHOLDER = 'form.password.placeholder',
	FORM_PASSWORD_REPEAT_LABEL = 'form.password.repeat.label',
	FORM_PASSWORD_NEW_LABEL = 'form.password.new.label',
	FORM_PASSWORD_NEW_REPEAT_LABEL = 'form.password.new.repeat.label',
	FORM_FIRSTNAME_LABEL = 'form.firstname.label',
	FORM_FIRSTNAME_PLACEHOLDER = 'form.firstname.placeholder',
	FORM_LASTNAME_LABEL = 'form.lastname.label',
	FORM_LASTNAME_PLACEHOLDER = 'form.lastname.placeholder',
	FORGOT_PASSWORD_TITLE = 'forgot.password.title',
	FORGOT_PASSWORD_SUBTITLE = 'forgot.password.subtitle',
	FORGOT_PASSWORD_SUBMIT = 'forgot.password.submit',
	FORGOT_PASSWORD_MODAL_TITLE = 'forgot.password.modal.title',
	FORGOT_PASSWORD_MODAL_SUBTITLE = 'forgot.password.modal.subtitle',
	FORGOT_PASSWORD_MODAL_SUBMIT = 'forgot.password.modal.submit',
	PASSWORD_RECOVERY_TITLE = 'password.recovery.title',
	PASSWORD_RECOVERY_SUBTITLE = 'password.recovery.subtitle',
	PASSWORD_RECOVERY_SUBMIT = 'passwordRecovery.submit',
}

export enum Specializations {
	TITLE_FULL = 'title.full',
	TITLE_SHORT = 'title.short',
	TITLE_LABEL = 'title.label',
	DESCRIPTION_FULL = 'description.full',
	DESCRIPTION_SHORT = 'description.short',
	DESCRIPTION_LABEL = 'description.label',
	DESCRIPTION_PLACEHOLDER = 'description.placeholder',
	EMPTY = 'empty',
	IMAGE_SRC = 'image.src',
	IMAGE_ALT = 'image.alt',
	CREATE_PAGE_TITLE = 'create.page.title',
	EDIT_PAGE_TITLE = 'edit.page.title',
	STUB_EMPTY_TITLE = 'stub.empty.title',
	STUB_EMPTY_DESCRIPTION = 'stub.empty.description',
	SELECT_CHOOSE = 'select.choose',
	SELECT_EMPTY = 'select.empty',
	SELECT_SELECTED = 'select.selected',
}

export enum InterviewQuiz {
	TITLE = 'title',
	PREVIEW_TITLE = 'preview.title',
	CONTINUE_QUIZ = 'continue.quiz',
	PROGRESS_BAR_TITLE = 'progress.bar.title',
	START_QUIZ_TITLE = 'start.quiz.title',
	START_QUIZ_DESCRIPTION = 'start.quiz.description',
	START_QUIZ_LINK = 'start.quiz.link',
	COMPLETE = 'complete',
	NEXT = 'next',
	A11Y_NEXT = 'a11y.next',
	A11Y_PREV = 'a11y.prev',
	ANSWER_SHOW = 'answer.show',
	ANSWER_HIDE = 'answer.hide',
	ANSWER_DO_NOT_KNOW = 'answer.do.not.know',
	ANSWER_KNOW = 'answer.know',
}

export enum InterviewQuizResult {
	TITLE_QUESTIONS_ANSWERS = 'title.questions.answers',
	TITLE_STAT = 'title.stat',
	TITLE_QUESTIONS_LIST = 'title.questions.list',
	PASSED_QUESTION = 'passed.question',
	TIME = 'time',
	DATE = 'date',
	DURATION = 'duration',
}

export enum InterviewStatistics {
	PROGRESS_TITLE = 'progress.title',
	PASSED = 'passed',
	SOON = 'soon',
	LINK = 'link',
	QUESTION_STATS_TITLE = 'question.stats.title',
	QUESTION_STATS_TITLE_SHORT = 'question.stats.title.short',
	QUESTION_STATS_ALL = 'question.stats.all',
	QUESTION_STATS_NEW = 'question.stats.new',
	QUESTION_STATS_IN_PROCESS = 'question.stats.in.process',
	QUESTION_STATS_LEARNED = 'question.stats.learned',
	ATTEMPT_STATS_TITLE = 'attempt.stats.title',
	ATTEMPT_STATS_BEST = 'attempt.stats.best.default',
	ATTEMPT_STATS_WORST = 'attempt.stats.worst.default',
	ATTEMPT_STATS_AVG = 'attempt.stats.avg.default',
	ATTEMPT_STATS_BEST_MOBILE = 'attempt.stats.best.mobile',
	ATTEMPT_STATS_WORST_MOBILE = 'attempt.stats.worst.mobile',
	ATTEMPT_STATS_AVG_MOBILE = 'attempt.stats.avg.mobile',
}

export enum Questions {
	COUNT = 'count',
	PREVIEW_TITLE = 'preview.title',
	PREVIEW_LINK = 'preview.link',
	PREVIEW_EMPTY = 'preview.empty',

	TITLE_SHORT = 'title.short',
	TITLE_LABEL = 'title.label',
	TITLE_PLACEHOLDER = 'title.placeholder',

	DESCRIPTION_TITLE = 'description.title',
	DESCRIPTION_LABEL = 'description.label',
	DESCRIPTION_PLACEHOLDER = 'description.placeholder',
	SEARCH_PLACEHOLDER = 'search.placeholder',
	CATEGORIES_TITLE = 'categories.title',
	CATEGORIES_SHOW_ALL = 'categories.show.all',
	CATEGORIES_HIDE = 'categories.hide',
	COMPLEXITY_TITLE = 'complexity.title',
	COMPLEXITY_TITLE_SHORT = 'complexity.title.short',
	COMPLEXITY_LABEL = 'complexity.label',
	RATE_TITLE = 'rate.title',
	RATE_TITLE_SHORT = 'rate.title.short',
	RATE_LABEL = 'rate.label',
	SORT_FIELD = 'sort.field',
	SORT_TITLE = 'sort.title',
	SORT_ASCENDING = 'sort.ascending',
	SORT_DESCENDING = 'sort.descending',
	STATUS_TITLE = 'status.title',
	STATUS_UNLEARNED = 'status.unlearned',
	STATUS_LEARNED = 'status.learned',
	STATUS_ALL = 'status.all',
	STATUS_LABEL = 'status.label',
	STATUS_PUBLIC = 'status.public',
	STATUS_DRAFT = 'status.draft',
	SKILLS_TITLE = 'skills.title',
	SKILLS_LABEL = 'skills.label',
	LONG_ANSWER_TITLE = 'long.answer.title',
	LONG_ANSWER_LABEL = 'long.answer.label',
	LONG_ANSWER_PLACEHOLDER = 'long.answer.placeholder',

	SHORT_ANSWER_TITLE = 'short.answer.title',
	SHORT_ANSWER_LABEL = 'short.answer.label',
	SHORT_ANSWER_PLACEHOLDER = 'short.answer.placeholder',
	SPECIALIZATION_TITLE = 'specialization.title',
	SPECIALIZATION_LABEL = 'specialization.label',
	KEYWORDS_TITLE = 'keywords.title',
	KEYWORDS_LABEL = 'keywords.label',
	IMAGE_ALT = 'image.alt',
	MORE = 'more',
	LEARN = 'learn',
	REPEAT = 'repeat',

	ADDITIONAL_INFO_LEVEL = 'level',
	ADDITIONAL_INFO_SKILLS = 'skillsAdditional',
	ADDITIONAL_INFO_KEYWORDS = 'keywordsAdditional',
}

export enum InterviewHistory {
	TITLE = 'title',
	QUIZ_TITLE = 'quiz.title',
	START_DATE = 'start.date',
	TOTAL_QUESTIONS = 'total.questions',
	RESULT = 'result',
	LINK = 'link',
	EMPTY = 'empty',
	UNVERIFIED = 'unverified',
	PREV_MONTH = 'prev.month',
	NEXT_MONTH = 'next.month',
}

export enum Main {
	FILL_PROFILE_TITLE = 'fill.profile.title',
	FILL_PROFILE_DESCRIPTION = 'fill.profile.description',
	FILL_PROFILE_LINK = 'fill.profile.link',
	SUBSCRIBE_MEDIA_TITLE = 'subscribe.media.title',
	SUBSCRIBE_MEDIA_DESCRIPTION = 'subscribe.media.description',
	SUBSCRIBE_MEDIA_YEAHUB_TITLE = 'subscribe.media.yeahub.title',
	SUBSCRIBE_MEDIA_YEAHUB_DESCRIPTION = 'subscribe.media.yeahub.description',
	SUBSCRIBE_MEDIA_YEAHUB_COMMUNITY_TITLE = 'subscribe.media.community.yeahub.title',
	SUBSCRIBE_MEDIA_YEAHUB_COMMUNITY_DESCRIPTION = 'subscribe.media.community.yeahub.description',
}

export enum Skills {
	TITLE_FULL = 'title.full',
	TITLE_SHORT = 'title.short',
	TITLE_LABEL = 'title.label',
	DESCRIPTION_FULL = 'description.full',
	DESCRIPTION_SHORT = 'description.short',
	DESCRIPTION_LABEL = 'description.label',
	DESCRIPTION_PLACEHOLDER = 'description.placeholder',
	ICON_TITLE = 'icon.title',
	ICON_LABEL = 'icon.label',
	SELECT_CHOOSE = 'select.choose',
	SELECT_EMPTY = 'select.empty',
	SELECT_SELECTED = 'select.selected',
	EMPTY = 'empty',
	IMAGE_SRC = 'image.src',
	CREATE_PAGE_TITLE = 'create.page.title',
	EDIT_PAGE_TITLE = 'edit.page.title',
}

export enum User {
	NAME = 'name',
	ROLE = 'role',
	EMAIL = 'email',
	GUEST = 'roles.guest',
	CANDIDATE = 'roles.candidate',
	CANDIDATE_FREE = 'roles.candidate.free',
	CANDIDATE_PREMIUM = 'roles.candidate.premium',
	HR = 'roles.HR',
	ADMIN = 'roles.admin',
	MEMBER = 'roles.member',
	USER_NAME = 'user.name',
	FULL_NAME = 'full.name',
	AVATAR = 'avatar',
	SELECT_ROLE_TITLE = 'select.role.title',
	SELECT_ROLE_LABEL = 'select.role.label',
	CONFIRM_EMAIL_TITLE = 'confirm.email.title',
	CONFIRM_EMAIL_LABEL = 'confirm.email.label',
	CONFIRM_EMAIL_CONFIRM = 'confirm.email.confirm',
	CONFIRM_EMAIL_UNCONFIRM = 'confirm.email.unconfirm',
	ADDRESS = 'address',
	BIRTH_DATE = 'birth.date',
	REGISTRATION_DATE = 'registration.date',
	SELECT_CHOOSE = 'select.shoose',
	FILTER_ROLE = 'filter.role',
	FILTER_EMAIL = 'filter.email',
	EDIT_SUCCESS = 'edit.success',
	EDIT_ERROR = 'edit.error',
}

export enum Collections {
	TITLE_FULL = 'title.full',
	TITLE_SHORT = 'title.short',
	TITLE_LABEL = 'title.label',
	DESCRIPTION_FULL = 'description.full',
	DESCRIPTION_SHORT = 'description.short',
	DESCRIPTION_LABEL = 'description.label',
	DESCRIPTION_PLACEHOLDER = 'description.placeholder',
	ICON_TITLE = 'icon.title',
	ICON_TITLE_SHORT = 'icon.title-short',
	ICON_LABEL = 'icon.label',
	TARIFF_CHOOSE = 'tariff.chooseCollections',
	TARIFF_LABEL = 'tariff.label',
	TARIFF_PAID = 'tariff.paid',
	TARIFF_FREE = 'tariff.free',
	SELECT_SELECTED = 'select.selected',
	EMPTY = 'empty',
	IMAGE_SRC = 'image.src',
	CREATE_PAGE_TITLE = 'create.page.title',
	EDIT_PAGE_TITLE = 'edit.page.title',
	ADDITIONAL_INFO_ACCESS = 'access',
	QUESTIONS_SHORT = 'questions.short',
	QUESTIONS_LABEL = 'questions.label',
	QUESTIONS_SELECTED = 'questions.selected',
	SPECIALIZATION_TITLE = 'specialization.title',
	SPECIALIZATION_LABEL = 'specialization.label',
	KEYWORDS_TITLE = 'keywords.title',
	KEYWORDS_LABEL = 'keywords.label',
}

export enum Landing {
	LOGIN = 'header.actions.login',
	REGISTER = 'header.actions.register',
	HEADER_LINKS_QUESTIONS_LIST = 'header.links.questions.list',
	QUESTIONS_FIRST = 'questions.first',
	QUESTIONS_SECOND_TITLE = 'questions.second.title',
	QUESTIONS_SECOND_ANSWER = 'questions.second.answer',
	QUESTIONS_THIRD = 'questions.third',
	QUESTIONS_FOURTH = 'questions.fourth',
	MAIN_TITLE_MOBILE = 'main.title.mobile',
	MAIN_TITLE_TABLET = 'main.title.tablet',
	MAIN_TITLE_DESKTOP = 'main.title.desktop',
	MAIN_SUBTITLE = 'main.subtitle',
	MAIN_LINK = 'main.link',
	MAIN_BADGE = 'main.badge',
	MAIN_ADVANTAGES_FIRST_TITLE = 'main.advantages.first.title',
	MAIN_ADVANTAGES_FIRST_DESCRIPTION = 'main.advantages.first.description',
	MAIN_ADVANTAGES_SECOND_TITLE = 'main.advantages.second.title',
	MAIN_ADVANTAGES_SECOND_DESCRIPTION = 'main.advantages.second.description',
	MAIN_ADVANTAGES_THIRD_TITLE = 'main.advantages.third.title',
	MAIN_ADVANTAGES_THIRD_DESCRIPTION = 'main.advantages.third.description',
	MAIN_PROGRESS_TITLE = 'main.progress.title',
	MAIN_PROGRESS_DESCRIPTION = 'main.progress.description',
	TRAINING_TITLE = 'training.title',
	TRAINING_SUBTITLE = 'training.subtitle',
	TRAINING_SUBTITLE_TABLET = 'training.subtitle.tablet',
	TRAINING_ADVANTAGES_FIRST = 'training.advantages.first',
	TRAINING_ADVANTAGES_SECOND = 'training.advantages.second',
	TRAINING_LINK = 'training.link',
	READY_INTERVIEW_TITLE = 'ready.interview.title',
	READY_INTERVIEW_SUBTITLE = 'ready.interview.subtitle',
	READY_INTERVIEW_ADVANTAGES_FIRST = 'ready.interview.advantages.first',
	READY_INTERVIEW_ADVANTAGES_SECOND = 'ready.interview.advantages.second',
	INTERVIEW_TITLE = 'interview.title',
	INTERVIEW_SUBTITLE = 'interview.subtitle',
	INTERVIEW_ADVANTAGES_FIRST = 'interview.advantages.first',
	INTERVIEW_ADVANTAGES_SECOND = 'interview.advantages.second',
	PROGRESS_TITLE = 'progress.title',
	PROGRESS_SUBTITLE = 'progress.subtitle',
	PROGRESS_ADVANTAGES_FIRST = 'progress.advantages.first',
	PROGRESS_ADVANTAGES_SECOND = 'progress.advantages.second',
	COOKIES_TEXT = 'cookies.text',
	COOKIES_LINK = 'cookies.link',
	COOKIES_AGREE = 'cookies.agree.button',
	FOOTER_SLOGAN = 'footer.slogan',
	FOOTER_ABOUT = 'footer.about',
	FOOTER_DOCS = 'footer.docs',
}

export enum Subscription {
	SUBSCRIBE_ACTION = 'subscribeAction',
	CHANGE_TARIFF_PLAN = 'changeTariffPlan',
	CANCEL_SUBSCRIPTION = 'cancelSubscription',
	PAY_HISTORY = 'payHistory',
	TARIFF_FREE = 'tariff.free',
	TARIFF_BASE = 'tariff.base',
	TARIFF_PREMIUM = 'tariff.premium',
	DAYS_LEFT = 'daysLeft',
	SUBSCRIPTION_GREETING = 'greeting',
	SUBSCRIPTION_RENEWAL = 'renewal',
}

export enum SubscriptionCard {
	SUBSCRIPTION_CARD_FREE = 'subscription.free',
	SUBSCRIPTION_CARD_PRICE = 'subscription.price',
}

export enum Docs {
	LINK = 'link',
	DOC1 = 'doc1',
	DOC2 = 'doc2',
	DOC3 = 'doc3',
	DOC4 = 'doc4',
	DOC5 = 'doc5',
	DOC6 = 'doc6',
}

export enum InterviewQuizCreate {
	TITLE = 'title',
	CREATE_BUTTON = 'create.button',
	MODE_REPEAT = 'mode.repeat',
	MODE_NEW = 'mode.new',
	MODE_RANDOM = 'mode.random',
	MODE_SELECT = 'mode.select',
}
