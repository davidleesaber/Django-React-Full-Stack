# Project README

## Overview

This is a full-stack web application designed for secure user authentication and note management. The site is live at:

```
https://1029846b-a721-4c02-8f3f-7a20937d92b5.e1-us-east-azure.choreoapps.dev
```

Built with a **Django** backend and a **React** frontend, it employs **JWT (JSON Web Tokens)** for robust authentication, connects to a managed **PostgreSQL** database, and is deployed via **Choreo** for streamlined integration and cloud hosting.

***

## Features

- **User Registration**: Visit `/register` to create a new account.
- **User Login**: Access `/login` to authenticate with an existing account.
- **User Logout**: Use `/logout` to sign out securely.
- **404 Error Handling**: Any other route (e.g., `/anythingelse`) leads to a custom 404 error page.

***

## Tech Stack

### Backend

- **Django (Python)**: REST API backend providing secure, scalable user and note functionality.
- **JWT Authentication**: Implements user authentication with JWT tokens for stateless, secure session management.
- **PostgreSQL**: All user and note data is stored in a managed PostgreSQL database via Choreo.

### Frontend

- **React**: Handles interactive UI and client-side routing for registration, login, notes, and error pages.
- **JavaScript (JSX)**: Main logic and component rendering.
- **CSS**: Custom styling for user-friendly layouts and forms.

### Deployment & Integration

- **Choreo**: Both backend and frontend are deployed using Choreo, which seamlessly connects services and manages environment variables and DB connection.
- **Database**: Leveraged Choreo’s managed PostgreSQL instance to store and retrieve user credentials and data.

***

## Usage Instructions

1. **Register**  
   Go to [`/register`](https://1029846b-a721-4c02-8f3f-7a20937d92b5.e1-us-east-azure.choreoapps.dev/register) to create a new account.
2. **Login**  
   Navigate to [`/login`](https://1029846b-a721-4c02-8f3f-7a20937d92b5.e1-us-east-azure.choreoapps.dev/login) to sign in.
3. **Logout**  
   Visit [`/logout`](https://1029846b-a721-4c02-8f3f-7a20937d92b5.e1-us-east-azure.choreoapps.dev/logout) to log out.
4. **Error Handling**  
   Any other path (e.g. `/dashboard` if not configured) directs you to a custom 404 page.

***

## Development Notes

- **CORS**: Configured Django with `django-cors-headers` to allow cross-origin requests from the React frontend.
- **JWT**: All user authentication uses Django REST Framework Simple JWT for secure credential exchange.
- **API Endpoints**:  
   - `/api/register/` for account creation  
   - `/api/token/` for login and token retrieval  
   - `/api/token/refresh/` for refreshing tokens  
   - `/api/notes` for note management (protected routes)
- **React Routing**: Utilizes React Router for handling front-end navigation.
- **Error Logging**: Comprehensive error handling for login failures and invalid routes.

***

## Getting Started (For Developers)

1. **Clone the repo**  
   ```
   git clone https://github.com/yourusername/your-repo-name.git
   ```
2. **Backend**  
   - Configure Django settings for JWT and CORS.
   - Connect to Choreo-managed PostgreSQL using service environment variables.
   - Run Django migrations.
3. **Frontend**  
   - Install dependencies (`npm install`).
   - Start with `npm run dev`.
   - Communicate with backend via configured API endpoints.
4. **Deployment**  
   - Deploy both services via Choreo dashboard.
   - Set necessary secrets/environment variables in Choreo.

***

## License

This project is released under the MIT License.

***

## Author

Made by [your name or username].

***

If you have any questions or want to contribute, feel free to open an issue or pull request on GitHub!
