# BrewFinder ☕️

BrewFinder is a web application for discovering cafes and restaurants in Hyderabad, Sindh, Pakistan.

The application allows users to search, filter, sort, and view information about different places. It also includes an admin panel for managing places stored in a MySQL database.

---

## Features

### User Features

- Browse cafes and restaurants in Hyderabad
- Search places by name
- Filter places by type
- Filter places by area
- Sort places based on rating and other options
- View detailed information about each place
- Responsive user interface
- Real Hyderabad cafes and restaurants

### Admin Features

- Admin login
- View all places
- Add new places
- Edit existing places
- Delete places
- Manage place information through the admin panel

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Website structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | REST API and server |
| MySQL | Database |
| mysql2 | MySQL connection |
| Git | Version control |
| GitHub | Project repository |
| VS Code | Development environment |

---

## Project Structure

```text
BrewFinder/
│
├── backend/
│   ├── data/
│   │   └── places.js
│   ├── db.js
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   ├── admin.css
│   │   ├── login.css
│   │   └── style.css
│   │
│   ├── images/
│   │
│   ├── js/
│   │   ├── admin.js
│   │   ├── login.js
│   │   └── main.js
│   │
│   ├── admin.html
│   ├── index.html
│   └── login.html
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md





Haan bhai 😭 **ab samajh gaya exactly kya problem hai.** Tum README editor mein paste kar rahi ho aur Markdown render/format nahi ho raha because mere previous answer mein **nested code blocks** ki wajah se formatting toot gayi.

Tumhe **raw Markdown text** chahiye jo `README.md` file mein paste karogi, aur GitHub par properly render hoga.

**Isliye neeche wala content exactly copy karo.** Iske andar outer ``` nahi hain.

# BrewFinder ☕️

BrewFinder is a web application for discovering cafes and restaurants in Hyderabad, Sindh, Pakistan.

The application allows users to search, filter, sort, and view information about different places. It also includes an admin panel for managing places stored in a MySQL database.

---

## Features

### User Features

* Browse cafes and restaurants in Hyderabad
* Search places by name
* Filter places by type
* Filter places by area
* Sort places based on rating and other options
* View detailed information about each place
* Responsive user interface
* Real Hyderabad cafes and restaurants

### Admin Features

* Admin login
* View all places
* Add new places
* Edit existing places
* Delete places
* Manage place information through the admin panel

---

## Technologies Used

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| HTML5      | Website structure             |
| CSS3       | Styling and responsive design |
| JavaScript | Frontend functionality        |
| Node.js    | Backend runtime               |
| Express.js | REST API and server           |
| MySQL      | Database                      |
| mysql2     | MySQL connection              |
| Git        | Version control               |
| GitHub     | Project repository            |
| VS Code    | Development environment       |

---

## Project Structure

```text
BrewFinder/
│
├── backend/
│   ├── data/
│   │   └── places.js
│   ├── db.js
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   ├── admin.css
│   │   ├── login.css
│   │   └── style.css
│   │
│   ├── images/
│   │
│   ├── js/
│   │   ├── admin.js
│   │   ├── login.js
│   │   └── main.js
│   │
│   ├── admin.html
│   ├── index.html
│   └── login.html
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```



## Database

BrewFinder uses **MySQL** to store cafe and restaurant information.

The main table is called `places`.

### Places Table

| Column     | Description                    |
| ---------- | ------------------------------ |
| `id`       | Unique ID of the place         |
| `name`     | Name of the cafe or restaurant |
| `type`     | Type of place                  |
| `category` | Food or service category       |
| `location` | Location of the place          |
| `city`     | City name                      |
| `rating`   | Place rating                   |
| `reviews`  | Number of reviews              |
| `image`    | Image path                     |

---

## REST API

The backend provides REST API endpoints for managing places.

### Get All Places

```http
GET /api/places
```

Returns all places stored in the database.

### Get a Single Place

```http
GET /api/places/:id
```

Returns information about a specific place.

### Add a Place

```http
POST /api/places
```

Adds a new place to the database.

### Update a Place

```http
PUT /api/places/:id
```

Updates information about an existing place.

### Delete a Place

```http
DELETE /api/places/:id
```

Deletes a place from the database.

### Admin Login

```http
POST /api/admin/login
```

Authenticates the admin user.

---

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/MaheenShaikh17/BrewFinder.git
```

### 2. Open the Project

```bash
cd BrewFinder
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of the project.

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_admin_password

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=brewfinder
```

Replace the values with your own local MySQL credentials.

> **Note:** The `.env` file should never be uploaded to GitHub because it contains sensitive configuration information.

### 5. Create the Database

Open **MySQL Workbench** and create the database:

```sql
CREATE DATABASE brewfinder;
```

Then create the `places` table and insert the required place data.

### 6. Start the Backend

From the project root directory, run:

```bash
node backend/server.js
```

The backend server will run at:

```text
http://localhost:5000
```

### 7. Open the Frontend

Open the `frontend/index.html` file using **VS Code Live Server**.

The website will then be available through the Live Server URL.

---

## Admin Panel

The admin panel allows authorized users to manage places in the database.

Open:

```text
frontend/login.html
```

After successful login, the user is redirected to the admin dashboard.

From the admin panel, you can:

* Add places
* Edit places
* Delete places
* View all places
* Log out of the admin panel

---

## Environment Variables

The project uses environment variables for database and admin configuration.

The following variables are required:

```text
ADMIN_USERNAME
ADMIN_PASSWORD
MYSQL_HOST
MYSQL_USER
MYSQL_PASSWORD
MYSQL_DATABASE
```

The `.env` file is excluded from Git using `.gitignore`.

---

## Security

Sensitive database and admin configuration is stored in environment variables instead of being directly written in the source code.

The `.env` file is excluded from the Git repository to prevent credentials from being uploaded to GitHub.

> This project is intended for educational and portfolio purposes. The current admin authentication is a basic implementation and can be improved with stronger authentication and password hashing for a production application.

---

## Future Improvements

Possible future improvements include:

* User registration and login
* User reviews and ratings
* Favorites and saved places
* Google Maps integration
* Distance-based search
* Opening hours
* Advanced location filtering
* More cities across Pakistan
* Improved authentication and authorization
* Online deployment

---

## Author

### Maheen Shaikh

Software Engineering Student

**GitHub:** [MaheenShaikh17](https://github.com/MaheenShaikh17)

