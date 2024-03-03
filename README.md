
<img width="548" alt="צילום מסך 2024-03-03 ב-9 10 57" src="https://github.com/romikamin97/NodeJs-Blog/assets/161374080/6957f495-22bf-4ff8-8a44-7c5693907693">



# Welcome to Romi's blog project!
This is a small web app project written in JS using NodeJs, Express and MongoDB!
One could register to the blog, write his own posts and edit or delete them. Without registering and logging in
a guest user could only read other's posts.
Upon logging in, a user could also leave comments on others post, providing a whole world of communication!

## You need:
- NodeJs
- Database (MongoDB) Cluster

## Create .env file
The app is using the env variables set by the env file to:
- Connect to the database cluster
- Provide a secret for password hashing
- Specify a port for the server
For example:

```
MONGODB_URI=mongodb+srv://<username>:<password>@clusterName.xxxxxxx.mongodb.net/blog
JWT_SECRET=MySecretBlog
PORT=8080
```

## Installation
To install and run this project - install dependencies using npm and then start your server by running:

```
$ npm install
$ npm run dev / $ npm start
```
