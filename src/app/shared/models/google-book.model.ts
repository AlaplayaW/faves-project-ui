export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    printType: string;
    industryIdentifiers: industryIdentifier[];
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}

export interface industryIdentifier {
  identifier: string;
  type: string;
}
