# The Bishop (Typescript Edition)

## Initial Setup / Testing

When first installing, run `npm install`.
After that, run `tsc -w` to run the typescript compilation in watch mode. This should create a `build/` folder.
It will also recompile any files that get changed.
To run the bot in dev mode, once `tsc -w` has been run, open a new terimnal and run the command `npm run start`. Note that if you want the bot to NOT restart on changes, you can run `node build/src/Bot.js`
This will use nodemon, so it will watch for any changes in the js files. Therefore you should be able to change the .ts files,
`tsc -w` will compile that to js, and then nodemon will restart the bot.

## Config Setup
The following files need to be created:
configs/config.yml
configs/roles.yml
configs/praisecount.yml

config.yml and roles.yml match the examples, just replace the template IDs with the actual IDs.
Praisecount.yml is a file that looks like this:
```yml 
count: 5
```

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

