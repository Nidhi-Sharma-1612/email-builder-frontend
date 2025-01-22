# Email Builder Frontend

This is the frontend application for the Email Builder project, a tool that allows users to create and customize email templates with various styles, images, and text content.

## Deployed Link

Access the live application here: [Email Builder Frontend](https://email-builder-frontend-7d4o33rmt.vercel.app/)

## Features

- Create and preview email templates.
- Customize email styles and content.
- Upload images for use in email templates.
- Save and download templates.

## Setup Instructions

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v14 or higher) installed on your system.
- A code editor like VS Code.
- Access to the backend API (ensure it is running).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/email-builder-frontend.git
   cd email-builder-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   VITE_API_BASE_URL=<Your Backend API Base URL>
   VITE_SUPABASE_URL=<Your Supabase URL>
   VITE_SUPABASE_ANON_KEY=<Your Supabase Anon Key>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser at [http://localhost:5173](http://localhost:5173).

### Build for Production

To create a production build, run:

```bash
npm run build
```

The output will be in the `dist` folder.

## Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast builds and development server.
- **TailwindCSS**: For styling.
- **Redux**: For state management.
- **Axios**: For API requests.
- **Supabase**: For image storage.
