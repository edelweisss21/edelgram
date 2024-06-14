import { IProfileResponse } from '@/types/types';
import { Button } from '../ui/button';
import avatar from '@/assets/images/image7.jpg';

interface ISuggestedProps {
	friend: IProfileResponse;
}
const SuggestedFriends = ({ friend }: ISuggestedProps) => {
	return (
		<div className='flex flex-row items-center mb-4 border-gray-400 justify-start'>
			<span className='mr-2'>
				<img
					src={friend.photoURL ? friend.photoURL : avatar}
					className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'
				/>
			</span>
			<span className='text-xs'>
				{friend.displayName ? friend.displayName : 'Guest_User'}
			</span>
			<Button className='text-xs p-3 py-2 h-6 bg-slate-900 last-of-type:ml-auto'>
				Follow
			</Button>
		</div>
	);
};

export default SuggestedFriends;
