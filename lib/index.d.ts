import { CreateCompletionsOptions, CreateCompletionsResponse } from './types/api';
interface ZhipuSDKOptions {
    apiKey: string;
}
export default class ZhipuSDK {
    private axios;
    constructor(options: ZhipuSDKOptions);
    createCompletions(options: CreateCompletionsOptions, handlers?: Partial<{
        onProgress: (response: CreateCompletionsResponse) => void;
        onProgressEnd: (response: CreateCompletionsResponse) => void;
    }>): Promise<any>;
}
export {};
