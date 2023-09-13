const registration = async (req, res)=>{
    res.status(200).send({
        status: "Success",
        message: "User signed up successfully",
    });
}

const login = (req, res) => {
    res.status(200).send({
        status: "Success",
        message: "User logged in successfully"
    });
}

export {login, registration};