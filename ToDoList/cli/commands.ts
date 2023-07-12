const  { program } = require('commander');
const inquirer = require('inquirer')

const controller = require('./controllers/task.controllers');

const executeProgram = () => {
    const taskQuestions = [
        {
            type: 'input',
            message: 'Task name',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Task description',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Task manager',
            name: 'manager'
        }
    ];

    program
        .version('0.0.1')
        .description('This is a CLI to make a task list, as a requirement of NODE course');

    program
        .command('add')
        .alias('a')
        .action(async () => {
            const answers = await inquirer.prompt(taskQuestions);
            controller.addTask(answers);
        });

    program
        .command('list')
        .alias('l')
        .action(() => {
            controller.tasksList();
        });

    program
        .command('delete <n>')
        .alias('d')
        .action((n:number) => {
            controller.deleteTask(n);
        });

    program
        .command('update <n>')
        .alias('u')
        .action(async (n:number) => {
            const answers = await inquirer.prompt(taskQuestions);
            await controller.updateTask(n, answers);
        });

    program
        .command('find <text>')
        .alias('f')
        .action((text: string) => {
            controller.findTask(text);
        });

    program
        .parse(process.argv);
};

module.exports = {executeProgram}
