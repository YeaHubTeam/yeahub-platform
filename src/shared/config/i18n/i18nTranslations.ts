export enum Translation {
	LANGUAGE = 'language',
	REMOVE_SELECTED = 'remove.selected',
	CANCEL = 'cancel',
	CREATE = 'create',
	SAVE = 'save',
	SHOW = 'show',
	EDIT = 'edit',
	DELETE = 'delete',
	ACTIONS = 'actions',
	LOADING = 'loading',
	HELLO = 'hello',
	SEARCH = 'search',
	USERPREFERENCES_MYPROFILE = 'userPreferences.myProfile',
	USERPREFERENCES_LOGOUT = 'userPreferences.logout',
	SETTINGS = 'settings',
	LOGO = 'logo',
	AVATAR = 'avatar',
	CRUMBS_PROFILE = 'crumbs.profile',
	CRUMBS_PROFILE_EDITING = 'crumbs.profileEditing',
	CRUMBS_INTERVIEW = 'crumbs.interview',
	CRUMBS_INTERVIEWCREATION = 'crumbs.interviewCreation',
	CRUMBS_INTERVIEWPREPARATION = 'crumbs.interviewPreparation',
	CRUMBS_INTERVIEW_HISTORY = 'crumbs.interviewHistory',
	CRUMBS_INTERVIEW_RESULT = 'crumbs.interviewResult',
	CRUMBS_INTERVIEW_STATISTIC = 'crumbs.interviewStatistic',
	CRUMBS_QUESTIONS_LIST = 'crumbs.questionsList',
	CRUMBS_QUESTION_DETAIL = 'crumbs.questionDetail',
	CRUMBS_QUIZ = 'crumbs.quiz',
	CRUMBS_NEW_QUIZ = 'crumbs.newQuiz',
	CRUMBS_MAIN_PAGE = 'crumbs.mainPage',
	CRUMBS_ERROR_404 = 'crumbs.error404',
	CRUMBS_LOGIN = 'crumbs.login',
	CRUMBS_REGISTER = 'crumbs.register',

	INTERVIEWRESULT_TOTAL = 'interviewResult.total',
	INTERVIEWRESULT_KNOWN = 'interviewResult.known',
	INTERVIEWRESULT_UNKNOWN = 'interviewResult.unknown',
	INTERVIEWRESULT_REPEAT = 'interviewResult.repeat',

	PASSEDQUESTIONS_IKNOW = 'passedQuestions.iKnow',
	PASSEDQUESTIONS_DONTKNOW = 'passedQuestions.dontKnow',
	PASSEDQUESTIONS_REPEAT = 'passedQuestions.repeat',

	TABS_MAIN = 'tabs.main',
	TABS_PROFILE = 'tabs.profile',
	TABS_INTERVIEW = 'tabs.interview',
	TABS_SPECIALIZATION = 'tabs.specialization',

	BLOCKMODAL_CONFIRM_TITLE = 'blockModal.confirmTitle',
	BLOCKMODAL_CONFIRM_DESCRIPTION = 'blockModal.confirmDescription',
	BLOCKMODAL_ACTION_OK = 'blockModal.action.ok',
	BLOCKMODAL_ACTION_CANCEL = 'blockModal.action.cancel',

	QUESTIONS_NOTLEARNED = 'questions.notLearned',
	QUESTIONS_LEARNED = 'questions.learned',
	QUESTIONS_ALL = 'questions.all',

	FILELOADER_LINKTEXT = 'fileLoader.linkText',
	FILELOADER_TEXT = 'fileLoader.text',
	FILELOADER_FILETYPES_PHOTO = 'fileLoader.fileTypes.photo',
	FILELOADER_LIMIT = 'fileLoader.limit',

	IMAGELOADER_MINRES = 'imageLoader.minRes',
	IMAGELOADER_MAXRES = 'imageLoader.maxRes',
	IMAGELOADER_SAVE = 'imageLoader.save',
	IMAGELOADER_CHANGE = 'imageLoader.change',
	IMAGELOADER_DELETE = 'imageLoader.delete',
	IMAGELOADER_CROPPERTITLE = 'imageLoader.cropperTitle',

	VALIDATION_REQUIRED = 'validation.required',

	VALIDATION_PASSWORD_MIN = 'validation.password.min',
	VALIDATION_PASSWORD_CONFIRMATION = 'validation.passwordConfirmation',

	VALIDATION_IMAGE_FILESIZE = 'validation.image.fileSize',
	VALIDATION_IMAGE_FILETYPE = 'validation.image.fileType',

	VALIDATION_FIRSTNAME_REQUIRED = 'validation.firstName.required',
	VALIDATION_FIRSTNAME_MIN = 'validation.firstName.min',
	VALIDATION_FIRSTNAME_MAX = 'validation.firstName.max',

	VALIDATION_LASTNAME_REQUIRED = 'validation.lastName.required',
	VALIDATION_LASTNAME_MIN = 'validation.lastName.min',
	VALIDATION_LASTNAME_MAX = 'validation.lastName.max',

	VALIDATION_SPECIALIZATION_REQUIRED = 'validation.specialization.required',

	VALIDATION_PHONE_REQUIRED = 'validation.phone.required',
	VALIDATION_PHONE_FORMAT = 'validation.phone.format',

	VALIDATION_EMAIL_REQUIRED = 'validation.email.required',
	VALIDATION_EMAIL_FORMAT = 'validation.email.invalid',

	VALIDATION_LOCATION_NULLABLE = 'validation.location.nullable',

	VALIDATION_SKILLLEVEL_NULLABLE = 'validation.skillLevel.nullable',

	VALIDATION_SOCIALNETWORKS_NULLABLE = 'validation.socialNetworks.nullable',

	VALIDATION_ABOUTME_NULLABLE = 'validation.aboutMe.nullable',

	VALIDATION_SKILLS_REQUIRED = 'validation.skills.required',

	VALIDATION_CHECKBOX_REQUIRED = 'validation.checkbox.required',
	VALIDATION_CHECKBOX_ONEOF = 'validation.checkbox.oneOf',

	TOAST_QUESTIONS_LEARNED_SUCCESS = 'toast.questions.learned.success',
	TOAST_QUESTIONS_LEARNED_FAILED = 'toast.questions.learned.failed',
	TOAST_QUESTIONS_RESET_PROGRESS_SUCCESS = 'toast.questions.reset.progress.success',
	TOAST_QUESTIONS_RESET_PROGRESS_FAILED = 'toast.questions.reset.progress.failed',
	TOAST_PROFILE_UPDATE_SUCCESS = 'toast.profile.update.success',
	TOAST_PROFILE_UPDATE_FAILED = 'toast.profile.update.failed',
	TOAST_INTERVIEW_NEW_QUIZ_SUCCESS = 'toast.interview.new.quiz.success',
	TOAST_INTERVIEW_NEW_QUIZ_FAILED = 'toast.interview.new.quiz.failed',
	TOAST_INTERVIEW_FINISH_SUCCESS = 'toast.interview.finish.success',
	TOAST_INTERVIEW_FINISH_FAILED = 'toast.interview.finish.failed',

	ERROR404_IMAGE_ALT = 'error.alt',

	EMAIL_VERIFY = 'emailVerification.emailSettings',
}
export enum Profile {
	TABS_TITLE = 'tabs.title',
	TABS_ITEMS_PERSONALINFORMATION = 'tabs.items.personalInformation',
	TABS_ITEMS_ABOUTME = 'tabs.items.aboutMe',
	TABS_ITEMS_SKILLS = 'tabs.items.skills',
	TABS_ITEMS_PROJECTS = 'tabs.items.projects',
	TABS_ITEMS_EXPERIENCE = 'tabs.items.experience',
	TABS_ITEMS_EDUCATION = 'tabs.items.education',
	PROFILEPAGE_YEARS = 'profilePage.years',
	PROFILEPAGE_ABOUTME_TITLE = 'profilePage.aboutMe.title',
	PROFILEPAGE_ABOUTME_NODESCRIPTION = 'profilePage.aboutMe.noDescription',
	PROFILEPAGE_SKILLS_TITLE = 'profilePage.skills.title',
	PROFILEPAGE_SKILLS_NOSKILLS = 'profilePage.skills.noSkills',
	PROFILEPAGE_EDITBUTTON = 'profilePage.editButton',
	EDITING_TITLE = 'editingTitle',
	PHOTO_TITLE = 'photo.title',
	PHOTO_DESCRIPTION = 'photo.description',
	PHOTO_CROPPERTITLE = 'photo.cropperTitle',
	PHOTO_PREVIEW_LARGE = 'photo.largePreview',
	PHOTO_PREVIEW_SMALL = 'photo.smallPreview',
	PHOTO_CROPPERDESCRIPTION = 'photo.cropperDescription',
	PERSONALINFORMATIONFORM_TITLE = 'personalInformationForm.title',
	PERSONALINFORMATIONFORM_DESCRIPTION = 'personalInformationForm.description',
	PERSONALINFORMATIONFORM_FIRSTNAME = 'personalInformationForm.firstName',
	PERSONALINFORMATIONFORM_LASTNAME = 'personalInformationForm.lastName',
	PERSONALINFORMATIONFORM_SPECIALIZATION = 'personalInformationForm.specialization',
	PERSONALINFORMATIONFORM_CONTACTNUMBER = 'personalInformationForm.contactNumber',
	PERSONALINFORMATIONFORM_EMAIL = 'personalInformationForm.email',
	PERSONALINFORMATIONFORM_LOCATION = 'personalInformationForm.location',
	PERSONALINFORMATIONFORM_LOCATIONPLACEHOLDER = 'personalInformationForm.locationPlaceholder',
	PERSONALINFORMATIONFORM_GRADE = 'personalInformationForm.grade',
	PERSONALINFORMATIONFORM_PERSONALLINKS = 'personalInformationForm.personalLinks',
	PERSONALINFORMATIONFORM_PERSONALLINKSTEXT = 'personalInformationForm.personalLinksText',
	ABOUTMEFORM_TITLE = 'aboutMeForm.title',
	ABOUTMEFORM_DESCRIPTION = 'aboutMeForm.description',
	ABOUTMEFORM_PLACEHOLDER = 'aboutMeForm.placeholder',
	BUTTONS_EDIT = 'buttons.edit',
	BUTTONS_DELETEPHOTO = 'buttons.deletePhoto',
	BUTTONS_SAVE = 'buttons.save',
	SKILLFORM_SPECIALIZATIONSELECT = 'skillForm.specializationSelect',
	SKILLFORM_EMPTYSPECIALIZATIONSELECT = 'skillForm.emptySpecializationSelect',
	SKILLFORM_SKILLSELECT = 'skillForm.skillSelect',
	SKILLFORM_EMPTYSKILLSELECT = 'skillForm.emptySkillSelect',
	SKILLFORM_SELECTEDSKILLS = 'skillForm.selectedSkills',
	SKILLFORM_TITLE = 'skillForm.title',
	SKILLFORM_DESCRIPTION = 'skillForm.description',
	SKILLFORM_SUBMITBUTTONTEXT = 'skillForm.submitButtonText',
	SKILLFORM_IMAGE_ALT = 'skillForm.imageAlt',
	ACHIEVMENTSLIST_IMAGE_ALT = 'achievmentsList.imageAlt',
	EXPERIENCELIST_IMAGE_ALT = 'experienceList.imageAlt',
	PROJECTLIST_IMAGE_ALT = 'projectsList.imageAlt',
	PROFILE_EMAIL_VERIFICATION_TITLE = 'emailVerification.title',
	PROFILE_EMAIL_VERIFICATION_DESCRIPTION = 'emailVerification.description',
	PROFILE_EMAIL_VERIFICATION_BUTTON = 'emailVerification.buttonText',
	PROFILE_EMAIL_VERIFICATION_TEXT = 'emailVerification.verifyEmailText',
	PROFILE_EMAIL_VERIFICATION_LETTER_SENT = 'emailVerification.letterSent',
	PROFILE_EMAIL_VERIFICATION_VERIFY_SUCCESS = 'emailVerification.verifySuccess',
	PROFILE_EMAIL_VERIFICATION_VERIFY_TEXT = 'emailVerification.verifyText',
}

export enum Auth {
	LOGO_TEXT = 'logoText',
	BENEFITS_TITLE = 'benefitsTitle',
	BENEFITS_STEP_PLAN = 'benefits.stepPlan',
	BENEFITS_CAREER_GROWTH = 'benefits.careerGrowth',
	BENEFITS_BIG_COMMUNITY = 'benefits.bigCommunity',
	BENEFITS_MENTOR_TRAINING = 'benefits.mentorTraining',
	BENEFITS_INTERNSHIP_OPPORTUNITIES = 'benefits.internshipOpportunities',
	LOGIN_TITLE = 'login.title',
	LOGIN_EMAIL = 'login.email',
	LOGIN_EMAIL_PLACEHOLDER = 'login.emailPlaceholder',
	LOGIN_PASSWORD = 'login.password',
	LOGIN_PASSWORD_PLACEHOLDER = 'login.passwordPlaceholder',
	LOGIN_FORGOT_PASSWORD = 'login.forgotPassword',
	LOGIN_NO_ACCOUNT = 'login.noAccount',
	LOGIN_REGISTER = 'login.register',
	REGISTRATION_TITLE = 'registration.title',
	REGISTRATION_FIRST_NAME = 'registration.firstName',
	REGISTRATION_FIRST_NAME_PLACEHOLDER = 'registration.firstNamePlaceholder',
	REGISTRATION_LAST_NAME = 'registration.lastName',
	REGISTRATION_LAST_NAME_PLACEHOLDER = 'registration.lastNamePlaceholder',
	REGISTRATION_PHONE = 'registration.phone',
	REGISTRATION_PHONE_PLACEHOLDER = 'registration.phonePlaceholder',
	REGISTRATION_EMAIL = 'registration.email',
	REGISTRATION_EMAIL_PLACEHOLDER = 'registration.emailPlaceholder',
	REGISTRATION_PASSWORD = 'registration.password',
	REGISTRATION_PASSWORD_PLACEHOLDER = 'registration.passwordPlaceholder',
	REGISTRATION_REPEAT_PASSWORD = 'registration.repeatPassword',
	REGISTRATION_REPEAT_PASSWORD_PLACEHOLDER = 'registration.repeatPasswordPlaceholder',
	REGISTRATION_REGISTER_BUTTON = 'registration.registerButton',
	REGISTRATION_CONSENT_TEXT = 'registration.consentText',
	REGISTRATION_HAVE_ACCOUNT = 'registration.haveAccount',
	REGISTRATION_LOGIN = 'registration.login',
	BUTTONS_LOGIN = 'buttons.login',
	BUTTONS_LOGOUT = 'buttons.logout',
}

export enum Specialization {
	SKILLFORM_SPECIALIZATIONSELECT = 'skillForm.specializationSelect',
	SKILLFORM_EMPTYSPECIALIZATIONSELECT = 'skillForm.emptySpecializationSelect',
	SPECIALIZATION_TITLE = 'specialization.title',
	SPECIALIZATION_DESCRIPTION = 'specialization.description',
	SPECIALIZATION_IMAGE_SRC = 'specialization.image.src',
	SPECIALIZATIONS_NOT_ITEMS = 'specialization.not.items',
	SPECIALIZATION_CREATE_PAGE_TITLE = 'specialization.create.page.title',
	SPECIALIZATION_EDIT_PAGE_TITLE = 'specialization.edit.page.title',
	SPECIALIZATION_IMAGE_ALT = 'specialization.image.alt',
}
export enum Interview {
	PREPARATION_TITLE = 'preparation.title',
	PREPARATION_ACTIVELINKTEXT = 'preparation.activeLinkText',
	PREPARATION_NOACTIVELINKTEXT = 'preparation.noActiveLinkText',
	PREPARATION_NOACTIVETITLE = 'preparation.noActiveTitle',
	PREPARATION_NOACTIVEDESCRIPTION = 'preparation.noActiveDescription',
	PREPARATION_PROGRESSBARTITLE = 'preparation.progressBarTitle',
	PREPARATION_STUB_TITLE = 'preparation.stubTitle',
	PREPARATION_STUB_DESCRIPTION = 'preparation.stubDescription',
	FILLPROFILE_BUTTON = 'preparation.fillProfileButton',
	STATS_TITLE = 'stats.title',
	STATS_LINKTEXT = 'stats.linkText',
	STATS_PASSED = 'stats.passed',
	STATS_SOON = 'stats.soon',
	STATS_STATSSTUDIED_ALLQUESTIONS = 'stats.statsStudied.allQuestions',
	STATS_STATSSTUDIED_NEWQUESTIONS = 'stats.statsStudied.newQuestions',
	STATS_STATSSTUDIED_INPROCESS = 'stats.statsStudied.inProcess',
	STATS_STATSSTUDIED_STUDIED = 'stats.statsStudied.studied',
	QUESTIONS_TITLE = 'questions.title',
	QUESTIONS_STUDIED = 'questions.studied',
	QUESTIONS_RATING = 'questions.rating',
	QUESTIONS_COMPLEXITY = 'questions.complexity',
	QUESTIONS_EMPTY = 'questions.empty',
	HISTORY_PREPARATION_TITLE = 'history_preparation.title',
	HISTORY_PREPARATION_LINKTEXT = 'history_preparation.linkText',
	HISTORY_PREPARATION_RESULTTEXT = 'history_preparation.resultText',
	HISTORY_PREPARATION_EMPTY = 'history_preparation.empty',
}

export enum InterviewHistoryPage {
	TITLE = 'title',
	STARTDATEINTERVIEWTITLE = 'startDateInterviewTitle',
	TOTALQUESTIONSTITLE = 'totalQuestionsTitle',
	RESULTTITLE = 'resultTitle',
}

export enum InterviewQuiz {
	PROGRESSBARTITLE = 'progressBarTitle',
	COMPLETEQUIZBUTTON = 'completeQuizButton',
	QUESTIONS_HIDEANSWER = 'hideAnswer',
}

export enum InterviewQuizResult {
	RESULTINTERVIEW_RESULTTITLE = 'resultInterview.resultTitle',
	RESULTINTERVIEW_QUESTIONTITLE = 'resultInterview.questionTitle',
	RESULTINTERVIEW_ALLPASSEDQUESTIONTITLE = 'resultInterview.allPassedQuestionTitle',
	QUESTIONSTATS_PASSED = 'questionStats.passed',
	QUESTIONSTATS_TIMESPENT = 'questionStats.timeSpent',
	QUESTIONSTATS_DATE = 'questionStats.date',
	QUESTIONSTATS_DURATION = 'questionStats.duration',
}

export enum InterviewStatistics {
	PROGRESS_TITLE = 'progress.title',
	QUESTIONSTATS_TITLE = 'questionStats.title',
	QUESTIONSTATS_ALLQUESTIONS = 'questionStats.allQuestions',
	QUESTIONSTATS_NEWQUESTIONS = 'questionStats.newQuestions',
	QUESTIONSTATS_INPROCESS = 'questionStats.inProcess',
	QUESTIONSTATS_LEARNED = 'questionStats.learnedQuestions',
	///asdasdasdas
	ATTEMPTSTATS_TITLE = 'attemptStats.title',
	ATTEMPTSTATS_BESTRESULT = 'attemptStats.bestResult',
	ATTEMPTSTATS_WORSTRESULT = 'attemptStats.worstResult',
	ATTEMPTSTATS_AVGRESULT = 'attemptStats.avgResult',
}

export enum Questions {
	TITLE = 'title',
	NAME = 'name',
	ADD_QUESTION = 'addQuestion',
	SEARCH_PLACEHOLDER = 'searchPlaceholder',
	QUESTION_KEYWORDS = 'keywords',

	CATEGORIES_TITLE = 'categories.title',
	CATEGORIES_SHOWALL = 'categories.showAll',

	COMPLEXITY_TITLE = 'complexity.title',
	COMPLEXITY_SELECT = 'complexity.select',

	RATE_TITLE = 'rate.title',
	RATE_SELECT = 'rate.select',

	STATUS_TITLE = 'status.title',
	STATUS_UNLEARNED = 'status.unlearned',
	STATUS_LEARNED = 'status.learned',
	STATUS_ALL = 'status.all',
	STATUS_SELECT = 'status.select',

	SKILLS_TITLE = 'skills.title',
	SKILLS_ADD = 'skills.addSkills',

	LONG_ANSWER_TITLE = 'longAnswer.title',
	LONG_ANSWER_ADD = 'longAnswer.add',

	SHORT_ANSWER_TITLE = 'shortAnswer.title',
	SHORT_ANSWER_ADD = 'shortAnswer.add',

	DESCRIPTION_TITLE = 'description.title',
	DESCRIPTION_ADD = 'description.add',

	SPECIALIZATION_TITLE = 'specialization.title',
	SPECIALIZATION_SELECT = 'specialization.select',
	IMAGE_ALT = 'image.alt',
}

export enum InterviewHistory {
	TITLE = 'title',
	START_DATE_INTERVIEW_TITLE = 'startDateInterviewTitle',
	TOTAL_QUESTIONS_TITLE = 'totalQuestionsTitle',
	RESULT_TITLE = 'resultTitle',
	LINK_TEXT = 'linkText',
}

export enum mainPage {
	PROFILE_FULLNESS = 'profileFullness',
	COMPLETION_PROMPT = 'completionPrompt',
	COMPLETE_PROFILE_BUTTON = 'completeProfileButton',
	UPCOMING = 'upcoming',
}

export enum Validation {
	EMAIL = 'email',
	PHONE = 'phone.format',
	PASSWORD_CONFIRMATION = 'password.confirmation',
	CHECKBOX_AGREEMENT = 'checkboxes.agreement',
	CHECKBOX_REQUIRED = 'checkboxes.required',
	REQUIRED = 'required',

	PASSWORD_MIN = 'password.min',

	IMAGE_FILE_SIZE = 'image.fileSize',
	IMAGE_FILE_TYPE = 'image.fileType',

	FIRST_NAME_REQUIRED = 'firstName.required',
	FIRST_NAME_MIN = 'firstName.min',
	FIRST_NAME_MAX = 'firstName.max',

	LAST_NAME_REQUIRED = 'lastName.required',
	LAST_NAME_MIN = 'lastName.min',
	LAST_NAME_MAX = 'lastName.max',

	SPECIALIZATION_REQUIRED = 'specialization.required',

	PHONE_REQUIRED = 'phone.required',

	EMAIL_REQUIRED = 'email.required',
	EMAIL_INVALID = 'email.invalid',

	LOCATION_NULLABLE = 'location.nullable',

	SKILL_LEVEL_NULLABLE = 'skillLevel.nullable',

	SOCIAL_NETWORKS_NULLABLE = 'socialNetworks.nullable',

	ABOUT_ME_NULLABLE = 'aboutMe.nullable',

	SKILLS_REQUIRED = 'skills.required',
}

export enum Skills {
	TITLE = 'skill.title',
	DESCRIPTION = 'skill.description',
	NOT_ITEMS = 'skill.not.items',
	EDIT_PAGE_TITLE = 'skill.edit.page.title',
	CREATE_PAGE_TITLE = 'skill.create.page.title',
	IMAGE_SRC = 'skill.image.src',
}

export enum A11y {
	BACK_BUTTON = 'buttons.backButton',
	CLOSE_SIDEBAR = 'buttons.closeSidebar',
	OPEN_SIDEBAR = 'buttons.openSidebar',
	PREV_MONTH = 'buttons.prevMonth',
	NEXT_MONTH = 'buttons.nextMonth',
	PREV_INTERVIEW_QUESTION = 'buttons.prevInterviewQuestion',
	NEXT_INTERVIEW_QUESTION = 'buttons.nextInterviewQuestion',
}

export enum Landing {
	MY_PROFILE = 'myProfile',
	LOGIN = 'login',
	REGISTER = 'register',
	QUESTIONS_TOP = 'questionsTop',
	HEADER = 'header',
	HEADER_DESCRIPTION = 'headerDescription',
	JOIN = 'join',
	PROGRESS = 'progress',
	PROGRESS_DESCRIPTION = 'progressDescription',
	KNOWLEDGE_BASE_TITLE = 'knowledgeBase.title',
	KNOWLEDGE_BASE_DESCRIPTION = 'knowledgeBase.description',
	STUDYING_PROGRESS_TITLE = 'studyingProgress.title',
	STUDYING_PROGRESS_DESCRIPTION = 'studyingProgress.description',
	CONVENIENCE_TRAINER_TITLE = 'convenienceTrainer.title',
	CONVENIENCE_TRAINER_DESCRIPTION = 'convenienceTrainer.description',
	QUESTIONS_LIST = 'questionsList',
	RATING = 'rating',
	COMPLEXITY = 'complexity',
	SLOGAN = 'slogan',
	SLOGAN_TABLET = 'sloganTablet',
	OFFER_1 = 'offer1',
	OFFER_2 = 'offer2',
	START_TRAINING = 'startTraining',
	SAMPLE_QUESTION = 'sampleQuestion',
	PLATFORM_INTERFACE_TITLE = 'platformInterfaceTitle',
	PLATFORM_INTERFACE_SUBTITLE = 'platformInterfaceSubtitle',
	PLATFORM_INTERFACE_DESCRIPTION = 'platformInterfaceDescription',
	SAMPLE_ANSWER_TABLET = 'sampleAnswerTablet',
	SAMPLE_ANSWER_DEFAULT = 'sampleAnswerDefault',
	SEARCH_INPUT_PLACEHOLDER = 'searchInputPlaceholder',
	ANSWERS_CATEGORY = 'answersCategory',
	VIEW_MORE = 'viewMore',
	COMPLEXITY_LEVEL = 'complexityLevel',
	STATUS = 'status',
	LEARNED = 'learned',
	UNLEARNED = 'unlearned',
	SAVED = 'saved',
	ALL = 'all',
	DESCRIPTION_FILTER = 'filterDescription',
	START_INTERVIEW = 'startInterview',
	INTERVIEW_MODE = 'interviewMode',
	INTERVIEW_PROGRESS = 'interviewProgress',
	VIEW_ANSWER = 'viewAnswer',
	DON_NOT_KNOW = 'donNotKnow',
	REPEAT = 'repeat',
	KNOW = 'know',
	SERVICE_ABILITY_FIRST = 'serviceAbility.first',
	SERVICE_ABILITY_SECOND = 'serviceAbility.second',
	ABILITIES_CONCLUSION = 'abilitiesConclusion',
	PROGRESS_BLOCK_TITLE = 'progressBlock.title',
	PROGRESS_BLOCK_SUBTITLE = 'progressBlock.subtitle',
	PROGRESS_BLOCK_ADVANTAGES_FIRST = 'progressBlock.advantages.first',
	PROGRESS_BLOCK_ADVANTAGES_SECOND = 'progressBlock.advantages.second',
	PROGRESS_BLOCK_INTERVIEW_STATISTICS = 'progressBlock.interviewStatistics',
	PROGRESS_BLOCK_LEARNED = 'progressBlock.learned',
	PROGRESS_BLOCK_UNLEARNED = 'progressBlock.unlearned',
	PROGRESS_BLOCK_ALL_QUESTIONS = 'progressBlock.allQuestions',
	PROGRESS_BLOCK_DIAGRAM_LABEL = 'progressBlock.diagramLabel',
	FOOTER_SLOGAN = 'footer.slogan',
	FOOTER_ABOUT = 'footer.about',
}
