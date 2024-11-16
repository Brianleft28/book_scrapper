import { Exporter } from "../../exporters/export";
import { Scrapper } from "../../scrappers/scraper";
import inquirer from "inquirer";
import CliTable3 from "cli-table3";
import { selectExportFormat } from "../../menus/select.export.format";
import { Book, Category } from "../entities/books.entity";

export class ScrapBooksForCategoryCase {
  static async run() {
    const categories: Category[] = await Scrapper.scrapCategories();
    const { selectedCategory } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedCategory",
        message: "Select a category :",
        choices: categories.map((category) => ({
          name: category.name,
          value: category.url,
        })),
      },

    ]);
    const books: Book[] = await Scrapper.scrapBooks(selectedCategory);
    console.log(`Scrapped ${books?.length} books`);
    const table = new CliTable3({
      head: ["Title", "Price", "Rating", "Available"],
      colWidths: [60, 10, 10, 10],
    });
    books?.forEach((book) => {
      table.push([book.title, book.price, book.rating, book.available]);
    });
    console.log(table.toString());
    const menu = await inquirer.prompt([
      {
        type: "list",
        name: "menu",
        message: "Do you want to export the books?",
        choices: [
          { name: "Yes", value: "export" },
          { name: "No", value: "exit" },
        ],
      },
    ]);

    switch (menu.menu) {
      case "export":
        const exportBooksFormat = await selectExportFormat(); 
        if (exportBooksFormat === 'Excel' && books) {
            const fileName = `${selectedCategory}-books`;
            console.log(`Exporting books to Excel...`);
            const ans = await Exporter.exportBooksToExcel(books, fileName);
            console.log(`Books exported to ${ans}`);
          }  
          if (exportBooksFormat === 'CSV' && books) {
            const fileName = `${selectedCategory}-books`;
            console.log(`Exporting books to CSV...`);
            const ans = await Exporter.exportBooksToCsv(books, fileName);
            console.log(`Books exported to ${ans}`);
          }
          if (exportBooksFormat === 'JSON' && books) {
            const fileName = `${selectedCategory}-books`;
            console.log(`Exporting books to JSON...`);
            const ans = await Exporter.exportBooksToJSON(books, fileName);
            console.log(`Books exported to ${ans}`);
          }
          break;
      case "exit":  
        console.log("Closing the application...");
        process.exit(0);
      }   
    }
    
  }
