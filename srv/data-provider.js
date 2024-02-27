const cds = require('@sap/cds')

class LibraryManagement extends cds.ApplicationService {
    async init() {
        const db = await cds.connect.to("db"),
        {
            Books,
            Authors,
            Libraries,
            Categories,
            SubCategories,
            BookActivities
        }=db.entities("LibraryManagement");

        this.before("CREATE", Authors, (req, res, next) => {
            req.data.thumbnailUrl = `/odata/v2/library-management/Authors(${req.data.ID})/image`;
            req.data.displayUrl = `/odata/v2/library-management/Authors(${req.data.ID})/$value`;
        })

        return super.init()
    }
  }
  module.exports = LibraryManagement