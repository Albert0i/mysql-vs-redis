import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

afterAll( async () => await prisma.$disconnect() );

test("select post 66 (ORM)", async () => {
    const post = {
      userId: 7,
      id: 66,
      title: "repudiandae ea animi iusto",
      body: "officia veritatis tenetur vero qui itaque\nsint non ratione\nsed et ut asperiores iusto eos molestiae nostrum\nveritatis quibusdam et nemo iusto saepe"
    }
    const response = await prisma.posts.findMany( { where: { id: 66 } } ) 
    expect(response.length).toBe(1)
    expect(response[0]).toEqual(post)
})

test("select post 66 (SQL)", async () => {
    const post = {
      userId: 7,
      id: 66,
      title: "repudiandae ea animi iusto",
      body: "officia veritatis tenetur vero qui itaque\nsint non ratione\nsed et ut asperiores iusto eos molestiae nostrum\nveritatis quibusdam et nemo iusto saepe"
    }
    const response = await prisma.$queryRaw`select * from posts where id=${66}`
    expect(response.length).toBe(1)
    expect(response[0]).toEqual(post)
})

test("select 100 posts (ORM)", async () => {
    // Time matters... 
    let response
    for (let i=1; i <= 100; i++) 
        response = await prisma.posts.findMany( { where: { id: i } } ) 
})

test("select 100 posts (SQL)", async () => {
    // Time matters... 
    let response
    for (let i=1; i <= 100; i++) 
    response = await prisma.$queryRaw`select * from posts where id=${i}`
})

test("select 100 posts (ORM) by 10 times", async () => {
    // Time matters... 
    let response
    for (let j=1; j <=10; j++) 
        for (let i=1; i <= 100; i++) 
            response = await prisma.posts.findMany( { where: { id: i } } ) 
})
  
test("select 100 posts (SQL) by 10 times", async () => {
    // Time matters... 
    let response
    for (let j=1; j <=10; j++) 
        for (let i=1; i <= 100; i++) 
            response = await prisma.$queryRaw`select * from posts where id=${i}`
})    

test("select 100 posts (ORM) by 100 times", async () => {
    // Time matters... 
    let response
    for (let j=1; j <=100; j++) 
        for (let i=1; i <= 100; i++) 
            response = await prisma.posts.findMany( { where: { id: i } } ) 
})
      
test("select 100 posts (SQL) by 100 times", async () => {
    // Time matters... 
    let response
    for (let j=1; j <=100; j++) 
        for (let i=1; i <= 100; i++) 
            response = await prisma.$queryRaw`select * from posts where id=${i}`
})    

test("select 100 posts and update (ORM)", async () => {
    // Time matters... 
    let response
    for (let i=1; i <= 100; i++) {
        response = await prisma.posts.findMany( { where: { id: i } } ) 
        await prisma.posts.update( { where: { id: i },
                                     data: { userId: response.userId, 
                                             title: response.title, 
                                             body: response.body
                                      } } )
    }
})

test("select 100 posts and update (SQL)", async () => {
    // Time matters... 
    let response
    for (let i=1; i <= 100; i++) {
        response = await prisma.$queryRaw`select * from posts where id=${i}`
        await prisma.$executeRaw`update posts set userId=${response.userId}, title=${response.title}, body=${response.body} where id=${response.id}`
    }    
})

test("select 100 posts and delete (ORM)", async () => {
    // Time matters... 
    let response
    for (let i=1; i <= 100; i++) {
        response = await prisma.posts.findMany( { where: { id: i } } ) 
        await prisma.posts.delete( { where: { id: i } } )
    }
})

test("select 100 posts and delete (SQL)", async () => {
    // Time matters... 
    let response
    for (let i=1; i <= 100; i++) {
        response = await prisma.$queryRaw`select * from posts where id=${i}`
        await prisma.$executeRaw`delete from posts where id=${response.id}`
    }    
})
