import { glob } from 'astro/loaders'
import { z, defineCollection } from 'astro:content'

const postsCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/_*.md', '!**/*.excalidraw.md'],
    base: './src/content/posts',
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lastMod: z.date().optional(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    comments: z.boolean().default(true),
    draft: z.boolean().default(false),
    sticky: z.number().default(0),
  }),
})

const projectsCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.yml', '**/*.yaml'],
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    link: z.string().url(),
  }),
})

const specCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/_*.md', '!**/*.excalidraw.md'],
    base: './src/content/spec',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    comments: z.boolean().default(true),
  }),
})

const friendsCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.yml', '**/*.yaml'],
    base: './src/content/friends',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    avatar: z.string(),
    link: z.string().url(),
  }),
})

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
  spec: specCollection,
  friends: friendsCollection,
}
