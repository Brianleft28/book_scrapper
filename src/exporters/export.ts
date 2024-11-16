import ExcelJs from 'exceljs'
import path from 'path';
import fs from 'fs';
import { Book, BookDetail } from '../domain/entities/books.entity';

export class Exporter {
    static async exportBooksToExcel(books: Book[], fileName: string) {
        const workbook = new ExcelJs.Workbook();
        const sheet = workbook.addWorksheet('Books');
       // add header row
        sheet.columns = [
            { header: 'Title', key: 'title', width: 60 },
            { header: 'Price', key: 'price', width: 10 },
            { header: 'Rating', key: 'rating', width: 10 },
            { header: 'Available', key: 'available', width: 10 },
            { header: 'URL', key: 'href', width: 100 }
        ]; 
        // add data rows
        books.forEach(book => {
            sheet.addRow(book)
        })
           // Ensure the exports directory exists
           const exportsDir = path.resolve(__dirname, '../../exports/category/excel');
           if (!fs.existsSync(exportsDir)) {
               fs.mkdirSync(exportsDir);
           }
   
        // Extract category from fileName and clean it
        const categoryMatch = fileName.match(/category\/books\/([^\/]*)/);
        const category = categoryMatch ? categoryMatch[1] : 'books';
        const cleanFileName = category.replace(/[^a-z0-9]/gi, '_').toLowerCase();

        // Save the workbook
        const filePath = path.resolve(exportsDir, `${cleanFileName}.xlsx`);
        await workbook.xlsx.writeFile(filePath);
        return filePath;
    }

    static async exportBooksToCsv(books: Book[], fileName: string) {
        const filePath = path.resolve(__dirname, '../../exports/category/csv');
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        const categoryMatch = fileName.match(/category\/books\/([^\/]*)/);
        const category = categoryMatch ? categoryMatch[1] : 'books';
        const cleanFileName = category.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const csvFilePath = path.resolve(filePath, `${cleanFileName}.csv`);
        const csv = books.map(book => {
            return `${book.title},${book.price},${book.rating},${book.available},${book.href}`;
        }).join('\n');
        fs.writeFileSync(csvFilePath, csv);
        return csvFilePath;
    }

    static async exportBooksToJSON(books: Book[], fileName: string) {
        const filePath = path.resolve(__dirname, '../../exports/category/json');
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        const categoryMatch = fileName.match(/category\/books\/([^\/]*)/);
        const category = categoryMatch ? categoryMatch[1] : 'books';
        const cleanFileName = category.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const jsonFilePath = path.resolve(filePath, `${cleanFileName}.json`);
        fs.writeFileSync(jsonFilePath, JSON.stringify(books, null, 2));
        return jsonFilePath;
    }
     
    static async exportDatailToJSON(book: BookDetail[]) {
        const filePath = path.resolve(__dirname, '../../exports/datail/json');
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        const title = book[0].title;
        const jsonFilePath = path.resolve(filePath, `${title}.json`);
        fs.writeFileSync(jsonFilePath, JSON.stringify(book, null, 2));
        console.log(`Book ${title} exported to ${jsonFilePath}`);
        return jsonFilePath;
    }

    static async exportDatailToCSV(book: BookDetail[]) {
        const filePath = path.resolve(__dirname, '../../exports/datail/csv');
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        const title = book[0].title;
        const csvFilePath = path.resolve(filePath, `${title}.csv`);
        const csv = Object.entries(book[0]).map(([key, value]) => {
            return `${key},${value}`;
        }).join('\n');
        fs.writeFileSync(csvFilePath, csv);
        console.log(`Book ${title} exported to ${csvFilePath}`);
        return csvFilePath;
    }

    static async exportBookDetailsToExcel(book: BookDetail[]) {
       const workbook = new ExcelJs.Workbook();
       const sheet = workbook.addWorksheet('Book Details');
       // Add header row
       sheet.columns = [
           { header: 'Title', key: 'title', width: 60 },
           { header: 'Price', key: 'price', width: 10 },
           { header: 'Stock', key: 'stock', width: 10 },
           { header: 'Rating', key: 'rating', width: 10 },
           { header: 'Description', key: 'description', width: 100 }
       ];   // Add data rows
         const bookDetail = book[0];
         sheet.addRow(bookDetail);

       for (const [key, value] of Object.entries(book[0].information)) {
           sheet.addRow({ field: key, value });
       }
            // Add information rows
            sheet.addRow([]);
            sheet.addRow(['Information']);
            sheet.addRow([]);
            Object.keys(book[0].information).forEach(key => {
                sheet.addRow([key, book[0].information[key]]);
            });
            // Ensure the exports directory exists
            const exportsDir = path.resolve(__dirname, '../../exports/datail/excel');
            if (!fs.existsSync(exportsDir)) {
                fs.mkdirSync(exportsDir);
            }
            // Extract title from fileName and clean it
            const title = book[0].title;
            // Save the workbook
            const filePath = path.resolve(exportsDir, `${title}.xlsx`);
            workbook.xlsx.writeFile(filePath);  
            console.log(`Book ${title} exported to ${filePath}`);
            return filePath;
    }
}