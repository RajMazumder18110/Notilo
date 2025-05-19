**Notilo** Backend is the core server-side application powering the Notilo blogging platform — a clean, minimalist space designed for thoughtful content creation and meaningful user interactions.

Built with **NestJS** and **Drizzle ORM**, this backend provides robust and scalable APIs to manage:

- User authentication & registration with secure JWT-based flows
- Blog management, allowing authenticated users to create, update, and delete blog posts
- Commenting system to foster community engagement on blog posts
- Like/unlike functionality for lightweight, expressive feedback
- Modular architecture with clear separation of concerns — controllers handle HTTP requests, services manage business logic, and repositories encapsulate database operations
  
The project embraces best practices including layered architecture, DTOs for data validation, custom exceptions, global error handling, and unit testing support to ensure maintainability and extensibility.
