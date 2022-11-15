import '../styles/main.sass'

import {Provider as ProviderApi, createClient} from "urql";
import Nav from "../components/Nav";
import {StateContext} from "../lib/context";
import {UserProvider} from "@auth0/nextjs-auth0";

import store from '../store'
import { Provider } from 'react-redux'


const client = createClient({url: process.env.NEXT_PUBLIC_BACKEND_API})

function MyApp({Component, pageProps}) {
	return (
		<UserProvider>
			{/*<StateContext>*/}
			<Provider store={store}>
				<ProviderApi value={client}>
					<Nav />
					<Component {...pageProps} />
				</ProviderApi>
			</Provider>
			 {/*</StateContext>*/}
		</UserProvider>
	)
}

export default MyApp
