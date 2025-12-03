export const determineLanguage = (
	codeContent: string,
	initialLanguage: string,
	lowlight: {
		registered: (lang: string) => boolean;
		highlightAuto: (
			code: string,
			options?: { subset?: string[] },
		) => { data?: { language?: string } };
	},
): string => {
	const supportedLanguages = [
		'css',
		'javascript',
		'python',
		'html',
		'java',
		'go',
		'php',
		'ruby',
		'swift',
		'kotlin',
		'rust',
		'cpp',
		'csharp',
		'typescript',
	];

	const languageMap: { [key: string]: string } = {
		'language-js': 'javascript',
		'language-jsx': 'javascript',
		'language-ts': 'typescript',
		'language-py': 'python',
		'language-htm': 'html',
		'language-c++': 'cpp',
		'language-cs': 'csharp',
		'language-c#': 'csharp',
		'language-go': 'go',
		'language-rb': 'ruby',
		'language-swift': 'swift',
		'language-kt': 'kotlin',
		'language-rs': 'rust',
		'language-php': 'php',
		'language-java': 'java',
		'language-css': 'css',
	};

	const isJSX = /({.*})|<\s*[A-Z][\w]*\s*[^>]*>|<>/.test(codeContent);
	const isHTML = /<[a-z][^>]*>/.test(codeContent) && !isJSX;

	let language = languageMap[`language-${initialLanguage}`] || initialLanguage;

	const adapter = {
		registered: (lang: string) => lowlight.registered(lang),
		highlightAuto: (code: string, options?: { subset?: string[] }) => {
			const result = lowlight.highlightAuto(code, options);
			return { language: result.data?.language };
		},
	};

	if (isJSX) {
		language = 'javascript';
	} else if (isHTML) {
		language = 'html';
	} else if (language === 'plaintext' || !adapter.registered(language)) {
		const autoResult = adapter.highlightAuto(codeContent, {
			subset: supportedLanguages,
		});
		language = autoResult.language || 'plaintext';
	}

	return supportedLanguages.includes(language) ? language : 'plaintext';
};
