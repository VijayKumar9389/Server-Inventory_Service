import {Router} from "express";
import * as itemController from "../controllers/tool.controller";
import upload from "../middleware/upload";

const router = Router();

router.post('/', upload.single('image'), itemController.createItem);
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.put('/:id', upload.single('image'), itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

//get tools by location id
router.get('/location/:locationId', itemController.getToolsByLocation);
//get tools by category id
router.get('/category/:categoryId', itemController.getItemsByCategory);

export default router;