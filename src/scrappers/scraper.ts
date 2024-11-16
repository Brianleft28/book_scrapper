import axios from 'axios';
import * as cheerio from 'cheerio';
import { Book, BookDetail, Category } from '../domain/entities/books.entity';

export class Scrapper {
    static async scrapCategories() {
        const categories: Category[] = [];
        const { data } = await axios.get("https://books.toscrape.com/index.html");
        const $ = cheerio.load(data);

        $('.side_categories ul li ul li a').each((index, element) => {
            const url = $(element).attr('href');
            let name = $(element).text().trim();
            name = name.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
            // Limpiar caracteres de nueva línea y espacios adicionales
            if (url && name && name !== 'Add a comment' && name !== 'Default') {
                categories.push({ name, url: `https://books.toscrape.com/${url}` });
            }
        });

        return categories;
    }

    static async scrapBooks(url: any): Promise<Book[]> {
        const books : Book[] = [];
        const { data } = await axios.get(url);

        try {

            const $ = cheerio.load(data);
            $('.product_pod').each((_, element)=> {
            const title = $(element).find('h3 a').attr('title')
            const href = $(element).find('h3 a').attr('href')?.replace('../../../', '');
            const price = $(element).find('.price_color').text();
            const rating = $(element).find('.star-rating').attr('class')?.split(' ')[1];
            const available = $(element).find('.instock.availability').text().trim();

            if (title && price && rating && available) {
                books.push({
                    title,
                    href: `https://books.toscrape.com/catalogue/${href}`,
                    price,
                    rating,
                    available: available.replace(/\n/g, '').replace(/\s+/g, ' ').trim(),
                });
            }
        })

        return books;
        
        } catch (error) { 
            console.log('Error scraping books', error);
            return [];
        }
    }

    static async scrapBookDetails(url: string): Promise<BookDetail[]> {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let book: BookDetail[] = [];
        console.log('Scraping book details...');
        $('article.product_page').each((_, element)=> {
        // Get the title, price, stock, rating and description
        const title = $('div.product_main h1').text().trim();
        const price = $('div.product_main p.price_color').text().trim();
        const stock = $('div.product_main p.instock.availability').text().trim();
        const rating = $('div.product_main p.star-rating').attr('class')?.split(' ')[1] || '';
        const description = $('#product_description').next('p').text().trim();
        // If all the data is available, add it to the book array                
        if (title && price && stock && description) {
            book.push({
                title,
                price,
                stock,
                rating,
                description,
                information: {}    
            })}
        });

        if (book.length > 0) {
            $('table.table-striped tr').each((_, element) => {
                const key = $(element).find('th').text().trim();
                const value = $(element).find('td').text().trim();
                if (key && value) {
                    book[0].information[key] = value;
                }
            }); 
        }
        return book;
    }
}

