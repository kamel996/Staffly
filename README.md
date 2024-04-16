Welcome!

This project provides a foundation for managing employee data in your application. It allows you to create, view, edit, and filter employee information, helping you keep track of your team effectively.

Prerequisites:

Before diving in, ensure you have the necessary dependencies installed:

Bash
npm install
Use code with caution.
Configuration:

Create .env file: Duplicate the .env.example file and rename it to .env.
Set environment variables: Replace the placeholders in .env with your actual database credentials (refer to .env.example for guidance).
Seeding the Database (Optional):

To populate your database with sample employee data for testing:

Bash
npx prisma db seed
Use code with caution.
This command executes the seed.ts script, which generates sample employees.

To start the development of the app:

npm run dev

The app is hosted by vercel: https://test-klevr.vercel.app/

Features:

Employee Management:
Create, view, and edit employee information (name, email, location, department, image).
Enforces unique email constraints to prevent duplicate entries.
Filtering:
Filter employees by name, email, location, and department for efficient searching.
Pagination:
View employee data in manageable chunks (pages) for large datasets.


Have Fun!

We hope this project simplifies your employee management tasks. Feel free to explore its features and customize it to suit your specific needs.