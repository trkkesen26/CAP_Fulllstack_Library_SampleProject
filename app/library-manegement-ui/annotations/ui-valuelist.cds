using LibraryManagement as service from '../../../srv/data-provider';

annotate service.Books with {
    authorID      @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHAuthors',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: authorID,
                ValueListProperty: 'ID'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'fullName'
            }
        ]
    };
    ID            @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHBooks',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: ID,
                ValueListProperty: 'ID'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'name'
            }
        ]
    };
    languageCode  @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHLanguage',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: languageCode,
                ValueListProperty: 'code'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'text'
            },
        ]
    };
    libraryID     @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHLibrary',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: libraryID,
                ValueListProperty: 'ID'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'placeName'
            },
        ]
    };
    subCategoriID @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHSubCategory',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: subCategoriID,
                ValueListProperty: 'ID'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description'
            }
        ]
    };
};

annotate service.VBooks {
    authorID      @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHAuthors',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: authorID,
                ValueListProperty: 'ID'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'fullName'
            }
        ]
    };
    barcodeNumber @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHBooks',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: barcodeNumber,
                ValueListProperty: 'barcodeNumber'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'name'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'ID'
            }
        ]
    };
    languageCode  @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHLanguage',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: languageCode,
                ValueListProperty: 'code'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'text'
            },
        ]
    };
}
