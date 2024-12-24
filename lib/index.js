'use strict';

var axios = require('axios');

class ZhipuSDK {
    axios;
    constructor(options) {
        this.axios = axios.create({
            headers: {
                Authorization: options.apiKey
            },
            baseURL: 'https://open.bigmodel.cn/api/paas/v4',
            withCredentials: true
        });
    }
    async createCompletions(options, handlers) {
        const result = await this.axios({
            method: 'POST',
            url: '/chat/completions',
            responseType: options.stream ? 'stream' : 'json',
            data: {
                ...options,
                stream: !!options.stream
            },
        });
        if (options.stream) {
            let unhandledMessage = '';
            let deltaContent = '';
            let lastResponse;
            for await (const chunk of result.data) {
                const messages = (unhandledMessage + chunk.toString()).split('\n');
                unhandledMessage = '';
                messages.forEach(message => {
                    if (message.startsWith('data:')) {
                        if (message === 'data: [DONE]') {
                            handlers?.onProgressEnd?.(lastResponse);
                        }
                        else {
                            try {
                                if (message.endsWith('}')) {
                                    const json = JSON.parse(message.replace('data: ', ''));
                                    if (options.stream === 'append') {
                                        deltaContent += json.choices[0].delta.content;
                                        json.choices[0].message = deltaContent;
                                    }
                                    lastResponse = json;
                                    handlers?.onProgress?.(json);
                                }
                                else {
                                    unhandledMessage += message;
                                }
                            }
                            catch (e) {
                                unhandledMessage += message;
                            }
                        }
                    }
                    else {
                        unhandledMessage += message;
                    }
                });
            }
            return lastResponse;
        }
        else {
            handlers?.onProgress?.(result.data);
            return result.data;
        }
    }
}

module.exports = ZhipuSDK;
