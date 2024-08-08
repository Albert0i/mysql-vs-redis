### MySQL vs Redis ─── The final struggle 


#### Prologue 
To quest for ultimate power, to revenge for his dead buddies, [ZX-Tole](https://guyver.fandom.com/wiki/ZX-Tole) sacrificed his glories and life to transmorph himself into [Neo ZX-Tole](https://guyver.fandom.com/wiki/Neo-ZX-Tole) in an effort to triumph over [Guyver](https://guyver.fandom.com/wiki/Guyver_Unit). With overwhelming speed and forbidden weapon, he knew well that his capability is unrivalled but his days were numbered. No matter win or lose, after the final battle he *must* die... 


#### I. Desperation
> Storage engines are MySQL components that handle the SQL operations for different table types. [InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html) is the default and most general-purpose storage engine, and Oracle recommends using it for tables except for specialized use cases. (The CREATE TABLE statement in MySQL 8.4 creates InnoDB tables by default.)

> [InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html) is a general-purpose storage engine that balances high reliability and high performance. 

> The [MEMORY Storage Engine](https://dev.mysql.com/doc/refman/8.4/en/memory-storage-engine.html) (formerly known as HEAP) creates special-purpose tables with contents that are stored in memory. Because the data is vulnerable to crashes, hardware issues, or power outages, only use these tables as temporary work areas or read-only caches for data pulled from other tables.

> In-memory storage for fast access and low latency. Data volume can fit entirely in memory without causing the operating system to swap out virtual memory pages.


#### II. System Setup 
To squeeze out the last drop of power, we are going to re-create `posts` table using `Memory Storage Engine`. Schema is slightly modify since `BLOB` and `TEXT` are not supported by MEMORY. 
```
DROP TABLE posts;

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    title VARCHAR(128) NOT NULL,
    body VARCHAR(256) NOT NULL
) ENGINE=MEMORY;
```

To increase heap size by adding the line: 
```
SET max_heap_table_size = 1680M;
```

To `my.ini`. Shut down and restart MySQL. Re-seed database with: 
```
npx prisma db seed 
```

![alt mem1](img/mysql-size-mem-1.JPG)

![alt mem2](img/mysql-size-mem-2.JPG)


#### III. Read and Update 
```
npm test -t sql-update 
```
![alt sql update mem](img/test-sql-update-mem.JPG)

Comparing to the figures in [Part two](README-Part2.md), performance is increased by half and still twice slower than in Redis. 


#### IV.  Read and Delete 
```
npm test -t sql-delete 
```
![alt sql delete mem](img/test-sql-delete-mem.JPG)

Comparing to the figures in [Part two](README-Part2.md), performance is increased by one third and still 3 times slower than in Redis. 


#### V. Introspection 


#### VI. Bibliography 
[18.3 The MEMORY Storage Engine](https://dev.mysql.com/doc/refman/8.4/en/memory-storage-engine.html)


#### Epilogue

![alt machine info](img/machine-info.JPG)

#### EOF (2024/08/09)

> The MEMORY storage engine (formerly known as HEAP) creates special-purpose tables with contents that are stored in memory. Because the data is vulnerable to crashes, hardware issues, or power outages, only use these tables as temporary work areas or read-only caches for data pulled from other tables.

> In-memory storage for fast access and low latency. Data volume can fit entirely in memory without causing the operating system to swap out virtual memory pages.

Run the following SQL commands: 
```
DROP TABLE posts;

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    title VARCHAR(128) NOT NULL,
    body VARCHAR(256) NOT NULL
) ENGINE=MEMORY;
```
Add to `my.ini`: 
```
SET max_heap_table_size = 1680M;
```

Desperation drives
To pray for overwhelming powder triumphing Guyver, ZX-Tole sacrifices his glory and life to revenge for his dead buddies. 
Desperation, regardless of costs. last resort. ultimate, forbidden tricks. 
extreme squeeze and twist. 



