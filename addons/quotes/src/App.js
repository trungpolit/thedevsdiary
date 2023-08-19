import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'

import logo from './logo.svg';
import './App.css';

const queryClient = new QueryClient()
const QUOTES_KEY = `quotes`
const QUOTES_URL = `https://api.quotable.io/random`

function App(options) {
    const {isLoading, error, data} = useQuery(QUOTES_KEY, () =>
        fetch(QUOTES_URL).then(async res => {
                // await new Promise(r => setTimeout(r, 5000));
                return res.json();
            }
        )
    );

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </QueryClientProvider>
    );
}

export default App;
