import '../styles/main.sass'

import {Provider as ProviderApi, createClient} from "urql";
import Nav from "../components/Nav";

import store from '../store'
import { Provider } from 'react-redux'
import {Toaster} from 'react-hot-toast'


const client = createClient({url: process.env.NEXT_PUBLIC_BACKEND_API})

function MyApp({Component, pageProps}) {
	return (
		<Provider store={store}>
			<ProviderApi value={client}>
				<Toaster />
				<Nav />
				<Component {...pageProps} />
			</ProviderApi>
		</Provider>
	)
}

export default MyApp
