import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Error from './pages/error/Error';
import Login from './pages/login/Login';
import MyPhotos from './pages/my-photos/MyPhotos';
import Profile from './pages/profile/Profile';
import SignUp from './pages/sign-up/SignUp';
import CreatePost from './pages/create-post/CreatePost';
import ProtectedRoutes from './components/protected-routes/ProtectedRoutes';

export const router = createBrowserRouter([
	{
		element: <ProtectedRoutes />,
		children: [
			{
				path: '/edelgram/',
				element: <Home />,
				errorElement: <Error />,
			},
			{
				path: '/edelgram/myphotos',
				element: <MyPhotos />,
				errorElement: <Error />,
			},
			{
				path: '/edelgram/createpost',
				element: <CreatePost />,
				errorElement: <Error />,
			},
			{
				path: '/edelgram/profile',
				element: <Profile />,
				errorElement: <Error />,
			},
		],
	},
	{
		path: '/edelgram/login',
		element: <Login />,
		errorElement: <Error />,
	},
	{
		path: '/edelgram/signup',
		element: <SignUp />,
		errorElement: <Error />,
	},
]);
