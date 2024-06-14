import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';
import image4 from '../../assets/images/image4.jpg';
import image5 from '../../assets/images/image5.jpg';
import image6 from '../../assets/images/image6.jpg';
import image7 from '../../assets/images/image7.jpg';

const Stories = () => {
	return (
		<div className='flex gap-x-6 justify-between'>
			<img
				className='w-20 h-20 rounded-full border-4 border-slate-800 object-cover'
				src={image1}
				alt='image'
			/>
			<img
				className='w-20 h-20 rounded-full border-4 border-slate-800 object-cover'
				src={image2}
				alt='image'
			/>
			<img
				className='w-20 h-20 rounded-full border-4 border-slate-800 object-cover'
				src={image3}
				alt='image'
			/>
			<img
				className='w-20 h-20 rounded-full border-4 border-slate-800 object-cover'
				src={image7}
				alt='image'
			/>
			<img
				className='w-20 h-20 rounded-full border-4 border-slate-800 object-cover'
				src={image4}
				alt='image'
			/>
			<img
				className='w-20 h-20 rounded-full border-4 border-slate-800 object-cover'
				src={image5}
				alt='image'
			/>
			<img
				className='w-20 h-20 rounded-full border-4 border-slate-800 object-cover'
				src={image6}
				alt='image'
			/>
			<img
				className='w-20 h-20 rounded-full border-4 border-slate-800 object-cover'
				src={image7}
				alt='image'
			/>
		</div>
	);
};

export default Stories;
