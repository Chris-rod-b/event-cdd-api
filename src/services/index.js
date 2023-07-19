exports.generateCrudMethods = Model => {
    return {
        getAll: () => Model.find(),
        create: body => Model.create(body),
        update: (id, record) => Model.findByIdAndUpdate(id, record, { new: true }),
        delete: id => Model.findByIdAndDelete(id),
    }
}
