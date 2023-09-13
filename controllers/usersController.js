import Users from '../MOCK_DATA.json' assert { type: 'json'};

const getUsers = async (req, res) => {
    // const users = await Users.find();

    // return res.json(users)
    res.status(200).send({
        status: 'Success',
        message: 'Users data found',
        data: Users
    })
}

const getUser = async (req, res) => {
    // console.log("ID: ", req.params.id)
    const ID = Number(req.params.id);
    const user = Users.find(item => item.id === ID);
    // console.log(user);

    try {
        res.status(200).send({
            status: 'Success',
            message: 'Individual user data found',
            data: user
        })
    }  catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
    

export { getUsers, getUser }