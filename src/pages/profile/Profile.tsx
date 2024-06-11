import Layout from '@/components/layout/Layout';
import { useUserAuth } from '@/hooks/useUserAuth';
import { IProfileResponse } from '@/types/types';
import { useState } from 'react';
import avatar from '../../assets/images/image7.jpg';
import { Button } from '@/components/ui/button';
import { Edit2Icon } from 'lucide-react';

const Profile = () => {
	const { user } = useUserAuth();
	const initialValue: IProfileResponse = {
		id: '',
		userId: user?.uid,
		userBio: 'Please enter information about yourself.',
		photoURL: user?.photoURL ? user.photoURL : '',
		displayName: user?.displayName ? user.displayName : 'Guest',
	};
	const [userInfo, setUserInfo] = useState<IProfileResponse>(initialValue);
	return (
		<Layout>
			<div className='flex justify-center'>
				<div className='border max-w-3xl w-full'>
					<h3 className='bg-slate-800 text-white text-center text-lg p-2'>
						Profile
					</h3>
					<div className='p-8 pb-4 border-b'>
						<div className='flex flex-row items-center pb-2'>
							<div className='mr-2'>
								<img
									src={userInfo.photoURL ? userInfo.photoURL : avatar}
									alt='avatar'
									className='w-28 h-28 rounded-full border-2 border-slate-800 object-cover'
								/>
							</div>
							<div className='text-xl ml-3'>{userInfo.displayName}</div>
							<div className='text-xl ml-3'>
								{user?.email ? user.email : ''}
							</div>
						</div>
						<div className='mb-4'>{userInfo.userBio}</div>
						<div>
							<Button>
								<Edit2Icon className='mr-2 h-4 w-4' />
								Edit Profile
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
