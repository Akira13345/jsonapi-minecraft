# JSONAPI-MINECRAFT

## Overview

This TypeScript library makes it easy to communicate with a Minecraft server via
the [JSONAPI](https://www.spigotmc.org/resources/jsonapi-reloaded.69447/)
It allows you to send commands and call any method available in the documentation.

## Features

- **JSONAPI Communication** : Provides an interface for communicating with a Minecraft server using the JSONAPI.
- **Method Invocation** : Allows calling any method available in the JSONAPI with support for passing arguments.
- **Command Execution** : Supports executing individual commands on the Minecraft server through runConsoleCommand.
- **Batch Command Execution** : Enables the execution of multiple commands sequentially.

## Installation

Install the JSONAPI-MINECRAFT module using npm:

```bash
npm install jsonapi-minecraft
```

## Usage

```typescript
import {MinecraftApi} from 'jsonapi-minecraft';

class CustomMinecraftMethods {
    constructor(private minecraftApi: MinecraftApi) {
    }

    async getPlayerNames(): Promise<string[]> {
        const response = await this.minecraftApi.call('getPlayerNames');
        return response !== null ? response : [];
    }
}

async function main() {
    const minecraftApi = new MinecraftApi({
        host: 'localhost',
        port: 20059,
        username: 'admin',
        password: 'changeme',
    });

    const customMethods = new CustomMinecraftMethods(minecraftApi);

    await minecraftApi.executeMultipleCommands([
        'msg AkiraExe_ Hello!',
        'msg AkiraExe_ How are you?',
    ]);

    await minecraftApi.executeCommand('say Hello, Minecraft!');

    const playerNames = await customMethods.getPlayerNames();
    console.log('Player names:', playerNames);
}

void main();
```

## Custom Methods

To create custom methods, you can refer to the [JSONAPI documentation](https://docs.asylyus.fr/JSONAPI-RELOADED/) for
available methods and their usage.

## Contributions

We welcome contributions to this project! If you have suggestions, encounter bugs, or wish to propose improvements,
please feel free to open an issue or submit a pull request. Your feedback and contributions help us make this library
better for everyone.



