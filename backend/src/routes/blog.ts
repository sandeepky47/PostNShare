import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@sandeepky47/medium-common';

// Create the main Hono app
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization') || "";
    try{
        if (!authHeader) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        const payload = await verify(authHeader, c.env.JWT_SECRET);
        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        c.set('userId', payload.id);
        await next()

    }catch(e){
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
})

blogRouter.post('/', async (c) => {
    const authorId = c.get('userId');
    console.log(`Inside blog post ().............${authorId}`);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const publishDateTimeType = typeof(body.publishDateTime);
    console.log(`Create blog body ().............${body.publishDateTime}`);
    console.log(`Type ().............${publishDateTimeType}`);


    const {success} = createBlogInput.safeParse(body);
    console.log(`is zod success ().............${success}`);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are correct"
        })
    }
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId),
            publishDateTime: body.publishDateTime
        }
    })

    return c.json({
        id: post.id
    });
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are correct"
        })
    }
    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: post.id
    });
})

//todo : add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            publishDateTime: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({ posts });
})

blogRouter.get('/author', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userPosts = await prisma.post.findMany({
        where: {
            authorId: Number(userId)
        },
        select: {
            title: true,
            content: true,
            id: true,
            publishDateTime: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({ userPosts });
})


blogRouter.get('/:id', async (c) => {
    console.log("Inside blog get ().............");

    const postId = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.findFirst({
        where: {
            id: Number(postId)
        },
        select: {
            id: true,
            title: true,
            content: true,
            publishDateTime: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({ post });
})

