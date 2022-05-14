// Importera npm-paket och moduler
// Allmänna inställningar
import express from 'express'
import cors from 'cors'
import path from 'path'
const app = express()
const PORT = process.env.PORT || 1975
import hamsters from './routes/hamsters.js'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distPath = path.join(__dirname, '/../dist/')
console.log('distpath', distPath)
// Middleware

// CORS öppnar vårt projekt så det kan användas från andra domäner
app.use(cors())
// Serve static files in this folder
app.use(express.static(path.join(__dirname, 'img')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(distPath))

app.use('/img', express.static(path.join(__dirname, '/img')))
// Parse request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
// Logger - skriv ut information om inkommande request
app.use((req, res, next) => {
  console.log(`Logger: ${req.method}  ${req.url} `, req.body)
  next()
})

// Routes
app.use('/hamsters', hamsters)
// Övriga endpoints för att funka med react router i frontend
app.all('*', (req, res) => {
  res.sendFile(distPath + 'index.html')
})

// Starta server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)
})
