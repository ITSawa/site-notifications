# site-notifications

`site-notifications` is a simple and stylish library for displaying notifications on a webpage. It allows you to create notifications with various types and styles, which can be passed as a `type` when creating a notification. The library uses standard CSS and provides easy-to-use methods for working with notifications.

## Installation

To get started, simply include the library in your project. You can add the following code to your HTML file or import it into your JavaScript project:

html

<script src="path/to/site-notifications.js"></script>

Or, if you're using npm with a bundler like Webpack or Parcel:

bash

npm install site-notifications
Usage
Once the library is included, you can start creating notifications using the spawnNotification function. This function requires a message, a notification type, and optionally, a duration for the notification.

Example:
javascript

// Creating a success notification
spawnNotification("Success message", "success");

// Creating an error notification
spawnNotification("Error occurred during request", "error");

// Creating a warning notification
spawnNotification("Warning about form submission", "warning");

// Creating an informational message
spawnNotification("Information about status", "info");

// Creating a dark message with a timeout
spawnNotification("Dark message", "dark", 10000);
Notification Types
The library supports the following notification types, which define the appearance and color scheme of the notifications:

success: Success message (green)
error: Error message (red)
warning: Warning message (yellow)
info: Informational message (blue)
dark: Dark theme notification
Closing Notifications
You can manually close notifications using the closeNotification method:

javascript

// Close the notification by its ID
closeNotification("notification-message-1");
Closing Notifications After a Set Time
For automatic notification closure after a specified time, use the closeAfterTime method:

javascript

closeAfterTime("notification-message-1", 10000); // Closes after 10 seconds
Customizing Styles
The library provides a simple way to customize the styles of the notifications. Here are the default styles:

css

.notifications-container {
position: fixed;
bottom: 0px;
left: 0px;
padding: 40px 10px;
z-index: 99999;
pointer-events: none;
display: flex;
flex-direction: column;
align-items: flex-start;
transition: height 0.5s ease-in-out;
max-height: 100vh;
overflow-y: hidden;
}

.notification-message {
background-color: hsla(0, 0%, 100%, 0.6);
border-left: 5px solid rgb(255, 255, 255);
backdrop-filter: blur(10px);
padding: 10px 12px;
border-radius: 5px;
margin-bottom: 10px;
box-shadow: 0px 0px 10px rgba(90, 90, 90, 0.2);
display: flex;
align-items: center;
width: fit-content;
opacity: 0;
transform: translateX(-100%);
transition: all 0.8s ease-in-out;
}

.notification-message.appear {
opacity: 1;
transform: translateX(0);
}

.notification-message:hover {
cursor: pointer;
transform: scale(1.02);
}

.notification-message.close {
opacity: 0;
transform: translateX(-100%);
pointer-events: none;
transition: all 0.2s ease-in-out;
}

.notification-message.onremove {
max-height: 0;
padding: 0;
margin-bottom: 0;
overflow: hidden;
}

.notification-message.success {
border-left: 5px solid rgb(5, 153, 109);
background-color: rgba(119, 204, 178, 0.6);
}

.notification-message.error {
border-left: 5px solid rgb(196, 21, 21);
background-color: rgb(255, 128, 128, 0.6);
}

.notification-message.warning {
border-left: 5px solid rgb(224, 155, 25);
background-color: rgb(255, 255, 128, 0.6);
}

.notification-message.info {
border-left: 5px solid rgb(16, 79, 197);
background-color: rgba(128, 172, 255, 0.6);
}

.notification-message.dark {
border-left: 5px solid rgb(39, 39, 39);
background-color: hsla(0, 0%, 0%, 0.6);
}

.notification-message.dark .notification-message\_\_close {
color: rgb(255, 255, 255);
}

.notification-message.dark .notification-message\_\_close:hover {
color: rgb(102, 102, 102);
}

.notification-message.dark .notification-message\_\_text {
color: rgb(255, 255, 255);
}

.notification-message\_\_close {
border: none;
background-color: transparent;
font-size: 1.8rem;
box-shadow: none;
margin-left: 5px;
transition: all 0.2s ease-in-out;
pointer-events: all;
}

.notification-message\_\_close:hover {
cursor: pointer;
color: rgb(236, 236, 236);
}

.notification-message\_\_text {
margin: 0;
padding: 0;
font-size: 1.2rem;
}
Feel free to modify the CSS or pass different types when creating notifications to match your site's design.

Contributing
Contributions are welcome! If you'd like to improve the library or fix any bugs, please feel free to fork the repository, create a branch, and submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
