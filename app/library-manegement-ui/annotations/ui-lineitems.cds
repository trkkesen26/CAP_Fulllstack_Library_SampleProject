using LibraryManagement as service from '../../../srv/data-provider';

annotate service.VBooks @(UI: {
    SelectionFields: [
        name,
        authorFullName,
        categoryName,
        subCategoryName,
        libraryName,
        languageCode
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: name
        },
        {
            $Type: 'UI.DataField',
            Value: authorFullName
        },
        {
            $Type: 'UI.DataField',
            Value: languageCode
        },
        {
            $Type: 'UI.DataField',
            Value: categoryName
        },
        {
            $Type: 'UI.DataField',
            Value: subCategoryName
        },
        {
            $Type: 'UI.DataField',
            Value: libraryName
        }
    ]
});

annotate service.VAuthors @(UI: {
    SelectionFields: [
        ID,
        fullName,
        isAlive
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: fullName
        },
        {
            $Type: 'UI.DataField',
            Value: age
        },
        {
            $Type: 'UI.DataField',
            Value: isAlive
        },
        {
            $Type: 'UI.DataField',
            Value: autoBio
        }
    ]
});

annotate service.VLibraries @(UI: {
    SelectionFields: [
        ID,
        placeName
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: placeName
        }
    ]
});

