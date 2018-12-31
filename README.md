# BrainPI
***

BrainPI is a **NodeJS** Framework which puts *Clean Code* before anything else.

The **BrainPI** platform makes it incredibly easy to build a web application in MVC format, as well as building **API's** for your mobile applications and alike.
\
\
&nbsp;
## Installation

* * *

This guide will show you how to set up and Install **BrainPI** on your computer. To get started, you need to make sure you have **Node** and **NPM** installed. To verfy, go to your command line and type:

```
node -v
```

If you get a response similar to:

```
v10.10.0
```

Then your computer already has **Node** installed. Otherwise, visit: [nodejs.org](https://nodejs.org/en/download/) and download it onto your computer.

To verify your installation of **NPM**, go to your command line and type:

```
npm -v
```

If you get a response similar to:

```
6.4.1
```

Then your computer already has **NPM** installed. Otherwise, visit: [npmjs.com](https://www.npmjs.com/get-npm) and download it onto your computer.

* * *

Once you have verified both **Node** and **NPM** have been installed, you're ready to get started with **BrainPI**

The first thing you'll want to do is open up your command line to your projects directory. Once in there, run:

```
git clone https://github.com/AHiggins98/BrainPi.git
```

This should install the latest copy of **BrainPI** to your computer.

* * *

The next thing we'll want to do is run:

```
npm install
```

What this command is going to do is read all the required **NPM packages** for **BrainPI** to work, and install them into your project. Including the **BrainPI NPM Package**, which you don't need to worry about now.

* * *

From here, we will set the application directory in our configuration.  Without this, the app will not run.

To do so, run the following:

```
node conduct quick:configure
```

What this command does is set the app->dir property in configure.json.  If your configuration file is still titled **configure.json.example**, it will automatically change it for you.

\
\
&nbsp;

## Hello World

* * *

This guide will show you how to set up your first "Hello World" application in **BrainPI**.

To begin, let's create a new view file.

Inside your views directory, create a new file and call it **hello-world.pug**. If you're unfamiliar with **pug**, don't worry, it's even easier than html, and allows us to embed using **Node.js variables**!

* * *

Inside this file, write the following:

```pug
h1 Hello World From #{name}!
```

* * *

The first two things you'll notice are the **h1** and the **#{}**.

In **pug**, you only need to write the tag you're using, and it will compile to the proper **HTML**. So **h1** will compile into **<h1> </h1>**.

Using **Variables** from our **BrainPI** application can be done with the **#{}** tags.

In a moment we'll learn more about passing variables into our views, but for now, we need to build a **Route** so that we can access this web page!

* * *

### Route

The purpose of writing routes in **BrainPI** is to define what should be happening when the client makes either a **GET** or **POST** request to certain URL's in your application.

We define our routes in **routes/http.js**.

To get started, write:

```javascript
Route.Get('/hello-world', 'HelloWorldController@index');
```

* * *

What this says is, when a user navigates to **/hello-world**, then call our **index()** function in our **HelloWorldController** file, which currently does not exist.

* * *

So now we have created our view file, and defined our route, so let's make our **HelloWorldController** and make a function that loads the view and tells users our name!

### Controller

Open up your **command line** to your project directory.

In here, we'll use **BrainPI's CLI Conduct** command for creating new controllers. Copy and Paste the following:

```
node conduct create:controller HelloWorldController
```

* * *

By using **create:controller**, we made a new **Controller** called **HelloWorldController**, which can be found in **app/controllers/**.

* * *

Once you open your new Controller file, you should see an empty function titled **index()** which takes a **Request** and **Response** object.

Request will hold useful information about the **HTTP** request, such as URL queries, **POST** data, and much more.

Response will be what we use to return our views and variables.

* * *

Inside the **index** method, write the following:

response.render('hello-world', {name:'your-name-here'} );

* * *

**response.render()** is the function used to return our view file.

The first argument we passed in is the name of our **pug** file we created earlier.

The second argument is any variables we use in our view. It follows a **JSON** format, where we put the name of our variable set to it's value.

The **name** should be set to your name, and then our **pug** file will display your name where we created the variable!

* * *

To try it out, head to <host>/hello-world, and you should see **Hello World From your-name!**

Generally, your controllers will do much more than this. They are where you should handle different exchanges with the database, load data to your view, and so much more.

### Conclusion

So in conclusion, we learned how to create a **Route** and a **Controller** that returns our **pug** file with a variable!

Moving forward, you should learn how to interact with a database in your **Controller** to use real data in your pug files, write and interact with **API's**, and more!