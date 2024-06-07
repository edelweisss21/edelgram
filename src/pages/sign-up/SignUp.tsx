import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { IUserSignUp } from '@/types/types';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/hooks/useUserAuth';
import { Icons } from '@/components/ui/icons';
import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';
import image4 from '../../assets/images/image4.jpg';

//TODO: Вынести форму в отдельный компонент, разгрузить его

const initialValue: IUserSignUp = {
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUp = () => {
	const { signUp, googleSignIn } = useUserAuth();
	const [userInfo, setUserInfo] = useState<IUserSignUp>(initialValue);
	const navigate = useNavigate();

	const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			console.log('The user info is : ', userInfo);
			await signUp(userInfo.email, userInfo.password);
			navigate('/edelgram/');
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	const handleGoogleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await googleSignIn();
			navigate('/edelgram/');
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	return (
		<div className='bg-slate-800 w-full h-screen'>
			<div className='container mx-auto p-6 flex h-full'>
				<div className='flex justify-center items-center w-full'>
					<div className='p-6 w-2/3 hidden lg:block'>
						<div className='grid grid-cols-2 gap-3'>
							<img
								className='w-2/3 h-auto aspect-video rounded-3xl place-self-end'
								src={image2}
							/>
							<img
								className='w-2/4 h-auto aspect-auto rounded-3xl'
								src={image1}
							/>
							<img
								className='w-2/4 h-auto aspect-auto rounded-3xl place-self-end'
								src={image4}
							/>
							<img
								className='w-2/3 h-auto aspect-video rounded-3xl'
								src={image3}
							/>
						</div>
					</div>
					<div className='max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm'>
						<Card>
							<form onSubmit={handleSubmit}>
								<CardHeader className='space-y-1'>
									<CardTitle className='text-2xl'>Edelgram</CardTitle>
									<CardDescription>
										Enter your email below to create your account
									</CardDescription>
								</CardHeader>
								<CardContent className='grid gap-4'>
									<div className='grid'>
										<Button variant='outline' onClick={handleGoogleSignIn}>
											<Icons.google className='mr-2 h-4 w-4' />
											Google
										</Button>
									</div>
									<div className='relative'>
										<div className='absolute inset-0 flex items-center'>
											<span className='w-full border-t' />
										</div>
										<div className='relative flex justify-center text-xs uppercase'>
											<span className='bg-background px-2 text-muted-foreground'>
												Or continue with
											</span>
										</div>
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Email</Label>
										<Input
											id='email'
											type='email'
											placeholder='edelweisss21@example.com'
											value={userInfo.email}
											onChange={(e: ChangeEvent<HTMLInputElement>) =>
												setUserInfo({
													...userInfo,
													email: e.target.value,
												})
											}
										/>
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='password'>Password</Label>
										<Input
											id='password'
											type='password'
											value={userInfo.password}
											onChange={(e: ChangeEvent<HTMLInputElement>) =>
												setUserInfo({
													...userInfo,
													password: e.target.value,
												})
											}
										/>
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='confirmpassword'>Confirm password</Label>
										<Input
											id='confirmpassword'
											type='password'
											value={userInfo.confirmPassword}
											onChange={(e: ChangeEvent<HTMLInputElement>) =>
												setUserInfo({
													...userInfo,
													confirmPassword: e.target.value,
												})
											}
										/>
									</div>
								</CardContent>
								<CardFooter className='flex flex-col'>
									<Button className='w-full' type='submit'>
										Sign Up
									</Button>
									<p className='mt-3 text-sm text-center'>
										Already have an account?
										<Link to='/edelgram/login'> Login</Link>
									</p>
								</CardFooter>
							</form>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
