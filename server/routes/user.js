const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');

router.get('/',userController.view);
router.post('/',userController.find);
router.get('/:id',userController.delete);
router.get('/adduser/1',userController.form);
router.post('/adduser/1',userController.create);
router.get('/edituser/:id',userController.edit);
router.post('/edituser/:id',userController.update);
router.get('/viewuser/:id',userController.userview);


module.exports=router;