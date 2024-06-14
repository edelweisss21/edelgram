import { User } from 'firebase/auth';

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
	userLikes: string[];
	userId: string | null;
	username?: string;
	photoURL?: string;
	date: Date;
}

export interface IDocumentResponse extends IPost {
	id?: string;
}

export type TLikes = {
	likes: number;
	isLike: boolean;
};

export interface IProfileInfo {
	user?: User;
	displayName?: string;
	photoURL?: string;
}

export interface IUserProfile
	extends Pick<IProfileInfo, 'displayName' | 'photoURL'> {
	userId?: string;
	userBio?: string;
}

export interface IProfileResponse extends IUserProfile {
	id?: string;
}
