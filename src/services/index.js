exports.generateCrudMethods = Model => {
    return {
        getAll: () => find(),
        create: body => Model.create(body)
    }
}
