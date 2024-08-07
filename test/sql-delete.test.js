import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

afterAll( async () => await prisma.posts.count({}));
afterAll( async () => await prisma.$disconnect() );

test.skip("select 100,000 posts (ORM)", async () => {
    // Time matters... 
    let response, i, j
    for (let i=1; i <= 100000; i++) {
        j = Math.floor(Math.random() * 1000000) + 1;
        response = await prisma.posts.findUnique( { where: { id: j } } ) 
    }
}, 60 * 60 * 1000)

test.skip("select and delete 100,000 posts (ORM)", async () => {
    // Time matters... 
    let response, i, j
    for (let i=1; i <= 100000; i++) {
        j = Math.floor(Math.random() * 1000000) + 1;
        response = await prisma.posts.findUnique( { where: { id: j } } ) 
        
        await prisma.posts.deleteMany( { where: { id: j } } )
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

test("select and delete 100,000 posts (SQL)", async () => {
    // Time matters... 
    let response, i, j
    for (let i=1; i <= 100000; i++) {
        j = Math.floor(Math.random() * 1000000) + 1;
        response = await prisma.$queryRaw`select * from posts where id=${j}`

        await prisma.$executeRaw`delete from posts where id=${j}`
    }
}, 60 * 60 * 1000)
