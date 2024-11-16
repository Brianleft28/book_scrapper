
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Inquirer](https://img.shields.io/badge/Inquirer.js-3f4e66?style=for-the-badge&logo=javascript&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5a29e4?style=for-the-badge&logo=axios&logoColor=white) ![Cheerio](https://img.shields.io/badge/Cheerio-FF7102?style=for-the-badge&logo=javascript&logoColor=white) ![XLSX](https://img.shields.io/badge/xlsx-207245?style=for-the-badge&logo=microsoft-excel&logoColor=white)   ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  

# 📚 Book Scrapper  

Este proyecto es un **scrapper de libros** diseñado para extraer información de la página [Books to Scrape](https://books.toscrape.com). Utiliza varias tecnologías y bibliotecas para ofrecer un flujo de trabajo eficiente. Los datos recopilados pueden exportarse en formatos **CSV**, **Excel** y **JSON**.  

---

## 📦 Librerías utilizadas  
- **axios**: Para realizar solicitudes HTTP y obtener los datos de la web.  
- **cheerio**: Para manipular y extraer datos del DOM de las páginas web.  
- **inquirer**: Para crear un menú interactivo en la consola.  
- **xlsx**: Para generar y exportar datos en formato Excel.  
- **fs**: Para la lectura y escritura de archivos locales.  
---

## 🚀 Funcionalidades principales  

### **Menú principal:**  
1. **Scrap books from category**: Permite seleccionar una categoría específica para extraer información de los libros pertenecientes a ella.  
2. **Scrap a book detail**: Permite seleccionar un libro específico dentro de una categoría y obtener sus detalles.  
3. **Exit**: Finaliza la ejecución del programa.  

### **Exportación de datos:**  
Después de extraer los datos, el sistema permite exportarlos en cualquiera de los siguientes formatos:  
- **CSV**  
- **Excel**  
- **JSON**  

---

## 🛠️ Estructura del código  

### **Scrapers:**  
- `scraper.ts`: Contiene las funciones principales para realizar el scraping de categorías, libros y detalles específicos.  

### **Casos de uso:**  
- `scrapBooksCategory.case.ts`: Implementa la lógica para extraer libros de una categoría seleccionada.  
- `scrapBookDetail.case.ts`: Maneja la extracción de los detalles de un libro específico.  

### **Menús interactivos:**  
- `select.category.ts`: Lógica para listar y seleccionar una categoría.  
- `select.book.ts`: Lógica para listar y seleccionar un libro dentro de una categoría.  
- `select.export.format.ts`: Maneja la selección del formato de exportación.  

### **Exportadores:**  
- `export.ts`: Contiene las funciones para exportar los datos extraídos en los formatos mencionados (CSV, Excel y JSON).  

---

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto:  
1. Abre un **issue** para discutir los cambios o nuevas funcionalidades.  
2. Envía un **pull request** con tus contribuciones.  

---
