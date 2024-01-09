import './App.css';
import Login from './components/Login/Login';
import Landing from './components/Landing/Landing';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	NavLink,
} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<SignUp />}
				/>
				<Route
					path='/landing-page'
					element={<Landing />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
