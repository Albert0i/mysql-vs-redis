### MySQL vs Redis 


#### Prologue 
Time, as an ambiguous concept, hardly can one get hold of. We can definitely say *sixty years is too short* and at the same time *60 seconds is too long* without any contradictions. It all depends on where we stand and how we view. Ever since I started learning Redis, I was told that it is very fast.... But how fast it is when comparing to MySQL, for example? IMHO, SQL Server was an ingenious invention which solves hundreds and thousands of problems in day-to-day life. What the dickens are we doing with Redis? What we gain and what we lose? These are the main subject of this article. 


#### I. System setup 
```
npm init 
npm install ioredis prisma
npm install jest --save-dev 
```

Sample data are [100 posts](https://jsonplaceholder.typicode.com/posts) from [{JSON} Placeholder](https://jsonplaceholder.typicode.com/). I slight modify it for easy ingestion to databases. 

MySQL Version 8.0.30 and Redis Version 7.4.2 are installed locally, we choose package prisma for MySQL and ioredis for Redis. Choosing prisma simply because it's possible to move to other RDBMS with ease and can compare ORM and raw SQL performance. 

To begin with: 
```
npx prisma init
```

A Posts model is created in prisma/schema.prisma:
```
model Posts {
  id        Int     @id 
  userId    Int
  title     String
  body      String @db.Text
}
```

To create posts table in MySQL:
```
npx prisma db push 
```

To create Prisma Client, which is for ORM:
```
npx prisma generate 
```

Add this code fragment to package.json: 
```
  "prisma": {
    "seed": "node prisma/seed.js"
  }
```

Add seed.js to prisma folder, and to seed database with: 
```
npx prisma db seed 
```

![alt posts mysql](img/posts-mysql.JPG)

We use hash to store posts data in Redis. No schema is necessary. A seed-redis.js is create in config folder. To seed database with: 
```
npm run seed-redis
```

![alt posts redis](img/posts-redis.JPG)


#### II. Run Run Run 
![alt sql](img/test-sql.JPG)

I do not oppose to the idea of ORM but it does pose some overhead indeed. Using direct SQL to read 10,000 posts is 2477 ms, much faster than one can expect... Which means our MySQL server can serve 403 read requests per second in current setting. 

![alt redis](img/test-redis.JPG)

In Redis, the story is different. To get 10,000 posts is 872 ms, which is fast but not as fast as one can expect... Which means our Redis server can serve 1146 read requests per second in current setting. 

However, the difference diverges when more complex operations are involved. 


#### III. Bibliography 
1. [ioredis](https://github.com/redis/ioredis)
2. [MySQL/MariaDB](https://www.prisma.io/docs/orm/overview/databases/mysql)
3. [jest](https://www.npmjs.com/package/jest?activeTab=readme)
4. [THE BIG FOUR](https://www.gutenberg.org/files/70114/70114-h/70114-h.htm)


#### Epilogue 


### EOF (2024/08/09)