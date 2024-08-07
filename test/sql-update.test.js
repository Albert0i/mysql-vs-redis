import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

afterAll( async () => await prisma.posts.count({}));
afterAll( async () => await prisma.$disconnect() );

test("select 100,000 posts (ORM)", async () => {
    // Time matters... 
    let response, i, j
    for (let i=1; i <= 100000; i++) {
        j = Math.floor(Math.random() * 1000000) + 1;
        response = await prisma.posts.findUnique( { where: { id: j } } ) 
    }
}, 60 * 60 * 1000)

test("select and update 100,000 posts (ORM)", async () => {
    // Time matters... 
    let response, i, j
    for (let i=1; i <= 100000; i++) {
        j = Math.floor(Math.random() * 1000000) + 1;
        response = await prisma.posts.findUnique( { where: { id: j } } ) 

        await prisma.posts.update( { where: { id: j },
            data: { 
                    userId: response.userId, 
                    title: response.title, 
                    body: response.body
             } } )
    }
}, 60 * 60 * 1000)

test("select 100,000 posts (SQL)", async () => {
    // Time matters... 
    let response, i, j
    for (let i=1; i <= 100000; i++) {
        j = Math.floor(Math.random() * 1000000) + 1;
        response = await prisma.$queryRaw`select * from posts where id=${j}`
    }
}, 60 * 60 * 1000)

test("select and update 100,000 posts (SQL)", async () => {
    // Time matters... 
    let response, i, j
    for (let i=1; i <= 100000; i++) {
        j = Math.floor(Math.random() * 1000000) + 1;
        response = await prisma.$queryRaw`select * from posts where id=${j}`

        await prisma.$executeRaw`update posts set userId=${response[0].userId}, title=${response[0].title}, body=${response[0].body} where id=${j}`
    }
}, 60 * 60 * 1000)
