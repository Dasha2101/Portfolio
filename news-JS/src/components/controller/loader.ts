import { Options } from '../../types/index.js';

type Callback<TData> = (data: TData) => void;

class Loader {
    private readonly baseLink: string;
    private readonly options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<TData>({ endpoint, options = {} }: { endpoint: string, options?: Options }, callback: Callback<TData> = function () { console.error('No callback for GET response'); }) {
        this.load<TData>('GET', endpoint, callback, options);
    }


    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res
    }

    makeUrl(options: Options, endpoint: string): string {
        const urlOptions: Options = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<TData>(method: string, endpoint: string, callback: Callback<TData>, options: Options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
