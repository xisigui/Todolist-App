# TodoFlow 

TodoFlow is a full-stack task management application where users can **add**, **edit**, **delete**, and **mark tasks as complete**.
## ✨ Features

- ✅ User Registration & Authentication
- ➕ Add new tasks
- ✏️ Edit existing tasks
- ❌ Delete tasks
- ✔️ Mark tasks as complete/incomplete
- 🔐 Secure API endpoints

## 🛠️ Tech Stack

### Backend
- **Python**
- **Django**
- **Django REST Framework**

### Frontend
- **React**
- **Next.js**

## 🚀 Getting Started

### Backend Setup

1. Clone the repository and navigate to the backend directory:

```bash
git clone https://github.com/xisigui/Todolist-App.git
cd Todolist-App/backend
```

2. Create a virtual environment and activate it:

```bash
python -m venv env
source env/bin/activate  # On Windows use `env\\Scripts\\activate`
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Copy the environment example file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file with your preferred settings (e.g., `SECRET_KEY`, `CORS_ALLOWED_ORIGINS`, etc.).

5. Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

---

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment example file and configure it:

```bash
cp .env.example .env
```

Edit `.env` to ensure the API URL matches your backend server (e.g., `http://localhost:8000`).

4. Run the development server:

```bash
npm run dev
```

---

## 🔐 Authentication

TodoFlow uses token-based authentication. Upon registration/login, users receive a token used to access secured endpoints.
