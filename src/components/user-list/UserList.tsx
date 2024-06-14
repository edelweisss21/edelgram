import { useUserAuth } from '@/hooks/useUserAuth';
import { getAllUsers } from '@/services/repository/user.service';
import { IProfileResponse } from '@/types/types';
import { useEffect, useState } from 'react';
import avatar from '@/assets/images/image7.jpg';
import { Link } from 'react-router-dom';
import SuggestedFriends from './SuggestedFriends';

const UserList = () => {
	const { user } = useUserAuth();
	const [suggestedFriends, setSuggestedFriends] = useState<IProfileResponse[]>(
		[]
	);

	const fetchUsers = async (userId: string) => {
		const response = (await getAllUsers(userId)) || [];
		setSuggestedFriends(response);
	};

	useEffect(() => {
		if (user !== null) fetchUsers(user.uid);
	}, [user]);

	return (
		<div className='text-white py-8 px-3'>
			<Link to='/edelgram/profile/'>
				<div className='flex flex-row items-center border-b pb-4 mb-4 border-gray-400 cursor-pointer'>
					<span className='mr-2'>
						<img
							src={user?.photoURL ? user.photoURL : avatar}
							className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'
						/>
					</span>
					<span className='text-xs'>
						{user?.displayName ? user.displayName : 'Guest'}
					</span>
				</div>
			</Link>
			<h3 className='text-sm text-slate-300'>Suggested Friends</h3>
			<div className='my-4'>
				{suggestedFriends.length > 0
					? suggestedFriends.map((friend) => (
							<SuggestedFriends friend={friend} />
					  ))
					: ''}
			</div>
		</div>
	);
};

export default UserList;
