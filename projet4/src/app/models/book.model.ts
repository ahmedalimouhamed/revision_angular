export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    publicationDate: Date;
    genre: 'Roman' | 'Sccience' | 'Histoire' | 'Poésie' ;
    available: boolean;
    borrowedBy?: string;
    borrowDate?: Date;
}

