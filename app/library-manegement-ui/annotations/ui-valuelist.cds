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
    subCategoryID @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHSubCategory',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: subCategoryID,
                ValueListProperty: 'ID'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description'
            }
        ]
    };
};

annotate service.VLibraries with {
    ID @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'VHLibrary',
        SearchSupported,
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: ID,
                ValueListProperty: 'ID'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'placeName'
            }
        ]
    };
}
