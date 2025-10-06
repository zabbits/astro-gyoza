import { glob } from 'astro/loaders'
import { z, defineCollection } from 'astro:content'
import { contentPath } from './config.json'

const BASE = process.env.CONTENT_PATH_BASE || contentPath.base

const paths = {
  posts: BASE,
  projects: `${BASE}/projects`,
  spec: `${BASE}/spec`,
  friends: `${BASE}/friends`,
  miscellanea: `${BASE}/miscellanea`,
}

const postsCollection = defineCollection({
  loader: glob({
    pattern: [
      '**/*.md',
      '!**/_*.md',
      '!**/*.excalidraw.md',
      '!projects/**',
      '!spec/**',
      '!friends/**',
      '!miscellanea/**',
      '!.obsidian/**',
      '!Work/**',
      '!work/**',
    ],
    base: `${BASE}`,
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
    base: paths.projects,
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
    base: paths.spec,
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
    base: paths.friends,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    avatar: z.string(),
    link: z.string().url(),
  }),
})

const miscellaneaCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/_*.md'],
    base: paths.miscellanea,
  }),
  schema: z.object({
    date: z.date(),
  }),
})

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
  spec: specCollection,
  friends: friendsCollection,
  miscellanea: miscellaneaCollection,
}
