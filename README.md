## CURRENT STATUS ##

-- Working on data output from databases and files.

-- Next will be data inputs, which should be more of a breeze.

-- After will be honing the data processing controllers.

## CONFIGURE ##

Breaks down into 4 steps:

1.) App

App section defines the basics, your name and your key.

2.) Data

Data is seperated into nodes.  The idea is so you can have an unlimited source of data.

Database data, or file data

3.) Databases

the configuration starts with the SAME name used to define a data node in the previous configuration step.  Then you define the connection type, host, etc.

4.) FileSystem

Same principle as the Databases.  Start by defining which node using the SAME name defined in Data.  Then designate your file system type and path.  The type advantage is so that you don't have to use a local file system.  You can use user-remote, amazon-remote, etc.# BrainPI

## IO ##

If this was an MVC App, you could consider the IO as the controller.

It's split into two processes.  Input and Output.

Anytime you send data in to be processed, you go through the Input folder.

Anytime you are receiving data, you go through the Output folder.

### Structure ###

I recommend making subfolders in these for best practice. e.g 

BRAINPI/IO/input/sales_data/index.js ( Write methods in here to execute when Sales Data is received )

## Uri ##

The URI file will map your Uri paths to the necessary IO processes.

e.g URI.Input('website.com/sales_data', sales_data);

The URI class will use this to look for IO/sales_data/index.js

## Data ##

This folder is for public storage.  Csv files and the like.
