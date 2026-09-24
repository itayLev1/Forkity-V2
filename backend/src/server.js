import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import prisma from './lib/prisma.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);
const FORKIFY_REMOTE_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  password: z.string().min(8),
});

const recipeSchema = z.object({
  title: z.string().min(2),
  sourceUrl: z.string().url(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  publisher: z.string().min(2),
  cookingTime: z.number().int().min(1),
  servings: z.number().int().min(1),
  ingredients: z.array(
    z.object({
      quantity: z.number().nullable().optional(),
      unit: z.string().optional(),
      description: z.string(),
    })
  ),
  userId: z.string().optional(),
});

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.json({ status: 'ok', database: 'unavailable', error: error.message });
  }
});

app.get('/api/users', async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { bookmarks: true, recipes: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users', error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const parsed = userSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(parsed.password, 10);

    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        name: parsed.name ?? 'Forkify user',
        passwordHash,
      },
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create user';
    res.status(400).json({ message, error: message });
  }
});

app.get('/api/recipes', async (_req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: { user: true, bookmarks: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch recipes', error: error.message });
  }
});

app.get('/api/recipes/search', async (req, res) => {
  try {
    const query = String(req.query.search || '').trim();

    if (!query) {
      return res.status(400).json({ message: 'A search query is required' });
    }

    const response = await fetch(`${FORKIFY_REMOTE_URL}?search=${encodeURIComponent(query)}&key=${process.env.FORKIFY_API_KEY || 'demo'}`);
    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(payload);
    }

    return res.json(payload);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to search recipes', error: error.message });
  }
});

app.get('/api/recipes/:id', async (req, res) => {
  try {
    const response = await fetch(`${FORKIFY_REMOTE_URL}/${req.params.id}?key=${process.env.FORKIFY_API_KEY || 'demo'}`);
    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(payload);
    }

    return res.json(payload);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch recipe', error: error.message });
  }
});

app.post('/api/recipes', async (req, res) => {
  try {
    const parsed = recipeSchema.parse(req.body);

    const recipe = await prisma.recipe.create({
      data: {
        title: parsed.title,
        sourceUrl: parsed.sourceUrl,
        imageUrl: parsed.imageUrl || null,
        publisher: parsed.publisher,
        cookingTime: parsed.cookingTime,
        servings: parsed.servings,
        ingredients: parsed.ingredients,
        userId: parsed.userId || null,
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create recipe';
    res.status(400).json({ message, error: message });
  }
});

app.get('/api/users/:userId/bookmarks', async (req, res) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: req.params.userId },
      include: { recipe: true },
    });

    res.json(bookmarks.map((bookmark) => bookmark.recipe));
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch bookmarks', error: error.message });
  }
});

app.post('/api/users/:userId/bookmarks/:recipeId', async (req, res) => {
  try {
    const bookmark = await prisma.bookmark.upsert({
      where: {
        userId_recipeId: {
          userId: req.params.userId,
          recipeId: req.params.recipeId,
        },
      },
      update: {},
      create: {
        userId: req.params.userId,
        recipeId: req.params.recipeId,
      },
    });

    res.status(201).json(bookmark);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create bookmark', error: error.message });
  }
});

app.delete('/api/users/:userId/bookmarks/:recipeId', async (req, res) => {
  try {
    const bookmark = await prisma.bookmark.delete({
      where: {
        userId_recipeId: {
          userId: req.params.userId,
          recipeId: req.params.recipeId,
        },
      },
    });

    res.json({ deleted: true, bookmark });
  } catch (error) {
    res.status(404).json({ message: 'Bookmark not found', error: error.message });
  }
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Forkify backend listening on http://localhost:${PORT}`);
});
