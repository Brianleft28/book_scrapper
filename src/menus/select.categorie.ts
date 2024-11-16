// src/menus/selectCategory.ts
import inquirer from 'inquirer';
import { Scrapper } from '../scrappers/scraper';
export async function selectCategory() {
    const categories = await Scrapper.scrapCategories();

    const { selectedCategory } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedCategory',
            message: 'Select a category:',
            choices: categories.map(category => ({ name: category.name, value: category.url }))
        }
    ]);

    return selectedCategory;
}