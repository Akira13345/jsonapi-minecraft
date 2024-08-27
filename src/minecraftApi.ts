import {JsonApi, JsonApiConfig} from './jsonApi';

export class MinecraftApi {
    protected jsonApi: JsonApi;

    constructor(config: JsonApiConfig) {
        this.jsonApi = new JsonApi(config);
    }

    async call(method: string, args: any[] = []): Promise<any> {
        return this.jsonApi.call(method, args);
    }

    async executeCommand(command: string): Promise<void> {
        await this.call('runConsoleCommand', [command]);
    }

    async executeMultipleCommands(commands: string[]): Promise<void> {
        for (const command of commands) {
            await this.executeCommand(command);
        }
    }
}
