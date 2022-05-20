# The Bishop (Typescript Edition)

## Initial Setup

When first installing, run `npm install`.
After that, run `tsc` to run the typescript compilation. This should create a `build/` folder.
To run the bot, once `tsc` has been run, run the command `node build/src/Bot.js`

### Discord Token
Bot token must be added in a file called token.json in the home directory. The file should look like
```JSON
{
    "token": "asdfsadfsdadfasfsa"
}
```
Token can be generated from the Discord Developer website. 

### Praise Count
There is a file in the home directory called `praisecount.json`. When initializing the bot, please update this file to have your desired
starting amount of praises. 

### Config File
In the file `config.json` there are several changable settings, including the colors for success and failure messages. 
Just be sure to maintain the same file structure within config.json.

## Dockerizing
A `compose.yml` file is provided for this bot. To run using docker please use `docker-compose up`.
If you want to make sure it is rebuilt from changes you made, use `docker-compose up --build`. Typically you don't want to be 
using docker while testing, as it is a bit tedious, but if you need to you can do this.


## Inviting to Server
Use this link: https://discord.com/api/oauth2/authorize?client_id=977105743784341504&permissions=8&scope=bot%20applications.commands
To change permissions, get appropriate permissions and update the value in permissions={permValue} query-string parameter.
It currently has admin permissions for testing.

