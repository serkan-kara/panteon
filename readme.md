# Panteon Demo Project

##### This project made for Panteon Games

I used 10.000 random user data and random money values. To not to add extra logic on demo I decided not to take care of money in mongodb. You can use postman or localhost:3000/dashboard route in react project for manage endpoints. Leaderboard is in main route at localhost:3000/

Credentials used in project can be found under server/config/ folder. I used MongoDB Atlas as MONGODB database and mongo uri is my own account. Redis url set to localhost ( 127.0.0.1:6379 ). You can change redis url if you want.

There is 4 total endpoints, 1 for leaderboard and 3 for management
```
Leaderboard
1) http://localhost:5000/api/board/:id
    - id for current user

Manage
1) http://localhost:5000/api/manage/startWeek
    - this endpoint will reset all data and start fresh week

2) http://localhost:5000/api/manage/nextDay
    - this endpoint will move to next day

3) http://localhost:5000/api/manage/endWeek
    - this endpoint will end the week and distribute prize money to players on MONGODB
```

There is also node-cron module installed for task schedules. You can manage project manually from endpoints or use scheduled tasks. If you want to enable / disable node-cron module you can comment / uncomment below code inside config/db.js

```
await schedule();
```
### Modules used in node project
* [dotenv](https://github.com/motdotla/dotenv)
* [express](https://github.com/expressjs/express)
* [mongoose](https://github.com/Automattic/mongoose)
* [node-cron](https://github.com/node-cron/node-cron)
* [redis](https://github.com/redis/node-redis)
* [colors](https://github.com/Marak/colors.js)