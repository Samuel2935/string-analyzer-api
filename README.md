#  String Analyzer API (TypeScript + Express + SQLite)

A RESTful API that analyzes strings and stores their computed properties — including length, palindrome check, word count, unique character count, SHA256 hash, and more.

Built with:
- TypeScript
- Express
- SQLite (via `better-sqlite3`)
- Clean, modular architecture

---

## Features

 Analyze and store string properties  
 Retrieve analyzed strings  
 Filter strings by properties  
 Delete stored strings  
 Natural Language Query filtering  

---

##  Folder Structure
string-analyzer-api/
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  ├─ routes/
│  │   └─ stringRoutes.ts
│  ├─ controllers/
│  │   └─ stringController.ts
│  ├─ services/
│  │   └─ stringService.ts
│  ├─ utils/
│  │   └─ stringUtils.ts
│  ├─ models/
│  │   └─ stringModel.ts
│  └─ config/
│      └─ db.ts
├─ package.json
├─ tsconfig.json
├─ .env
└─ README.md
## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/samuel2935/string-analyzer-api.git
cd string-analyzer-api
npm install
npm run dev

