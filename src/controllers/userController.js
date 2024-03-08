import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.errorMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // All, id

    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: 'Missing required parameter',
            users: []
        })
    }

    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errorCode: 0,
        errorMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            errorMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUserdata(data);
    return res.status(200).json(message)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
}