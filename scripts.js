const styleText = `
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

.notification-message.dark .notification-message__close {
  color: rgb(255, 255, 255);
}

.notification-message.dark .notification-message__close:hover {
  color: rgb(102, 102, 102);
}

.notification-message.dark .notification-message__text {
  color: rgb(255, 255, 255);
}

.notification-message__close {
  border: none;
  background-color: transparent;
  font-size: 1.8rem;
  box-shadow: none;
  margin-left: 5px;
  transition: all 0.2s ease-in-out;
  pointer-events: all;
}

.notification-message__close:hover {
  cursor: pointer;
  color: rgb(236, 236, 236);
}

.notification-message__text {
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
}
`;

let notificationsIds = 0;

/**
 * @param {string} id
 * @returns {void}
 * @description
 * @example
 * closeNotification("notification-message-1");
 * */
function closeNotification(id) {
  const element = document.getElementById(id);
  element.classList.add("close");
  setTimeout(() => {
    element.classList.add("onremove");
    setTimeout(() => {
      element.remove();
      updateContainerHeight();
    }, 700);
  }, 500);
}

/**
 * @param {string} id
 * @param {number} time
 * @returns {void}
 * @description
 * @example
 * closeAfterTime("notification-message-1", 10000);
 * */
function closeAfterTime(id, time = 5000) {
  if (isNaN(time)) {
    time = 5000;
  }

  setTimeout(() => {
    closeNotification(id);
  }, time);
}

/**
 * @param {string} message
 * @param {string} type
 * @param {number} time
 * @returns {void}
 * @description
 * @example
 * spawnNotification("Success message", "success");
 * spawnNotification("Error message", "error");
 * spawnNotification("Warning message", "warning");
 * spawnNotification("Info message", "info");
 * spawnNotification("Dark message", "dark", 10000);
 * */
function spawnNotification(message, type, time = null) {
  const notificationMessage = document.createElement("div");
  notificationMessage.classList.add("notification-message");
  notificationMessage.classList.add(type);
  notificationMessage.id = `notification-message-${notificationsIds++}`;
  const notificationText = document.createElement("p");
  notificationText.classList.add("notification-message__text");
  notificationText.textContent = message;
  notificationMessage.appendChild(notificationText);
  const notificationClose = document.createElement("button");
  notificationClose.classList.add("notification-message__close");
  notificationClose.innerHTML = "&#x2715;";
  notificationClose.addEventListener("click", () => {
    closeNotification(notificationMessage.id);
  });
  notificationMessage.appendChild(notificationClose);
  const container = document.querySelector(".notifications-container");
  container.appendChild(notificationMessage);

  updateContainerHeight();

  setTimeout(() => {
    notificationMessage.classList.add("appear");
  }, 10);

  if (time) {
    closeAfterTime(notificationMessage.id, time);
  }
}

function updateContainerHeight() {
  const container = document.querySelector(".notifications-container");
  const containerHeight = Array.from(container.children).reduce(
    (height, child) => {
      return (
        height +
        child.offsetHeight +
        parseFloat(getComputedStyle(child).marginBottom)
      );
    },
    0
  );
  container.style.height = `${containerHeight}px`;
}

document.addEventListener("DOMContentLoaded", () => {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = styleText;
  document.head.appendChild(styleElement);

  const notificationsContainer = document.createElement("div");
  notificationsContainer.classList.add("notifications-container");
  document.body.appendChild(notificationsContainer);

  window.spawnNotification = spawnNotification;
  window.closeNotification = closeNotification;

  /**
   * example of usage
   *
   * fetch("https://jsonplaceholder.typicode.com/todos/1")
   *   .then((response) => response.json())
   *   .then((data) => spawnNotification(data.title, "success"))
   *   .catch((error) => spawnNotification(error.message, "error"));
   */

  setTimeout(() => {
    spawnNotification("Success message", "success");
  }, 1000);
  setTimeout(() => {
    spawnNotification("Error message", "error");
  }, 2000);
  setTimeout(() => {
    spawnNotification("Warning message", "warning");
  }, 3000);
  setTimeout(() => {
    spawnNotification("Info message", "info");
  }, 4000);
  setTimeout(() => {
    spawnNotification("Dark message", "dark", 2000);
  }, 5000);
});
