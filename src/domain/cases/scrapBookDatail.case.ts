import inquirer from "inquirer";
import { Scrapper } from "../../scrappers/scraper";
import { Exporter } from "../../exporters/export";
import { Book, BookDetail, Category } from "../entities/books.entity";
import { selectExportFormat } from "../../menus/select.export.format";

export class ScrapBookDatailCase {
    static async run(): Promise<void> {

        const { filterOption } = await inquirer.prompt([
            {
                type: 'list',
                name: 'filterOption',
                message: 'How do you want to filter the books?',
                choices: [
                    { name: 'By category', value: 'byCategory' },
                    { name: 'View all books', value: 'viewAll' }
                ]
            }
        ]);

        if(filterOption === 'viewAll') {

        const categories: Category[] = await Scrapper.scrapCategories();

        const books: Book[] = [];
        categories.forEach((category, index) => {
            Scrapper.scrapBooks(category.url).then(async (b) => {
                books.push(...b);
                if(index === categories.length - 1) {
                    const { selectedBook } = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'selectedBook',
                            message: 'Select a book :',
                            choices: books.map((book) => ({
                                name: book.title,
                                value: book.href,
                            })),
                            },
                        ]);
                    const book: BookDetail[] = await Scrapper.scrapBookDetails(selectedBook);
                    const exportOption = await selectExportFormat();
                  /*   if (exportOption === 'CSV (Comma Separated Values)') {
                        Exporter.exportDatailToCSV(book);
                    } */
                    if (exportOption === 'Excel') {
                        Exporter.exportBookDetailsToExcel(book);
                   /*  }
                    if (exportOption === 'JSON') {
                        Exporter.exportDatailToJSON(book);
                        } */
                    }
                    }
                });
            });
        }
    


    if(filterOption === 'byCategory') {
        const categories: Category[] = await Scrapper.scrapCategories();
        const { selectedCategory } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedCategory',
                message: 'Select a category :',
                choices: categories.map((category) => ({
                    name: category.name,
                    value: category.url,
                })),
            },
        ]);

        const books: Book[] = await Scrapper.scrapBooks(selectedCategory);
        const { selectedBook } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedBook',
                message: 'Select a book :',
                choices: books.map((book) => ({
                    name: book.title,
                    value: book.href,
                })),
            },
        ]);

        const book: BookDetail[] = await Scrapper.scrapBookDetails(selectedBook);
        const exportOption = await selectExportFormat();
         if (exportOption === 'CSV') {
            Exporter.exportDatailToCSV(book);
        } 
        if (exportOption === 'Excel') {
            Exporter.exportBookDetailsToExcel(book);
        }
        if (exportOption === 'JSON') {
            Exporter.exportDatailToJSON(book);
        }
            
    }
}
}