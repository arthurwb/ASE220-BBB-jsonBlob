# ASE220-BBB-jsonBlob

Your task
Visit the API section of jsonblob.com and read the documentation (https://jsonblob.com/apiLinks to an external site.)

Create an application that replicates the behavior of jsonblob.com's API (if you want to use additional modules that can help accomplish the goal, feel free to do so. Also, you don't  have to use "jsonblob" in the routes: feel free to define your own route - e.g., /api/:id)

Your app should have 4 routes:
POST /api - create a new JSON document and save it into a file having a unique id, return the id
GET /api/:id - retrieve a JSON document from a file
PUT /api/:id - update the content of a JSON document with new content and store it into the same file  
DELETE /api/:id - reset the content of the JSON document

Create a file that enables you (and me) to make test API calls. For instance, you can use the format used by Visual Studio code's REST client extension, which we have used in class.

JSON data exchanged via the API system must be stored in files. Specifically, you want to have one JSON file for each ID.

To get started, download this resource:  https://github.com/NicholasCaporusso/NKU-ASE220-Assignment5-boilerplateLinks to an external site.

Rubric
There are 10 points available for this assignment:

+6 points: the POST, GET, PUT, and DELETE APIs work as expected (1.5 points for each API)

+1 point: the project contains a test file for checking if the routes work

+2 points: the project folder is tidy and well organized and data is stored appropriately without any possibility of conflicting file names when creating a new JSON document

+1 point: the application checks if the data sent in the body is formatted according to the JSON file format before processing them

+1 point: the application checks if the file contains JSON data before encoding them into the response body

