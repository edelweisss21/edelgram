import Layout from '@/components/layout/Layout';
import { useUserAuth } from '@/hooks/useUserAuth';
import { IProfileResponse } from '@/types/types';
import { useEffect, useState } from 'react';
import avatar from '../../assets/images/image7.jpg';
import { Button } from '@/components/ui/button';
import { Edit2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '@/services/repository/user.service';

const Profile = () => {
	const { user } = useUserAuth();
	const navigate = useNavigate();
	const initialValue: IProfileResponse = {
		id: '',
		userId: user?.uid,
		userBio: 'Please enter your bio',
		photoURL: user?.photoURL ? user.photoURL : '',
		displayName: user?.displayName ? user.displayName : 'Guest',
	};
	const [userInfo, setUserInfo] = useState<IProfileResponse>(initialValue);
	console.log('userInfo', userInfo);

	const getUserProfileInfo = async (userId: string) => {
		const data: IProfileResponse = (await getUserProfile(userId)) || {};
		if (data.displayName) setUserInfo(data);
		console.log('User Info:', userInfo);
	};

	const editProfile = () => {
		navigate('/edelgram/profile/edit/', { state: userInfo });
	};

	useEffect(() => {
		if (user !== null) getUserProfileInfo(user.uid);
	}, [user]);

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
							<div>
								<div className='text-xl ml-3'>{userInfo.displayName}</div>
								<div className='text-xl ml-3'>
									{user?.email ? user.email : ''}
								</div>
							</div>
						</div>
						<div className='mb-4'>{userInfo.userBio}</div>
						<div>
							<Button onClick={editProfile}>
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
