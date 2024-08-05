import { redisClient, disconnect } from '../src/config/redisClient.js'

afterAll( async () => await disconnect() );

test("get post 66", async () => {
    const post = {
      userId: 7,
      id: 66,
      title: "repudiandae ea animi iusto",
      body: "officia veritatis tenetur vero qui itaque\nsint non ratione\nsed et ut asperiores iusto eos molestiae nostrum\nveritatis quibusdam et nemo iusto saepe"
    }
    const response = await redisClient.hgetall(`posts:${66}`) 
    response.id = parseInt(response.id, 10)
    response.userId = parseInt(response.userId, 10)
    expect(response).toEqual(post)
})

test("get 100 posts", async () => {
    // Time matters... 
    let response
    for (let i=1; i <= 100; i++) {
      response = await redisClient.hgetall(`posts:${i}`) 
      response.id = parseInt(response.id, 10)
      response.userId = parseInt(response.userId, 10)
    }
})

test("get 100 posts by 10 times", async () => {
    // Time matters... 
    let response
    for (let j=1; j <=10; j++) 
        for (let i=1; i <= 100; i++) {
          response = await redisClient.hgetall(`posts:${i}`) 
          response.id = parseInt(response.id, 10)
          response.userId = parseInt(response.userId, 10)
      }
})

test("get 100 posts by 100 times", async () => {
  // Time matters... 
  let response
  for (let j=1; j <=100; j++) 
      for (let i=1; i <= 100; i++) {
        response = await redisClient.hgetall(`posts:${i}`) 
        response.id = parseInt(response.id, 10)
        response.userId = parseInt(response.userId, 10)
    }
})

test("get 100 posts and update", async () => {
  // Time matters... 
  let response
  for (let i=1; i <= 100; i++) {
    response = await redisClient.hgetall(`posts:${i}`) 
    response.id = parseInt(response.id, 10)
    response.userId = parseInt(response.userId, 10)
    await redisClient.hmset(`posts:${i}`, {
            userId: response.userId,
            title: response.title,
            body: response.body
          })
  }
})

test("get 100 posts and delete", async () => {
  // Time matters... 
  let response
  for (let i=1; i <= 100; i++) {
    response = await redisClient.hgetall(`posts:${i}`) 
    response.id = parseInt(response.id, 10)
    response.userId = parseInt(response.userId, 10)
    await redisClient.del(`posts:${i}`)
  }
})
