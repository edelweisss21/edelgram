import { OutputFileEntry } from './../../node_modules/@uploadcare/blocks/types/exported.d';
export interface IUserSignUp {
	email: string;
	password: string;
	confirmPassword: string;
}

export interface IUserLogIn {
	email: string;
	password: string;
}

export interface INavLink {
	name: string;
	link: string;
	icon: string;
}

export type TPhotoMeta = {
	cdnUrl: string | null;
	uuid: string | null;
};

export type TFileEntry = {
	files: TPhotoMeta[];
};

export interface IPost {
	caption: string;
	photos: TPhotoMeta[];
	likes: number;
	userLikes: [];
	userId: string | null;
	date: Date;
}
