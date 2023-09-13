const getProfile = (req, res) => {
    console.log(req.params);
    try {
        res.status(200).send({
            status: "success",
            data: [],
            message: "This is user profile"
        })
    } catch (error) {
        console.log("Error Found", error);
    }
}

const updateProfile = (req, res) => {
    try {
        res.status(200).send({
            status: "Success",
            data: [],
            message: "User's profile updated"
        })
    } catch (error) {
        console.log("Found Error", error);
    }
}

export { getProfile, updateProfile };