import { IDocumentResponse } from '@/types/types';
import { HeartIcon } from 'lucide-react';

interface IPostProps {
	data: IDocumentResponse[];
}

const Post = ({ data }: IPostProps) => {
	return (
		<>
			{data.map((item) => (
				<div key={item.photos[0].uuid} className='relative'>
					<div className='absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full'>
						<div className='flex flex-col justify-center items-center w-full h-full'>
							<HeartIcon className='hidden group-hover:block fill-white' />
							<div className='hidden group-hover:block text-white'>
								{item.likes} likes
							</div>
						</div>
					</div>
					<img
						src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
					/>
				</div>
			))}
		</>
	);
};

export default Post;
