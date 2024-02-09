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

        return super.init()
    }
  }
  module.exports = LibraryManagement