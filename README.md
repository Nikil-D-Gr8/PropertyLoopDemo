# Property Assistant Chat Application

A real estate chat application with AI capabilities for handling property-related queries.

## Backend Setup (Python Flask Server)

1. Navigate to the backend folder:
```bash
cd ChatBotBackEnd
```

2. Create and activate virtual environment:
```bash
python -m venv env
# Windows
env\Scripts\activate
# Mac/Linux
source env/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file and add your Gemini API key:
```
GEMINI_API_KEY=your_key_here
```
[Get API key here](https://aistudio.google.com/app/apikey)

5. Run the server:
```bash
python app.py
```
The server will start at http://localhost:5000

##IMPORTANT

6. Populate the Vector Database:
```bash
python document_processor.py
```



## Frontend Setup (React App) [ create in a new terminal]

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```
The app will start at http://localhost:5173

## Using the Application

1. Open the frontend app in your browser
2. Click the infinity (∞) button in the bottom right corner to open the chat widget
3. Start chatting with the AI about property-related questions
4. You can also upload property images for analysis by using the image upload feature in the chat

Note: Make sure both backend and frontend servers are running simultaneously for the application to work properly.
