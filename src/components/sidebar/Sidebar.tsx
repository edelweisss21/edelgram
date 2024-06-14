import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { navLinks } from '@/navLinks';
import { useUserAuth } from '@/hooks/useUserAuth';
import logout from '../../assets/icons/logout.svg';

const Sidebar = () => {
	const { pathname } = useLocation();
	const { logOut } = useUserAuth();
	return (
		<nav className='flex flex-col relative h-screen max-w-sm w-full'>
			<div className='flex justify-center gap-x-2 m-5'>
				<img src='./public/logo.svg' alt='logo' />
				<h2 className='text-white text-lg'>Edelgram</h2>
			</div>
			{navLinks.map((item) => (
				<div
					className={cn(
						buttonVariants({ variant: 'default' }),
						pathname === item.link
							? 'bg-white text-white-800 hover:bg-white rounded-none'
							: 'hover:bg-slate-950 hover:text-white bg-transparent rounded-none',
						'justify-start'
					)}
					key={item.name}
				>
					<Link to={item.link} className='flex'>
						<span>
							<img
								src={item.icon}
								alt={item.name}
								className='w-5 h-5 mr-2'
								style={{
									filter: `${
										pathname === item.link ? 'invert(0)' : 'invert(1)'
									}`,
								}}
							/>
						</span>
						<span>{item.name}</span>
					</Link>
				</div>
			))}
			<div
				className={cn(
					buttonVariants({ variant: 'default' }),
					pathname === '/edelgram/login'
						? 'bg-white text-white-800 hover:bg-white rounded-none'
						: 'hover:bg-slate-950 hover:text-white bg-transparent rounded-none',
					'justify-start'
				)}
			>
				<Link to='/edelgram/login' className='flex' onClick={logOut}>
					<span>
						<img
							src={logout}
							className='w-5 h-5 mr-2'
							alt='Logout'
							style={{
								filter: `${
									pathname === '/edelgram/login' ? 'invert(0)' : 'invert(1)'
								}`,
							}}
						/>
					</span>
					<span>Logout</span>
				</Link>
			</div>
		</nav>
	);
};

export default Sidebar;
