# Panteon Demo Project

## This project made for Panteon Games

I used 10.000 random user data. To not to add extra logic on demo I decided not to take of money in mongodb.

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
    - this endpoint will end the week and distribute prize money on MONGODB
```