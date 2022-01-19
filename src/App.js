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
		web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError 
	} = useContext(NFTContext);
	// contract address 0x08f993Bf707CdE7D9f679329d7d1c1b562461DA3
	if(!isAuthenticated) {
		return (
			<div>
			  	<button onClick={() => authenticate()}>Authenticate</button>
			</div>
		);
	}
	return (
		<>
			<h1 style={{textAlign: 'center'}}>Welcome {user.get("ethAddress")}</h1>
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
