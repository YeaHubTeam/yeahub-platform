// REFACTOR IN FUTURE - WHEN WE GET EXTENSIONS
export enum Accept {
	IMAGE = 'image/*, .png, .jpg, .jpeg ',
	MS_WORD = '.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export enum Extension {
	IMAGE = 'JPG,PNG,JPEG',
	MS_WORD = 'PDF,DOC,DOCX,XML',
}

export type FileType = 'фотографию' | 'документ' | 'файл';