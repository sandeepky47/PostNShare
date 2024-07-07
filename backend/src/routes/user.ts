import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from '@sandeepky47/medium-common';

// Create the main Hono app
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	}
}>();

userRouter.post('/signup', async (c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	try {
		const body = await c.req.json();
		console.log(body);
		const { success } = signupInput.safeParse(body);
		if (!success) {
			c.status(411);
			return c.json({
				message: "Inputs are incorrect"
			})
		}
		const user = await prisma.user.create({
			data: {
				username: body.email,
				password: body.password,
				name: body?.name
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.text(jwt);

	} catch (e) {
		c.status(403);
		console.log(e);
		return c.json({ error: "signing up error" });
	}

})

userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Inputs are correct"
		})
	}
	const user = await prisma.user.findUnique({
		where: {
			username: body.email
		}
	})

	if (!user) {
		c.status(404);
		return c.json({ error: "user not found" });
	}
	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.text(jwt);
})

userRouter.get('/verify', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const authHeader = c.req.header('Authorization') || "";
	try {
		if (!authHeader) {
			c.status(401);
			return c.json({ error: "unauthorized" });
		}
		const payload = await verify(authHeader, c.env.JWT_SECRET);
		if (!payload) {
			c.status(401);
			return c.json({ verified: false });
		}
		return c.json({ verified: true });

	} catch (e) {
		c.status(403);
		return c.json({
			message: "Invalid user"
		})
	}
})

userRouter.get('/userinfo', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const authHeader = c.req.header('Authorization') || "";
	try {
		if (!authHeader) {
			c.status(401);
			return c.json({ error: "unauthorized" });
		}
		const payload = await verify(authHeader, c.env.JWT_SECRET);
		if (!payload) {
			c.status(401);
			return c.json({ verified: false });
		}

		const user = await prisma.user.findUnique({
			where: {
				id: payload.id
			},
			select: {
				id: true,
				name: true,
				username: true
			}
		})

		if (!user) {
			c.status(404);
			return c.json({ error: "user not found" });
		}

		return c.json({ user});

	} catch (e) {
		c.status(403);
		return c.json({
			message: "Invalid user"
		})
	}
})