import home from './assets/icons/home.svg';
import addphotos from './assets/icons/addphotos.svg';
import myphotos from './assets/icons/myphotos.svg';
import profile from './assets/icons/profile.svg';
import notifications from './assets/icons/notifications.svg';
import direct from './assets/icons/direct.svg';
import settings from './assets/icons/settings.svg';
import { INavLink } from './types/types';

export const navLinks: INavLink[] = [
	{
		name: 'Home',
		link: '/edelgram/',
		icon: home,
	},
	{
		name: 'Add photos',
		link: '/edelgram/createpost',
		icon: addphotos,
	},
	{
		name: 'My photos',
		link: '/edelgram/myphotos',
		icon: myphotos,
	},
	{
		name: 'Profile',
		link: '/edelgram/profile',
		icon: profile,
	},
	{
		name: 'Notifications',
		link: '#',
		icon: notifications,
	},
	{
		name: 'Direct',
		link: '#',
		icon: direct,
	},
	{
		name: 'Settings',
		link: '#',
		icon: settings,
	},
];
