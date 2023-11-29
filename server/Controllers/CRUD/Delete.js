

const Delete = async (req, res,designation) => {

    designation.deleteOne({ _id: req.params.id }).then(response => {
        if (response.deletedCount) {
            res.status(200).json({
                message: "Deleted Successfully",
                data: response
            })
        } else {
            res.status(400).json({
                message: "Id not found"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error.."
        })
    })
}

module.exports = Delete