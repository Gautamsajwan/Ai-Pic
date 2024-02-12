import express from 'express'
import { generateImageController } from '../controllers/Dalle.js'

const router = express.Router()

router.post('/generateImage', generateImageController)

export default router