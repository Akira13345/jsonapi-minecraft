import crypto from 'crypto';
import axios, {AxiosInstance} from 'axios';

export interface JsonApiConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    salt?: string;
    timeout?: number;
}

export class JsonApi {
    private axios: AxiosInstance;

    constructor(private config: JsonApiConfig) {
        this.axios = axios.create({
            baseURL: `http://${config.host}:${config.port}`,
            timeout: config.timeout || 10000,
        });
    }

    async call(method: string, args: any[] = []): Promise<any> {
        try {
            const url = this.constructUrl(method, args);
            const response = await this.axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error calling JSONAPI:', error);
            throw error;
        }
    }

    private createKey(method: string): string {
        return crypto
            .createHash('sha256')
            .update(this.config.username + method + this.config.password)
            .digest('hex');
    }

    private constructCall(method: string, args: any[] = []): object {
        return {
            name: method,
            arguments: args,
            key: this.createKey(method),
            username: this.config.username,
        };
    }

    private constructUrl(method: string, args: any[] = []): string {
        const callData = this.constructCall(method, args);
        return `/api/2/call?json=${encodeURIComponent(JSON.stringify(callData))}`;
    }
}
