# Project Name (CODE-TEST)

## Description

This project is a simple data table application built using React. It fetches data from a datadog monitoring Tool, displays it in a table, and allows users to add new items through a popup form.

## How to Run

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running `npm install`.
4. Start the development server by running `npm start`.
5. Open your browser and go to `http://localhost:3000` to view the application.

## Components

### App.jsx

This is the main component of the application. It renders the DataTable component.

### DataTable.jsx

This component fetches data from a datadog monitoring Tool using Axios. It displays the data in a table format. The component also includes functionality to toggle a popup form for adding new items. When a new item is added, it updates the table with the latest data

### Popup.jsx

his component is a popup form for adding new items to the table. It communicates with the server to submit new data. Additionally, it utilizes WebSocket to send the newly added data for real-time updates.

## Technologies Used

- React
- Axios
- WebSocket
