## Setup Instructions

1. Clone the Repository:

2. Install Dependencies: `npm install`

3. Configure the Environment

- Create a `.env` file in the root of the project with the `DATABASE_URL` and `PORT`.
- Add the following environment variables:
  `DATABASE_URL=mysql://username:password@localhost:3306/dbname`
  `PORT=4000`

# Replace username, password, localhost, and dbname with your MySQL credentials.

4. Set Up the Database:

- Run the Prisma migrations to initialize the database schema: ` npx prisma migrate dev`

- Optionally, generate the Prisma Client: `npx prisma generate`

5.  Start the Server

- Run the server in development mode: `npm run dev`
