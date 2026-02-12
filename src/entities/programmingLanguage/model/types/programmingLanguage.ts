export type ProgrammingLanguageCode = 'cpp' | 'go' | 'java' | 'javascript' | 'python' | 'ruby';

export interface ProgrammingLanguage {
	id: number;
	name: string;
	version: string;
	monacoLangId: ProgrammingLanguageCode;
	fileExtension: string;
	isActive: boolean;
	imageSrc: string;
}

export type GetLanguagesResponse = ProgrammingLanguage[];
