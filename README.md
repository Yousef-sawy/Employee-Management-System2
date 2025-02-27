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
![Screenshot 2025-02-27 103435](https://github.com/user-attachments/assets/2f97c194-2df4-43fc-a573-f97473c30b81)
![Screenshot 2025-02-27 103418](https://github.com/user-attachments/assets/7f17845b-1dc3-4e6b-b4fd-24a7b72f7b66)
![Screenshot 2025-02-27 103402](https://github.com/user-attachments/assets/221b632f-bacb-439d-9114-c7fcd674f75f)
![Screenshot 2025-02-27 103322](https://github.com/user-attachments/assets/7b639ed1-485f-4d98-b73a-8f574a6b4b29)
![Screenshot 2025-02-27 103304](https://github.com/user-attachments/assets/8faefad7-54b1-4a9a-8ee5-394907151cfc)
![Screenshot 2025-02-27 103236](https://github.com/user-attachments/assets/a1d18f69-60b9-4d2c-ae6c-057741056c7b)
![Screenshot 2025-02-27 103200](https://github.com/user-attachments/assets/fa57e8f7-e7bc-47c1-9603-8ecc3340cf08)
![Screenshot 2025-02-27 103128](https://github.com/user-attachments/assets/60b8d10a-2514-4e21-9b1d-5b3b58566891)
![Screenshot 2025-02-27 104012](https://github.com/user-attachments/assets/96653885-9cde-4d4c-9dd0-ecb03ff8d150)
![Screenshot 2025-02-27 104002](https://github.com/user-attachments/assets/10793716-95c0-4074-91c6-65564c350dbc)
![Screenshot 2025-02-27 103604](https://github.com/user-attachments/assets/ef58bc50-8cca-4d1e-877d-20ee81ab99c1)
![Screenshot 2025-02-27 103555](https://github.com/user-attachments/assets/393c36a8-49c6-4451-85f0-bfb7d948d7f8)
