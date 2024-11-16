export interface Book {
        title: string; 
        href: string;
        price: string; 
        available: string, 
        rating: string
}

export interface Category {
    name: string;
    url: string;
}

export interface BookDetail {
    title: string;
    price: string;
    stock: string;
    rating?: string;
    description: string;
    information: { [key: string]: string};
}

