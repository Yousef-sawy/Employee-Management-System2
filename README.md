# Employee Management System

This is a full-stack Employee Management System built using Django (Backend) and Vue.js (Frontend). It provides role-based access control, with the admin role fully implemented, and RESTful APIs for efficient employee management. The employee role is currently under development.

**Important:** Before using the website, you must register an account and then log in.

## Features

* **User Management:**
    * Authentication (login/logout).
    * Role-based access control (Admin - fully implemented, Employee - under development).
* **Company Module:**
    * Create and manage company records.
* **Department Module:**
    * Assign departments to companies.
* **Employee Module:**
    * Add and manage employees within departments.
* **RESTful API:**
    * Fully functional API for frontend interaction.
* **Security:**
    * JWT authentication with access tokens.

## Tech Stack

### Backend (Django)

* Django
* Django REST Framework (DRF)
* Django ORM
* SQLite (Database)
* JWT Authentication with access tokens
* Role-based access control

### Frontend (Vue.js)

* Vue.js
* Vue Router
* Vuex (State Management)
* Axios (API Calls)

## Getting Started

### Prerequisites

* Python (3.7+)
* Node.js (12+)
* SQLite

### Backend Setup (Django)

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <backend-directory>
    ```

2.  **Create a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On macOS/Linux
    venv\Scripts\activate      # On Windows cmd
    venv\Scripts\Activate.ps1 # On windows powershell
    ```

3.  **Install Django and related packages:**

    ```bash
    pip install django
    pip install djangorestframework
    pip install django-cors-headers
    pip install djangorestframework-simplejwt
    ```

4.  **Configure database settings:**

    * Update database settings in `settings.py`.

5.  **Run migrations:**

    ```bash
    cd <backend-directory>
    python manage.py makemigrations
    python manage.py migrate
    ```

6.  **Create a superuser:**

    ```bash
    python manage.py createsuperuser
    ```

7.  **Run the development server:**

    ```bash
    python manage.py runserver
    ```

### Frontend Setup (Vue.js)

1.  **Navigate to the frontend directory:**

    ```bash
    cd <frontend-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run serve
    ```

### API Endpoints

Once the backend server is running and you are authenticated, you can access the following API endpoints:

* **Users:** `http://127.0.0.1:8000/api/users/`
* **Companies:** `http://127.0.0.1:8000/api/companies/`
* **Departments:** `http://127.0.0.1:8000/api/departments/`
* **Employees:** `http://127.0.0.1:8000/api/employees/`

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

![Screenshot 2025-02-27 111501](https://github.com/user-attachments/assets/2a4406c8-3488-4037-96bf-6cc95a9d31c4)
![Screenshot 2025-02-27 111204](https://github.com/user-attachments/assets/19835894-4bb1-4259-8a81-4fcd0368f3e9)
![Screenshot 2025-02-27 111154](https://github.com/user-attachments/assets/e1105a6d-de8d-4017-9bed-f9df29033f8b)
![Screenshot 2025-02-27 111144](https://github.com/user-attachments/assets/37a24b34-5fd7-4512-b080-56f3aaf4e0a2)
![Screenshot 2025-02-27 111107](https://github.com/user-attachments/assets/41756ca1-a4a0-458e-bf1d-d44f6be0df2d)
