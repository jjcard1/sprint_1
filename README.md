# Entrega 1.1 ToDoList
---
### _Goal_
The goal of this exercise is to create a task list application, usgin Typescript and TDD. The app must have the follow characteristics :
- Allow adding a task to the list.
- Allow to mark a task as completed.
- Allow to remove a task from the list.
- Show the task list.

### _Development_
` General instructions`
1. Clone the repository using git bash
```sh
git clone https://github.com/jjcard1/it_academy.git
```
2. Install all required dependencies to execute the app, typing them in the terminal
```sh
npm install
```
3. Create a tsconfig.json typing the follow command in the terminal
```sh
tsc --init
```
In tsconfig.json make sure the configuration has the follow specification inside the "compilerOptions" field:
|Field|Value|
|---|---|
|"target"|"es5"|
|"module"|""CommonJS|

`Activities`
##### Level 1: Use tests to check the functionality of the application.
For testing all functions to create CLI type the follow code
```sh
npm run test
```

##### Level 2: Create a CLI to test the functionality of the application.
To execute the CLI type the follow command line:
```sh
npm run cli <command>
```
The options to use to run the CLI are listed below:
|Commands|Alias|Description|
|--------|-----|-----------|
|add|a|Add a new task to the list|
|list|l|List or show all task added|
|update <n>|u <n>|Update the task information. Need choose the task passing the index number replacing "<n>"|
|delete <n>|d <n>|Delete a task, passing the index number to choose, replacing "<n>" |
|find <text>|f <text>|Find in all fields the word passing|
|--version|-V|Show the CLI version|
|--help|-h|Show options and commands|

##### Level 3: Create a front-end to test the functionality of the application
To run the frontend with ToDoList interface, please follow these steps:
1. Bundle the necesary files:
```sh
npm run build
```
2. To create a server and run the frontend
```sh
npm start
```
3. Type the follow localhost to watch and use the app:
```sh
localhost:8080
```
Note: Sometimes the localhost port changes. When this happens, please check where the project is running in the information that appear in the terminal after completing the step 2.

To stop the server press "ctrl + c", type "s" and press "enter"Sprint_1
