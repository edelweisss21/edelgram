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
