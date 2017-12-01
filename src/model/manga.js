
let Manga = (googleApiBody) => {
    return {
        isbn: googleApiBody.items[0].industryIdentifiers.identifier,
        retailPrice: {
            amount: googleApiBody.items[0].saleInfo.retailPrice.amount,
            currencyCode: googleApiBody.items[0].saleInfo.retailPrice.currencyCode,
        },
        pgaCount: googleApiBody.items[0].volumeInfo.pageCount,
        title: googleApiBody.items[0].volumeInfo.title,
        subtitle: googleApiBody.items[0].volumeInfo.subtitle,
        authors: googleApiBody.items[0].volumeInfo.authors,
        publisher: googleApiBody.items[0].volumeInfo.publisher,
        publishedDate: googleApiBody.items[0].volumeInfo.publishedDate,
        description: googleApiBody.items[0].volumeInfo.description,
        imageLinks: {
            smallThumbnail: googleApiBody.items[0].volumeInfo.imageLinks.smallThumbnail,
            thumbnail: googleApiBody.items[0].volumeInfo.imageLinks.thumbnail,
        },
    }
};

module.exports = Manga;