import express from 'express';
import postsRouter from '../posts/posts.router';
import { defaultErrorHandler } from './app.middleware'
const app = express()

app.use(express.json())

app.use(postsRouter)

app.use(defaultErrorHandler)

export default app