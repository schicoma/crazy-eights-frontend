import { environment } from './environments/environment';

interface Config {
    apiUrl: string;
}

const config: Config = {
    apiUrl: environment.apiUrl
};

export default config; 