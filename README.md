# Business Process Scenario App
A platform for Business Process Scenario communication.
<div align="center">
  <img src="./public/bpdemo.gif" alt="Business Process Demo" width="70%">
</div>

## Features
The Business Process Scenario App is a communication platform designed to facilitate discussions and collaboration around each Business Process (BP) cycle's scenarios. It serves as a central hub for users to create, view, and manage scenarios, follow other users and update personal information. The app aims to streamline the process of scenario communication and enhance user engagement.
### User:
- User registration
- User login and logout
- Edit user profile, including uploading a profile picture
- View other users' profiles
- Follow other users

### Scenario:
- Create new scenarios
- Edit and update existing scenarios
- Cancel scenarios
- View detailed information of a scenario, including title, description, time, etc.
- View a list of participated scenarios
- View a list of hosted scenarios

### Time-based Display:
- Display past participated scenarios
- Display upcoming scenarios to participate in

### Security:
- Implement user authentication to protect user accounts and sensitive information
- Implement authorization to restrict access rights for different users

## Requirements
Before getting started, make sure you have the following software installed:

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org)
- [Docker](https://www.docker.com/)

## How to install
1. Clone the project to local:
```
git clone https://github.com/lurulu156/bp.git
```
2. Navigate to the project directory:
```
cd your-project-directory
```
3. Install backend dependencies:
```
cd API
dotnet restore
```
4. Install frontend dependencies:
```
cd ../client-app
npm install
```
5. Set up Docker PostgresSQL DB:
```
docker run --name your-db-name -e POSTGRES_USER= -e POSTGRES_PASSWORD= -p 5432:5432 -d postgres:latest
```

## Configuration
- Configure the settings for your backend application in `appsettings.json` of `API` folder, such as connection strings, API keys, etc.
```
"Cloudinary": {
  "CloudName": ,
  "ApiKey": ,
  "ApiSecret": 
},
  "ConnectionStrings": {
  "DefaultConnection": "Server=host.docker.internal; Port=5432; User Id=; Password=; Database=bp"
},
"TokenKey": "your-secret-key"
```

## Run th App
1. Run docker image at your local computer
2. Run the app
```
cd API
dotnet run
```
The application will run at [http://localhost:5000](http://localhost:5000).

### Test Account
  * email: bob@test.com
  * password: Pa$$w0rd

### API Document
```
https://bpscenario.fly.dev/swagger/index.html
```
