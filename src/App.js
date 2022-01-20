import Options from "./components/Options";
import Eyes from "./components/Eyes";
import Headdress from "./components/Headdress";
import Phone from "./components/Phone";
import Mouth from "./components/Mouth";
import PreviewAvata from "./components/PreviewAvata";
import { NFTContext } from "./contexts/NFTContext";
import Clothes from "./components/Clothes";
import Accessories from "./components/Accessories";
import Background from "./components/Background";
import { useEffect, useContext } from "react";
function App() {
	const { 
		authenticate, isAuthenticated, user,  
		enableWeb3, account, logout, isWeb3Enabled
	} = useContext(NFTContext);
	console.log(account, user);
	useEffect(() => {
		if(!isWeb3Enabled) {
			enableWeb3()
		}
	},[])
	if(!isAuthenticated) {
		return (
			<div>
			  	<button onClick={() => authenticate({ signingMessage: "Moralis Authentication" })}>Authenticate</button>
			</div>
		);
	}
	return (
		<>
		<h1 style={{textAlign: 'center'}}>Welcome {account}</h1>
		<button className="btn-logout" onClick={logout}>Logout</button>
		<div id="app">
			<div className="container">
				<Options />
				<div className="content">
					<Eyes />
					<Headdress />
					<Phone />
					<Mouth />
					<Clothes/>
					<Accessories/>
					<Background />
				</div>
				<PreviewAvata />
			</div>
		</div>
		</>
		
	);
}

export default App;
