import inquirer from 'inquirer';
import { ScrapBooksForCategoryCase } from './domain/cases/scrapBooksCategory.case';
import { ScrapBookDatailCase } from './domain/cases/scrapBookDatail.case';

async function main() {
   
    console.log(`Welcome to the 'books' scrapper!`);
    console.log(`This tool will help you to scrap books from books.toscrape.com`);

    const menu = await inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What do you want to do?',
            choices: [  
                { name: 'Scrap books from category', value: 'scrapCategory'},
                { name: 'Scrap a book datail', value: 'scrapDatail' },
                { name: 'Exit', value: 'exit' }
            ]
        }
        ]);

        switch (menu.menu) {
            case 'scrapCategory':
                ScrapBooksForCategoryCase.run();
            break;
            case 'scrapDatail':
                ScrapBookDatailCase.run();
            break;
            case 'exit':
                console.log('Goodbye!');
                process.exit(0);
        }
        
    }

    main();
