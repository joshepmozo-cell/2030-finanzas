import { Router } from 'express'
import * as salaryController from '../controllers/salaryController'

const router = Router()

router.get('/',  salaryController.getCurrentSalary)
router.post('/', salaryController.upsertSalary)

export default router