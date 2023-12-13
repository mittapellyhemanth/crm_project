const bcrypt = require('bcrypt')

const Put = async (req, res, UserModel) => {
    try {
        const AdminId = req.params.id;
        let updatedData = req.body;
        console.log(AdminId, updatedData);

        if (Object.keys(updatedData).length === 0) {
            return res.json({ error: "No updates have been made" });
        }

        if (updatedData.phoneNumber || updatedData.Name || updatedData.password) {

            if (updatedData.phoneNumber && updatedData.phoneNumber.toString().length !== 10) {
                return res.json({ error: "Phone number must be 10 digits" });
            }

            if (updatedData.Name && updatedData.Name.toString().length === 0) {
                return res.json({ error: "Name must not be empty" });
            } else if (updatedData.Name) {
                updatedData.Name = updatedData.Name.toUpperCase();
            }
            if (updatedData.CompanyName && updatedData.CompanyName.toString().length === 0) {
                return res.json({ error: "CompanyName must not be empty" });
            }
            if (updatedData.CompanyLocation && updatedData.CompanyLocation.toString().length === 0) {
                return res.json({ error: "CompanyLocation must not be empty" });
            }
            if (updatedData.Industry && updatedData.Industry.toString().length === 0) {
                return res.json({ error: "Industry must not be empty" });
            }
            if (updatedData.Website && updatedData.Website.toString().length === 0) {
                return res.json({ error: "Website must not be empty" });
            }
            if (updatedData.password) {
                const minLength = 8;
                const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

                if (updatedData.password.length < minLength) {
                    return res.json({ error: "Password must be at least eight characters long" });
                }

                if (!specialCharacters.test(updatedData.password)) {
                    return res.json({
                        error: "Password must contain at least one special character",
                    });
                }

                // Hash the password before updating
                updatedData.password = await bcrypt.hash(updatedData.password, 10);
            }
        }

        const updateStatus = await UserModel.findByIdAndUpdate(AdminId, updatedData, { new: true });

        if (!updateStatus) {
            return res.status(400).json({ message: "No such ID found" });
        }

        console.log(updateStatus);
        return res.status(200).json(updateStatus);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = Put;
