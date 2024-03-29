using {
    Books          as DBBooks,
    Authors        as DBAuthors,
    Libraries      as DBLibraries,
    Categories     as DBCategories,
    SubCategories  as DBSubCategories,
    BookActivities as DBBookActivities,
    Languages      as DBLanguages
} from '../db/data-models';


service LibraryManagement {
    @cds.redirection.target: true
    entity Books          as select from DBBooks;

    @cds.redirection.target: true
    entity Authors        as select from DBAuthors;

    @cds.redirection.target: true
    entity Libraries      as select from DBLibraries;

    @cds.redirection.target: true
    entity Categories     as select from DBCategories;

    @cds.redirection.target: true
    entity SubCategories  as select from DBSubCategories;

    entity BookActivities as select from DBBookActivities;

    @cds.redirection.target: true
    entity Languages      as select from DBLanguages;

    entity VHAuthors      as
        select from DBAuthors as authors {
            *,
            authors.firstName || ' ' || authors.lastName as fullName     : String(120)
        };


    entity VHBooks        as select from DBBooks;
    entity VHLibrary      as select from DBLibraries;
    entity VHSubCategory  as select from DBSubCategories;
    entity VHLanguage     as select from DBLanguages;

    entity VBooks         as
        select from DBBooks {
            key ID,
                name,
                editionNumber,
                languageCode,
                barcodeNumber,
                authorID,
                toAuthor.firstName || ' ' || toAuthor.lastName as authorFullName : String(120),
                libraryID,
                toLibraries.placeName as libraryName : String,
                subCategoryID,
                toSubCategories.description as subCategoryName : String,
                toSubCategories.toCategories.name as categoryName : String
        };

    entity VAuthors       as
        select from DBAuthors as authors {
            key ID,
                age,
                autoBio,
                isAlive,
                IFNULL(authors.firstName || IFNULL(' ' || authors.lastName, ''), IFNULL(authors.lastName, ''))  as fullName : String(120),
                displayUrl
        };
    
    entity VLibraries as select from DBLibraries;
}  