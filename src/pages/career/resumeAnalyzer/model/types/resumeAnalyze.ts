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

export interface ResumeAnalyzeBodyRequest {
	specializationId: number;
	file: FormData;
}

export type ResumeAnalyzeResponse = Resume;
