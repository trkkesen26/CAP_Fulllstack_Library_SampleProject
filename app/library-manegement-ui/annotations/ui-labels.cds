using LibraryManagement as service from '../../../srv/data-provider';

annotate service.Books with {
    ID            @Common.Label: '{i18n>bookID}';
    name          @Common.Label: '{i18n>bookName}';
    editionNumber @Common.Label: '{i18n>editionNumber}';
    languageCode  @Common.Label: '{i18n>bookLanguage}';
    barcodeNumber @Common.Label: '{i18n>barcodeNumber}';
    authorID      @Common.Label: '{i18n>bookAuthorID}';
    subCategoriID @Common.Label: '{i18n>subCategoriID}';
    libraryID     @Common.Label: '{i18n>bookLibraryID}';
};

annotate service.VBooks with {
    ID            @Common.Label: '{i18n>bookID}';
    name          @Common.Label: '{i18n>bookName}';
    editionNumber @Common.Label: '{i18n>editionNumber}';
    languageCode  @Common.Label: '{i18n>bookLanguage}';
    barcodeNumber @Common.Label: '{i18n>barcodeNumber}';
    authorID      @Common.Label: '{i18n>bookAuthorID}';
    subCategoriID @Common.Label: '{i18n>subCategoriID}';
    libraryID     @Common.Label: '{i18n>bookLibraryID}';
};

annotate service.VHBooks with {
    ID            @Common.Label: '{i18n>bookID}';
    name          @Common.Label: '{i18n>bookName}';
    editionNumber @Common.Label: '{i18n>editionNumber}';
    languageCode  @Common.Label: '{i18n>bookLanguage}';
    barcodeNumber @Common.Label: '{i18n>barcodeNumber}';
    authorID      @Common.Label: '{i18n>bookAuthorID}';
    subCategoriID @Common.Label: '{i18n>subCategoriID}';
    libraryID     @Common.Label: '{i18n>bookLibraryID}';
}

annotate service.Authors with {
    ID        @Common.Label: '{i18n>authorID}';
    firstName @Common.Label: '{i18n>firstName}';
    lastName  @Common.Label: '{i18n>lastName}';
    image     @Common.Label: '{i18n>image}';
    age       @Common.Label: '{i18n>age}';
    autoBio   @Common.Label: '{i18n>autoBio}';
    isAlive   @Common.Label: '{i18n>isAlive}';
};

annotate service.VAuthors with {
    ID        @Common.Label: '{i18n>authorID}';
    firstName @Common.Label: '{i18n>firstName}';
    lastName  @Common.Label: '{i18n>lastName}';
    image     @Common.Label: '{i18n>image}';
    age       @Common.Label: '{i18n>age}';
    autoBio   @Common.Label: '{i18n>autoBio}';
    isAlive   @Common.Label: '{i18n>isAlive}';
    authorBook @Common.Label: '{i18n>authorBooks}';
};

annotate service.VHAuthors with {
    ID       @Common.Label: '{i18n>authorID}';
    fullName @Common.Label: '{i18n>fullName}';
}

annotate service.Libraries with {
    ID        @Common.Label: '{i18n>libraryID}';
    placeName @Common.Label: '{i18n>placeName}';
};

annotate service.VHLibrary with {
    ID        @Common.Label: '{i18n>libraryID}';
    placeName @Common.Label: '{i18n>placeName}';
};

annotate service.Categories with {
    ID        @Common.Label: '{i18n>categoryID}';
    name      @Common.Label: '{i18n>categoryName}';
    libraryID @Common.Label: '{i18n>categoryLibraryID}';
};

annotate service.SubCategories with {
    ID          @Common.Label: '{i18n>subID}';
    categoryID  @Common.Label: '{i18n>subcategoryID}';
    shelfNumber @Common.Label: '{i18n>shelfNumber}';
};

annotate service.VHSubCategory with {
    ID          @Common.Label: '{i18n>subID}';
    categoryID  @Common.Label: '{i18n>subcategoryID}';
    shelfNumber @Common.Label: '{i18n>shelfNumber}';
};

annotate service.BookActivities with {
    ID         @Common.Label: '{i18n>activitiID}';
    pickupDate @Common.Label: '{i18n>pickupDate}';
    returnDate @Common.Label: '{i18n>returnDate}';
    note       @Common.Label: '{i18n>note}';
    status     @Common.Label: '{i18n>status}';
    bookID     @Common.Label: '{i18n>activeBookID}';
    userMail   @Common.Label: '{i18n>email}';
};

annotate service.VHLanguage with {
    code @Common.Label: '{i18n>languageCode}';
    text @Common.Label: '{i18n>languageText}';
};

annotate service.Languages with {
    code @Common.Label: '{i18n>languageCode}';
    text @Common.Label: '{i18n>languageText}';
};
