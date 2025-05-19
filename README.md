# Products Demo Application ReadMe
This is a full-stack demo application using:

-  **.NET 9 Web API** (Backend)
-  **Angular 17** (Frontend)
-  **MSSQL** (Database)
-  **Bootstrap 5** (Styling)
-  **Scalar** (API documentation)
- (Optional) SQL Server Management Studio for inspecting the database
---

Make sure you have the following installed:

- Node.js v22
- .NET 9 SDK 
- Angular 17 
- MSSQL Server

## Step 1: Configure the Backend

1. Navigate to `ProductsApi/appsettings.json`
2. Edit the connection string to match your MSSQL setup:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=ProductsDb;User=root;Password=yourpassword;"
}
```
## Step 2: Run the Backend
```
cd ProductsApi
dotnet restore
dotnet build 
dotnet run --urls "https://localhost:7227"
```
Check from your SQL Management Studio if the database/table was created.

API will be available at: https://localhost:7227/api/product

Scalar: https://localhost:7227/scalar/v1

## Step 3: Run the Frontend

You need to run the next command from your VSCode or from your terminal: 

```
cd productApiUI
npm install
ng serve 
```
App URL: http://localhost:4200