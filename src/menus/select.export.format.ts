// src/menus/selectExportFormat.ts
import inquirer from 'inquirer';

export async function selectExportFormat() {
    const { exportFormat } = await inquirer.prompt([
        {
            type: 'list',
            name: 'exportFormat',
            message: 'Please select the export format:',
            choices: ['CSV', 'Excel', 'JSON']
        }
    ]);

    return exportFormat;
}