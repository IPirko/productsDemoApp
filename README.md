# Products Demo Application ReadMe

This application is created in .NET 9 WebApi, Angular for Frontend, MySQL for storing the data, and Bootstrap 5 for styling.  
Application is separated into 2 parts: backend (.NET9) in folder "ProductsApi" and frontend (Angular) productApiUI. 
Scalar for API documentation and testing the API request. 

Before you build this application, you must have preinstalled Node v22, .NET 9 CLI, and Angular 17. 
 
The next step will be to specify your SQL "Server" in [text](ProductsApi/appsettings.json), and maybe if you like, change the name of the database.
 
## Step one: Start backend 

run this command from terminal in the [text](ProductsApi) dir, or from VSCode / VS studio.

>dotnet restore 

>dotnet build 

>dotnet run --urls "https://localhost:7227"

 
After that, check from your SQL Management Studio if the database/table was created.
You can also test it on this link empty JSON will be shown https://localhost:7227/api/product
For documentation and testing, the Api request - https://localhost:7227/scalar/v1


## Step two: Start Frontend

You need to run the next command: 

>npm install


To start the frontend Angular 

>ng serve

On http://localhost:4200/, you can check the application. 