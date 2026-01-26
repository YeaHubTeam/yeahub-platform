export interface ProgrammingLanguage {
	id: number;
	name: string;
	version: string;
	monacoLangId: string;
	fileExtension: string;
	isActive: boolean;
}

export type GetLanguagesResponse = ProgrammingLanguage[];
