using {managed} from '@sap/cds/common';


entity Books : managed {
    key ID               : UUID;
        name             : String(100) not null;
        editionNumber    : Integer;
        languageCode     : Languages:code;
        toLanguage       : Association to one Languages
                               on toLanguage.code = languageCode;
        barcodeNumber    : String(250) not null;
        authorID         : Authors:ID;
        toAuthor         : Association to one Authors
                               on toAuthor.ID = $self.authorID;
        libraryID        : Libraries:ID;
        toLibraries      : Association to one Libraries
                               on toLibraries.ID = $self.libraryID;
        subCategoryID    : SubCategories:ID;
        toSubCategories  : Association to one SubCategories
                               on toSubCategories.ID = $self.subCategoryID;
        toBookActivities : Association to many BookActivities
                               on toBookActivities.toBooks = $self;
}

entity Languages {
    key code : String(3);
        text : String(25);
}

entity Authors {
    key ID           : UUID;
        firstName    : String(50);
        lastName     : String(50);
        image        : LargeBinary  @Core.MediaType  : 'image/jpeg'  @Core.ContentDisposition.Filename: fileName  @Core.ContentDisposition.Type: 'inline';
        thumbnailUrl : String;
        displayUrl   : String;
        fileName     : String(100);
        age          : Integer;
        autoBio      : String(1000) @UI.MultiLineText: true;
        toBooks      : Composition of many Books
                           on toBooks.toAuthor = $self;
        isAlive      : Boolean default true;
}

entity Libraries {
    key ID           : UUID;
        placeName    : String(100);
        toBooks      : Association to many Books
                           on toBooks.toLibraries = $self;
        toCategories : Association to many Categories
                           on toCategories.toLibraries = $self;
}

entity Categories {
    key ID              : UUID;
        name            : String(100);
        libraryID       : Libraries:ID;
        toLibraries     : Association to one Libraries
                              on toLibraries.ID = $self.libraryID;
        toSubCategories : Association to many SubCategories
                              on toSubCategories.toCategories = $self;

}

entity SubCategories {
    key ID           : UUID;
        description  : String(50);
        toBooks      : Association to many Books
                           on toBooks.toSubCategories = $self;
        categoryID   : Categories:ID;
        toCategories : Association to one Categories
                           on toCategories.ID = $self.categoryID;
        shelfNumber  : Integer;
}

entity BookActivities {
    key ID         : UUID;
        pickupDate : Date not null;
        returnDate : Date;
        note       : String(255);
        bookID     : Books:ID;
        userMail   : String(255) @Communication.IsEmailAddress;
        toBooks    : Association to one Books
                         on toBooks.ID = $self.bookID;
}
