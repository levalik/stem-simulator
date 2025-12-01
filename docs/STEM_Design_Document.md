
# STEM Simulator — Full Design Document (Design Plan)

## 1. Overview

The **STEM Simulator** is a browser-based interactive system designed to develop cognitive skills in teachers through short STEM simulations. The system follows a structured 7-step flow and includes an Admin Panel for scenario creation, AI feedback engine, analytics dashboard, and reporting module.

---

## 2. Project Goals

### Pedagogical Goals
- Develop cognitive skills: data analysis, problem-solving, decision-making, justification, and reflection.
- Create a shared professional language among teachers.
- Support interdisciplinary STEM instruction.
- Provide automatic, AI-generated feedback.

### Technical Goals
- 100% browser‑based (no installation).
- Fast loading and responsive design.
- Modular scenario creation.
- Integrated AI for analysis and content generation.

---

## 3. User Roles

### **Teacher**
- Runs STEM simulations.
- Receives automatic AI feedback.
- Downloads session reports.
- Uses scenarios individually or with student groups.

### **Admin**
- Creates, edits, and manages STEM scenarios.
- Views analytics.
- Manages users and permissions.

### **AI Engine**
- NLP text analysis.
- Generates feedback on teacher responses.
- Assists in creating new scenarios.
- Evaluates reasoning quality.

---

## 4. High-Level System Flow

```
Opening → Problem → Data → Analysis → Solutions → Simulation → Reflection → Report
```

---

## 5. Teacher Interface (7 Screens)

### **5.1 Opening Screen**
Purpose: Introduce the scenario.  
Elements:
- Title, description, estimated time.
- Button: *Start Simulation*  
Processes:  
- Create session ID  
- Preload scenario data

---

### **5.2 Problem Screen**
Purpose: Present the STEM problem.  
Elements:
- Scenario storyline  
- Illustration  
Processes:
- Log time spent

---

### **5.3 Data Screen**
Purpose: Present relevant data.  
Elements:
- Graphs, tables, facts  
- Button: *Analyze*  
Processes:
- Log viewed datasets  

---

### **5.4 Analysis Screen**
Purpose: Teacher must analyze the data.  
Elements:
- 1–3 open-ended questions  
- Text input  
AI:
- Analyze response  
- Provide short feedback  
Processes:
- Save analysis answers  

---

### **5.5 Solutions Screen**
Purpose: Choose a solution & justify it.  
Elements:
- 2–5 solution options  
- Text field: *Why?*  
AI:
- Evaluate logic  
Processes:
- Save selection  

---

### **5.6 Simulation Screen**
Purpose: Show results based on teacher’s choice.  
Elements:
- Animation / outcome visualization  
- AI-generated explanation  
Processes:
- Save outcome  

---

### **5.7 Reflection Screen**
Purpose: Encourage metacognitive thinking.  
Elements:
- Reflection questions  
- Text input  
Processes:
- Save reflection  
- Generate session report  

---

## 6. Admin Panel (Screens)

### **6.1 Login**
- Email, password, role detection.

### **6.2 Dashboard**
- Key metrics, charts, usage statistics.

### **6.3 Scenario List**
- List of all scenarios.
- Create / Edit / Delete.

### **6.4 Scenario Editor**
Divided into 7 blocks (matching teacher screens):
1. Opening  
2. Problem  
3. Data (upload CSV/graphs)  
4. Analysis (questions + keywords)  
5. Solutions (options + correctness)  
6. Simulation (outcomes)  
7. Reflection questions  

AI-Assistance:
- Generate problems
- Create dataset samples
- Suggest questions and solutions

### **6.5 Analytics**
- Number of runs  
- Completion rate  
- Frequent errors  
- Solution distribution  
- Reflection keyword cloud  

### **6.6 User Management**
- Add/edit users  
- Roles: admin / author / teacher  

### **6.7 System Settings**
- Branding  
- Language  
- Data export  

---

## 7. AI Modules

### **7.1 Analysis Evaluator**
- NLP classification  
- Similarity matching  
- Feedback generation  

### **7.2 Reasoning Evaluator**
- Logic quality detection  
- Identifies flawed reasoning  
- Suggests improvements  

### **7.3 Simulation Explainer**
- Generates dynamic text based on chosen solution  

### **7.4 Scenario Generator (Admin Tool)**
- Generates:
  - problem statements  
  - datasets  
  - solution options  
  - reflection questions  

---

## 8. Data Model (JSON Example)

```json
{
  "id": "scenario_001",
  "title": "Energy Efficiency",
  "opening": { "description": "Reduce city energy usage." },
  "problem": { "text": "The city must reduce energy by 20%." },
  "data": {
    "tables": ["data.csv"],
    "graphs": ["graph1.png"]
  },
  "analysis": {
    "questions": ["What trend do you notice?"],
    "keyTerms": ["increase", "peak"]
  },
  "solutions": [
    { "text": "Install LED lights", "correct": true, "resultId": "good" },
    { "text": "Shut down power plants", "correct": false, "resultId": "bad" }
  ],
  "simulation": {
    "results": {
      "good": { "summary": "Energy saved" },
      "bad": { "summary": "Blackout" }
    }
  },
  "reflection": {
    "questions": ["What did you learn?"]
  }
}
```

---

## 9. System Architecture

### **Frontend**
- React or Vue  
- SPA architecture  
- Chart.js for graphs  

### **Backend**
- Node.js or Python (FastAPI)  
- REST API  
- JWT Authentication  

### **Database**
- Firestore / PostgreSQL  
- S3 for file storage  

### **AI Layer**
- LLM API  
- Custom NLP pipelines  
- Rule-based validation  

---

## 10. MVP Scope

### Included:
- 7 teacher screens  
- Basic admin panel  
- AI feedback (simple)  
- 1–3 scenarios  
- Report export  

### Excluded:
- Multiplayer mode  
- Complex animations  
- Advanced content generator  

---

## 11. Timeline

- Week 1 — UX/UI + Tech Spec  
- Week 2–3 — Teacher UI  
- Week 3–4 — Admin Panel  
- Week 4–5 — AI integration  
- Week 6 — Testing  
- Week 7 — Fix + Launch  

---

## 12. Appendix
- Glossary  
- Additional mockups  
- API endpoints (to be added)
