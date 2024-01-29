using {
    Books   as DBBooks,
    Authors as DBAuthors,
    Libraries as DBLibraries,
    Categories as DBCategories,
    SubCategories as DBSubCategories,
    BookActivities as DBBookActivities
} from '../db/data-models';


service LibraryManagement {
    entity Books as select from DBBooks;
    entity Authors as select from DBAuthors;
    entity Libraries as select from DBLibraries;
    entity Categories as select from DBCategories;
    entity SubCategories as select from DBSubCategories;
    entity BookActivities as select from DBBookActivities;
}