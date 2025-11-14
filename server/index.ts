import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import path from 'path'
import { fileURLToPath } from 'url'
// import routes from './routes'
// --- Setup for __dirname in ES Modules ---
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
)

app.use(passport.initialize())
app.use(passport.session())

// --- Your API Routes ---
// app.use('/api', routes)

// --- Production: Serve React App ---
// This part is correct and unchanged
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client')
  app.use(express.static(clientBuildPath))

  // Serve the index.html for any non-API route
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'))
  })
}

// --- Vercel: Export the app handler ---
// DO NOT call app.listen() or server.listen()
export default app