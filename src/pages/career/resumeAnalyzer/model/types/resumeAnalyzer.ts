export interface ResumeAnalyzerPageState {
	data: ResumeAnalyzeByPortraitResponse | null;
	fileName: string;
	uploadedAt: string | null;
}

export interface ResumeSkill {
	skill: string;
	found: boolean;
	context: string;
}

export interface ResumeAtsScore {
	total: number;
	skillsMatch: number;
	experienceQuality: number;
	keywordsDensity: number;
}

export interface Resume {
	fullName: string;
	currentPosition: string;
	experienceYears: number;
	topSkillsMatch: ResumeSkill[];
	atsScore: ResumeAtsScore;
	recommendations: string[];
	verdict: string;
}

export interface ResumeAnalyzeByPortraitBodyRequest {
	specializationId: number;
	file: FormData;
}

// ResumeAnalyzeByPortraitResponse
interface Overall {
	score: number;
	label: string;
}

export interface Keyword {
	title: string;
	percent: number;
}

export interface Keywords {
	coveragePercent: number;
	matchedKeywords: Keyword[];
	missingKeywords: Keyword[];
	criticalKeywords: Keyword[];
	optionalKeywords: Keyword[];
	totalVacancyKeywords: number;
	totalMatched: number;
	recommendations: string[];
}

interface Skill {
	title: string;
	percent: number;
}

interface Skills {
	coveragePercent: number;
	matchedSkills: Skill[];
	missingSkills: Skill[];
	totalSkills: number;
	totalMatched: number;
}

interface MatchedTask {
	title: string;
	evidence: string;
	matchType: string;
	score: number;
}

interface Tasks {
	matchedTasks: MatchedTask[];
	recommendations: string[];
	coveragePercent: number;
	missingTasks: string[];
}

interface ExtraSignal {
	title: string;
	evidence: string;
}

interface Achievement {
	text: string;
	comment: string;
}

interface Profile {
	projectScopeSignals: string[];
	missingProjectElements: string[];
	hasStackSection: boolean;
	matchedExtraSignals: ExtraSignal[];
	missingExtraSignals: ExtraSignal[];
	weaklySupportedSignals: ExtraSignal[];
	presentSections: string[];
	missingSections: string[];
	recommendations: string[];
	quantifiedAchievementsPercent: number;
	quantifiedAchievements: Achievement[];
	unquantifiedAchievements: Achievement[];
	totalAchievements: number;
	extraMatchPercent: number;
	coveredExtraCount: number;
	totalExtraCount: number;
	profileQualityScore: number;
	hasProjectScope: boolean;
	hasStructuredResume: boolean;
}

export interface ResumeAnalyzeByPortraitResponse {
	overall: Overall;
	analyzedVacancyCount: number;
	skillsVacancyCount: number;
	keywords: Keywords;
	skills: Skills;
	tasks: Tasks;
	profile: Profile;
}

export interface StoredResumeAnalysis {
	response: ResumeAnalyzeByPortraitResponse;
	analyzedAt: string;
}
