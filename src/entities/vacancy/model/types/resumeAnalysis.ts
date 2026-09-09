export type Overall = {
	score: number;
	label: string;
};

export type PercentItem = {
	title: string;
	percent: number;
};

export type Keywords = {
	coveragePercent: number;
	matchedKeywords: PercentItem[];
	missingKeywords: PercentItem[];
	criticalKeywords: PercentItem[];
	optionalKeywords: PercentItem[];
	totalVacancyKeywords: number;
	totalMatched: number;
	recommendations: string[];
};

export type Tasks = {
	matchedTasks: EvidenceItem[];
	recommendations: string[];
	missingTasks: EvidenceItem[];
	coveragePercent: number;
};

export type EvidenceItem = {
	title: string;
	evidence: string;
};

export type CommentItem = {
	text: string;
	comment: string;
};

export type ProfileExternal = {
	hasProjectScope: boolean;
	projectScopeSignals: string[];
	missingProjectElements: string[];
	hasStackSection: boolean;
	matchedExtraSignals: EvidenceItem[];
	missingExtraSignals: EvidenceItem[];
	weaklySupportedSignals: EvidenceItem[];
	hasStructuredResume: boolean;
	presentSections: string[];
	missingSections: string[];
	recommendations: string[];
	quantifiedAchievements: CommentItem[];
	unquantifiedAchievements: CommentItem[];
	totalAchievements: number;
	quantifiedAchievementsPercent: number;
	coveredExtraCount: number;
	totalExtraCount: number;
	extraMatchPercent: number;
	profileQualityScore: number;
};

export type Profile = Omit<
	ProfileExternal,
	| 'projectScopeSignals'
	| 'missingProjectElements'
	| 'presentSections'
	| 'missingSections'
	| 'quantifiedAchievements'
	| 'unquantifiedAchievements'
> & {
	projectScopeSignals: EvidenceItem[];
	missingProjectElements: EvidenceItem[];
	presentSections: EvidenceItem[];
	missingSections: EvidenceItem[];
	quantifiedAchievements: EvidenceItem[];
	unquantifiedAchievements: EvidenceItem[];
};

export type Skills = {
	matchedSkills: PercentItem[];
	missingSkills: PercentItem[];
	coveragePercent: number;
	totalMatched: number;
	totalSkills: number;
};

export type ResumeAnalysis = {
	overall: Overall;
	keywords: Keywords;
	tasks: Tasks;
	profile: Profile;
	skills: Skills;
	analyzedVacancyCount: number;
	skillsVacancyCount: number;
};
