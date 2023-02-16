# ChatWithMe - GPT Clone
This is a clone of ChatGPT, a simple chat application, created using Node.js for server-side and plain HTML using vite for client-side. It uses WebSocket for real-time communication between the server and the clients.

## Prerequisites
***You will need to have Node.js and NPM installed on your machine before proceeding.***

## Snapshot
![Screenshot-77.png](https://i.postimg.cc/hGSXGF4N/Screenshot-77.png)

## Getting Started
* To get started with the ChatGPT clone, first clone the repository from GitHub:
    ```
    git clone https://github.com/CodeMode365/ChatWithMe.git
    ```
* Once you have cloned the repository, navigate to the directory and install the dependencies:
    ```
    cd ChatWithMe
    npm install
    ```
## Running the client 
* To start the client, simply open the index.html file in your web browser.
     ```
    npm run dev
    ```
* This will start the app and you will be able to access it at http://localhost:PORT

## Running the Server
* Navigate into server folder
    ```
    cd server
    ```
* Add environment variables
    * create .env folder
    * add openAi's api key in .env folder
     ``` 
        OPENAI_API_KEY = exampleKey
    ```
* To run the server, use the following command
    ```
    npm run server
    ```
* This will start the server and you will be able to access it at http://localhost:PORT.


### Client-side
The client-side of the application is built using plain HTML, CSS, and JavaScript(TS). The UI is simple and minimalistic, consisting of a login screen and a chat screen.

### Server-side
The server-side of the application is built using Node.js and uses the Express.js framework to handle HTTP requests. The real-time communication between the server and the clients is handled using the WebSocket protocol.

The server-side code is located in the server.js file. It listens for WebSocket connections and handles incoming messages.  

### Conclusion
That's it! You now have a simple chat application up and running. You can modify the code to add more features or customize the UI to your liking.

If you have any questions or issues, feel free to open an issue on the GitHub repository.
