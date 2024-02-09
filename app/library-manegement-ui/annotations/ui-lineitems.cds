using LibraryManagement as service from '../../../srv/data-provider';

annotate service.VBooks @(UI: {
    SelectionFields: [
        ID,
        name,
        barcodeNumber,
        authorID,
        languageCode
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: ID
        },
        {
            $Type: 'UI.DataField',
            Value: name
        },
        {
            $Type: 'UI.DataField',
            Value: authorID
        },
        {
            $Type: 'UI.DataField',
            Value: languageCode
        },
        {
            $Type: 'UI.DataField',
            Value: subCategoriID
        }
    ]
});

annotate service.VAuthors @(UI: {
    SelectionFields: [
        ID,
        firstName,
        lastName
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: ID
        },
        {
            $Type: 'UI.DataField',
            Value: fullName
        },
        {
            $Type: 'UI.DataField',
            Value: authorBook
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
