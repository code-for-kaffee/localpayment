const router = require('express').Router();

const {
  registerUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUserByDocNumber,
} = require('../controllers/users');

router.post('/register', registerUser);
router.get('/users', getAllUsers);
router.get('/user/:doc_number', getUserByDocNumber);
router.put('/user/:doc_number', editUser);
router.delete('/user/:doc_number', deleteUser);

module.exports = router;
