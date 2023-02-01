# Server Metric



## Project Description
There are four components. Component 1 is a database. Component 2 is a data generator - that updates the database with some “server traffic data” in a random manner. Component 3 is a backend server that talks to the database (and potentially some cloud APIs). Component 4 is a frontend server that talks to the backend server.

There needs to be authentication using JWT. There needs to be a dashboard that provides different ways (graphical, tabular) of viewing different servers traffic (for example, 3 day average, 7 day average etc). There needs to be an alerting system – including email/mobile/web alerts. There needs to be different types of users with permissions to view or to set up alerting or to perform admin tasks.