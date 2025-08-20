import express from 'express'
import { generateImageController } from '../controllers/Image'

const router = express.Router()

router.post('/generateImage', generateImageController)

export default router