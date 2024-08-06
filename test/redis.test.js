import { redisClient, disconnect } from '../src/config/redisClient.js'

afterAll( async () => await redisClient.ping() );
afterAll( async () => await disconnect() );

test("get 100,000 posts", async () => {
    // Time matters... 
    let response, i, j
    for (let i=1; i <= 100000; i++) {
        j = Math.floor(Math.random() * 1000000) + 1;
        response = await redisClient.hgetall(`posts:${j}`) 
        response.id = parseInt(response.id, 10)
        response.userId = parseInt(response.userId, 10)
      }
    }, 60 * 60 * 1000)
