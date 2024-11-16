import { Router } from "express";
import * as locationController from "../controllers/location.controller";

const router = Router();

router.post('/', locationController.createLocationHandler);
router.get('/', locationController.getAllLocationsHandler);
router.get('/:id', locationController.getLocationByIdHandler);
router.put('/:id', locationController.updateLocationHandler);
router.delete('/:id', locationController.deleteLocationHandler);

export default router;