🔎 ScoutAI — Intelligent Web Research & Lead Extraction Platform

<p align="center"> <strong>AI-powered web research, scraping & structured lead extraction platform</strong> </p>

<p align="center"> <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" /> </p>

<p align="center"> <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" /> <img src="https://img.shields.io/badge/BullMQ-Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" /> <img src="https://img.shields.io/badge/Ollama-Local%20AI-black?style=for-the-badge" /> <img src="https://img.shields.io/badge/Qwen-LLM-purple?style=for-the-badge" /> </p>

🚀 Overview

ScoutAI is an AI-powered web research and lead extraction platform that automatically converts unstructured website content into structured business information.

Instead of manually researching websites, a user simply provides a URL. ScoutAI uses Playwright to open and extract content from the website, processes the collected information using a local Qwen model through Ollama, and stores the structured result in MongoDB.

The React dashboard then displays the extracted company information along with the current research status.

### 🚀 How It Works

```text
React Dashboard
      ↓
Node.js + Express
      ↓
BullMQ + Redis
      ↓
Playwright Scraper
      ↓
Ollama + Qwen AI
      ↓
Structured JSON
      ↓
MongoDB
      ↓
Dashboard
```

### ✨ Features

* 🔎 Dynamic website scraping with **Playwright**
* 🤖 Local AI extraction using **Ollama + Qwen**
* ⚡ Background processing with **BullMQ + Redis**
* 🗄️ Structured data storage with **MongoDB**
* 📊 React research dashboard
* 🧠 Prompt-based structured JSON extraction
* 🔄 Real-time research status tracking

### 🛠️ Tech Stack

**React • TypeScript • Node.js • Express • Playwright • MongoDB • Redis • BullMQ • Ollama • Qwen**

### 🎯 Purpose

Built to explore **AI-powered web automation, asynchronous processing, web scraping, and structured lead extraction** in a production-style architecture.
