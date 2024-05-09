# Background Server for Data Table Application

## Description

This server serves as the backend for a data table application. It handles API requests related to data management and interacts with datadog external services for monitoring purposes.

## How to Run

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running `npm install`.
4. Start the server by running `npm start`.

## API Endpoints

## POST /api/table/datadog

Creates a new monitor in Datadog.

## Request Body

- `name`: Name of the monitor.
- `message`: Message of the monitor.
- `query`: Query for the monitor.
- `type`: Type of the monitor.

## GET /api/table/datadog

Retrieves all monitors from Datadog.

<!-- ## DELETE /api/table/datadog/:monitorId
Deletes a monitor from Datadog. -->

<!-- ## Path Parameters
- `monitorId`: ID of the monitor to delete. -->

### POST /api/table/webhook

Receives webhook notifications from Datadog.

#### Request Body

- `name`: Name of the webhook.
- `message`: Message of the webhook.
- `query`: Query for the webhook.
- `type`: Type of the webhook.

## Technologies Used

- Express.js
- Axios
- WebSocket
