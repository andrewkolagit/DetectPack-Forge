# DetectPack Forge
Turn plain-English behaviors or small log samples into production-ready detection packs — Sigma, KQL (Sentinel), and SPL (Splunk) — with tests and a short response playbook, all mapped to MITRE ATT&CK.

## What is this?
<b>DetectPack Forge</b> is a helper for people learning or working with SIEMs.
You describe a behavior (e.g., “many failed logons then a success”) or paste a few log lines, and the app generates:
* Sigma (vendor-neutral rule YAML)
* KQL (Microsoft Sentinel)
* SPL (Splunk)
* Tests (positive/negative examples)
* Playbook (concise incident-response checklist)
* MITRE ATT&CK technique tags

<b>Why it’s useful:</b> you don’t need to memorize different query syntaxes to begin writing detections; you learn by example and get artifacts you can paste directly into a SIEM.

## How it works (architecture)
<b>Frontend (Vite + React + Tailwind + shadcn-ui)</b>
* Simple wizard: Describe (type behavior) or Logs (paste sample).
* Calls a single n8n webhook with JSON and renders the returned artifacts in tabs.
* Env var: VITE_N8N_WEBHOOK_URL points to your n8n webhook.

<b>Backend (n8n + Gemini)Backend (n8n + Gemini)</b>

<img width="1427" height="670" alt="image" src="https://github.com/user-attachments/assets/3b57f04f-b0ba-4c7d-8512-1174c32466b1" />

1. <b>Webhook (POST)</b> receives:
   ```json
   { "mode": "describe" | "logs", "text": "string?", "logs": "string?" }
   ```
2. <b>Preprocess Function</b> normalizes the body:
   ```js
   // reads from $json.body and flattens to {mode,text,logs}
   const src = (items[0].json?.body ?? items[0].json ?? {});
   let modeRaw = String(src.mode ?? '').toLowerCase();
   const text = typeof src.text === 'string' ? src.text : '';
   const logs = typeof src.logs === 'string' ? src.logs : '';
   const mode = modeRaw === 'logs' || (logs && !text) ? 'logs' : 'describe';
   if (!text && !logs) throw new Error('Provide either text or logs.');
   return [{ json: { mode, text, logs } }];
   ```
3. <b>AI Agent – Schema (Gemini)</b> infers:
   ```json
   {
     "logsource": { "product": "windows|aws|okta|...", "service": "security|cloudtrail|..." },
     "fields": [{ "name": "EventID", "type": "int" }, ...],
     "techniques": [{ "id": "T1110", "confidence": "high" }]
   }
   ```
4. <b>Parse Schema (Function)</b> safely parses the agent output and attaches it to the flow.

5. <b>AI Agent – Artifacts (Gemini)</b> creates Sigma/KQL/SPL/tests/playbook from the schema + inputs.

6. <b>Return JSON</b> to the webhook caller:
   ```json
   {
     "meta": { "title": "...", "slug": "...", "attack": ["Txxxx"], "logsource": { "product": "...", "service": "..." } },
     "sigma": "...",
     "kql": "...",
     "spl": "...",
     "tests": { "positive": ["..."], "negative": ["..."] },
     "playbook": "..."
   }
   ```

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
   - The n8nbackend .json file has been uploaded on the repo. All that is needed to do is take this file and import it into your new n8n workflow.
   - Ensure your backend is running and accessible at the URL specified in your `.env.local`.
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
