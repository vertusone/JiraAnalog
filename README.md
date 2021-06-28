# JiraAnalog

# Frontend #

Frontend part of application was created with Next.js framework. The version of framework I used is 11.0.0. To run it, first of all, you need to install node.js (<https://nodejs.org/en/>). Also you can find all the packages to run application in package.json and install them just running `npm install` command. The list of used libraries:

+ _Bootstrap 5.0.0_
https://www.npmjs.com/package/bootstrap

---

# Backend #

Backend part of application was created with asp.net 5.0. To run it, you need to install .net 5 or later on your pc (https://dotnet.microsoft.com/download/dotnet/5.0).  

I used MS SQL Server as Database source and Entity Framework Core library as micro-ORM to work with it.

The list of third-party libraries i used in project:  

+ _Entity Framework Core_ https://docs.microsoft.com/en-us/ef/core/

## Where can i configure application behaviour? About appsettings.json ##

I tried to wrote application, that can be modified for your goals. By changing appsettings.json you can change some parameteres, to make application work as you need.  

There is a section in config file:  

+ ### Connection string ###  
Change it to connect application with your MS SQL server.

Also you have to apply migrations to build the database using the command:

`update-database`