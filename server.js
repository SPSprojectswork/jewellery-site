import express from 'express'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())

// Target upload directory: /public/products/
const uploadDir = path.join(__dirname, 'public', 'products')

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Ensure manifest exists
const manifestPath = path.join(uploadDir, 'manifest.json')
function updateManifest() {
  const files = fs.readdirSync(uploadDir)
    .filter(file => file !== 'manifest.json' && /\.(jpg|jpeg|png|webp)$/i.test(file))
  fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2))
}
if (!fs.existsSync(manifestPath)) updateManifest()

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Unique name to avoid overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage })

// Upload Endpoint
app.post('/api/upload', upload.array('images'), (req, res) => {
  try {
    updateManifest() // Re-generate manifest after new files arrive
    res.status(200).json({ message: 'Files uploaded successfully', files: req.files })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to upload files' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`[Admin Upload API] running on http://localhost:${PORT}`)
})
