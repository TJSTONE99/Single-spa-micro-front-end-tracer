# Single-spa-micro-front-end-tracer

General Info:
Single-spa-micro-front-end-tracer - This is an application I developed whilst researching into micro-frontends. It is extremely primitive but was built as more of a proof of concept of how server less lambda web sockets could bidirectionally communicate to 'parcels'(application) to produce some cores level functionality and linkage between apps that can be considered independent of one another. This means even though on here they are stored in one repo they have the potential to each posses their own repo (i.e. each folder name is a repo) due to the fact they each have independent dependencies &amp; build commands.

On top of the interesting functionality in encompassing parcel injection into a root HTML application (in this project known as the 'chassis'). A couple of the application leverage ngrx to store global state within them. This ultimately means that once a message is received by the web socket service it fires an action with payload for the ngrx store to handle and reduce into new, deleted or updated state. This state is then an observable stream that can be subscribed to or &amp; asynchronously piped and handled within the template html.

Another interesting factor investigated within the project is the use of an event bus to allow for receiving and emitting of events in a rxjs fashion meaning sibling parcels were allowed to communicate with one another by subscribing to the result of another event handler. This allowed the micro-front end to communicate basic user state around to other applications without the added overhead in utilising web socket for each process. i.e., entering your name into the popup emits an event on the event bus which is then received by the form app, hence then only require one socket instantiating. 

Overall, combining all these things gave a good scope of what is possible with micro-frontends and the whole notion of single page applications so ended up to be an extremely useful bare bones demo to reference when constructing more complex systems based on the same infrastructure.

The serverless web sockets functionality is stored under another repo and will be required to run the project. You can find that here https://github.com/TJSTONE99/AWS-Serverless-websocket-mongo-interaction

I also have created a basic diagram to illustrate the whole architecture from start to finish. However, I will re-iterate this was mainly thrown together so it’s far from great but a good reference for future use with single-spa and the notion of micro-front-ending.

![Screenshot](single-spa_serverless-schema.png)

Installation:

	•	To run the project, open a new terminal with node installed (I used node 13.12.0 for development) and navigate to the directory containing the project folders.
	•	Now cd into each folder and run the command `npm install` - to install all node_module dependencies listed in the package.json file
	•	Next run the command `npm start`
	•	Repeat this for each app (each folder within the root directory of this repo if you haven't moved anything) including the chassis application.
	•	To open the chassis app navigate to localhost:4200

Other considerations:
• environmental variables are stored in the environments folder within each angular project the only thing that may need to be adjusted here is the `websocketConnectionURL` property if your serverless WebSocket has been instantiated at a different url/port.
• All the code to mount/unmounted parcels is within the Chassis corresponding html/js files. The imports listed within the header of the index.html file may need to be adjusted to an applications url/port if that is adjusted upon running by altering the serve command or adding a `--port` property into the process.
• The eventBus is injected as a service within the Chassis js file, within that we have has to add it as a `customProp` to each application that single-spa is teeing up to mount to ensure the eventBus is instantiated within that application.
