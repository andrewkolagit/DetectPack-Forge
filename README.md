# DetectPack Forge

## Running Locally

To run the frontend locally and connect it to your backend or API, follow these steps:

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env.local` file in the project root (if not present).
   - Add any required variables, for example:
     ```
     VITE_API_URL=http://localhost:3000
     ```
   - Replace `http://localhost:3000` with your backend/API URL.

4. **Start the development server**
   ```sh
   npm run dev
   ```
   - The frontend will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

5. **Connect to your backend**
   - Ensure your backend/API is running and accessible at the URL specified in your `.env.local`.
   - The frontend will communicate with the backend using the configured API URL.

**Note:**  
- No n8n setup is required for running the frontend.
- For production builds, use `npm run build` and serve the output from the `dist` folder.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
