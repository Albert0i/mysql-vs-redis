import { redisClient } from './redisClient.js'
import { postsData } from '../../data/postsData.js'

async function main() {
   let response
   // Erase old data... 
   // response = await prisma.movie.deleteMany()
   // Won't reset autonum field to 1 !!!
   response = await redisClient.flushdb()
   console.log('Data flushed') 

   // Seed new data 
   for (let i = 0; i < postsData.length; i++) {      
     response = await redisClient.hmset(`posts:${postsData[i].id}`, postsData[i] ) 
     console.log(`posts:${postsData[i].id} is ${response}`)
   }
    console.log(`${postsData.length} hash(es) created`) 
  }

main()
  .then(async () => {
    await redisClient.quit()
  })
  .catch(async (e) => {
    console.error(e)
    await redisClient.$disconnect()
    process.exit(1)
  })

/*
   Seeding
   https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#integrated-seeding-with-prisma-migrate   

   Raw queries
   https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries
*/