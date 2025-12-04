# Technical Design Document: Lesson Scenario Generator

**Version:** 1.0
**Status:** Draft
**Context:** Educational Platform for Teachers

-----

## 1. Overview

This module allows teachers to create comprehensive **Lesson Scenarios**. A scenario consists of a central topic, metadata (grade, duration), and a specific set of tasks based on selected academic disciplines. The system integrates Generative AI (Gemini 2.5 Flash) to assist in creating task descriptions, solutions, and visual cover images.

## 2. Terminology

  * **Scenario:** The high-level container for the lesson (Topic + Metadata).
  * **Discipline:** A subject (e.g., Math, History, Physics).
  * **Task:** A specific assignment linked to a discipline, containing a problem and a solution.
  * **Cover/Label:** The visual representation (image) of the task.

-----

## 3. User Flow

### 3.1. Scenario Initialization

1.  **Input Topic:** The teacher manually types the main topic of the lesson (free text).
2.  **Select Grade:** The teacher selects the target audience from a dropdown (e.g., Grade 1, Grade 2... Grade 12).
3.  **Select Disciplines (Multi-select):**
      * The teacher selects one or multiple disciplines from a predefined list.
      * *Logic:* The number of selected disciplines determines the number of Task containers generated.
4.  **Set Duration:** The teacher defines the lesson length (e.g., 30, 45, 60, or 90 min).

### 3.2. Task Generation & Editing

Upon confirming the "Scenario Initialization" details, the system generates a list of **Task Cards** (one per selected discipline).

**For each Task Card:**

1.  **Discipline Header:** Displays the specific discipline (e.g., "Mathematics").
2.  **Content Generation (AI Support):**
      * **Manual Entry:** Teacher types the task description and solution manually.
      * **AI "Fill Task":** A button to generate a relevant task based on the *Scenario Topic*, *Grade*, and *Discipline*.
      * **AI "Solve Task":** If a task description exists but the solution is empty, this button generates the correct answer/solution.
3.  **Structure:**
      * **Task/Problem:** Visible to students (in the future).
      * **Solution:** Hidden/Teacher-only reference.

### 3.3. Visual Assets (Cover/Label)

For each task, the teacher attaches a visual "Label" or Cover Image.

  * **Option A:** Upload from local computer.
  * **Option B:** Provide a direct URL.
  * **Option C (AI):** "Generate Image." The system sends the Task Description + Scenario Context to an image generation model to create a relevant visual.

-----

## 4. Functional Requirements

### 4.1. Inputs & State

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **Topic** | String | Required | The main theme of the lesson. |
| **Grade** | Enum/Int | Required | Target education level (Grade 1-12). |
| **Duration** | Int | Required | Time in minutes (30, 45, 60, 90). |
| **Disciplines** | Array[Enum] | Min 1 | List of subjects involved. |

### 4.2. Logic Rules

  * **1:1 Relation:** For every selected Discipline in the multi-select, exactly **one** Task object is created.
  * **Context Passing:** All AI requests must include the *Grade* and *Topic* to ensure appropriate difficulty and relevance.

### 4.3. AI Actions

The interface must expose specific triggers for the backend AI service:

1.  `generateTaskContent(topic, grade, discipline)`: Returns `{ description, solution }`.
2.  `generateTaskSolution(topic, grade, discipline, description)`: Returns `solution` text.
3.  `generateImagePrompt(topic, discipline, description)`: Returns an image prompt for AI image generation.

-----

## 5. Data Model (TypeScript Schema)

### 5.1. Type Definitions

```typescript
export type GradeLevel = 
  | 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4' 
  | 'Grade 5' | 'Grade 6' | 'Grade 7' | 'Grade 8' 
  | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';

export type Discipline = 
  | 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology' 
  | 'History' | 'Geography' | 'Literature' | 'Computer Science' 
  | 'Art' | 'Environmental Science' | 'Ecology' | 'Urban Planning' 
  | 'Engineering' | 'Operations Research' | 'Medicine' | 'Kinematics' 
  | 'Environmental Quality' | 'Economics' | 'Management' 
  | 'Financial Education' | 'Technology in Education' 
  | 'Renewable Energy' | 'Arithmetic' | 'Fractions';

export interface Task {
  id: string;
  discipline: Discipline;
  description: string;
  solution: string;
  coverImage?: string;
}

export interface Scenario {
  id: string;
  topic?: string;
  grade?: GradeLevel;
  duration: number | string;
  disciplines?: Discipline[];
  tasks?: Task[];

  // Legacy fields (deprecated, to be removed)
  title?: string;
  category?: string;
  opening?: {
    description: string;
    imageUrl?: string;
  };
  problem?: { text: string; context: string; imageUrl?: string; };
  data?: {
    chartType: 'line' | 'bar' | 'pie';
    chartData: Array<{ name: string; value: number; [key: string]: any }>;
    description: string;
    facts?: string[];
  };
  analysis?: { questions: string[]; keyTerms: string[]; };
  solutions?: { options: SolutionOption[]; };
  simulation?: { results: Record<string, SimulationResult>; };
  reflection?: { questions: string[]; };
}
```

### 5.2. Example JSON

```json
{
  "scenario": {
    "id": "uuid",
    "topic": "The French Revolution",
    "grade": "Grade 8",
    "duration": 45,
    "disciplines": ["History", "Geography"],
    "tasks": [
      {
        "id": "uuid",
        "discipline": "History",
        "description": "Analyze the causes of the Storming of the Bastille.",
        "solution": "Social inequality, economic crisis, and weak monarchy...",
        "coverImage": "https://storage.../bastille.png"
      },
      {
        "id": "uuid",
        "discipline": "Geography",
        "description": "Map the regions most affected by the Great Fear.",
        "solution": "[Coordinates and map data]",
        "coverImage": "https://storage.../map_upload.png"
      }
    ]
  }
}
```

-----

## 6. UI/UX Specifications

### 6.1. The Setup Form (Step 1: Scenario Initialization)

  * **Layout:** Two-step wizard with progress indicator.
  * **Topic Input:** Large text input for the lesson theme.
  * **Grade Selector:** Dropdown with Grade 1-12 options.
  * **Duration Selector:** Dropdown with 30, 45, 60, 90 minute options.
  * **Discipline Selector:** A tag-based multi-select grid. Clicking a discipline toggles its selection (visual checkmark indicates selected state).

### 6.2. The Task List (Step 2: Task Generation)

  * Rendered as a vertical list of cards (one per selected discipline).
  * **Card Header:**
      * Discipline name with color accent bar.
      * [✨ AI Fill Task] button in the header toolbar.
  * **Card Body:**
      * **Task Description:** Text area for the problem statement.
      * **Solution:** Text area with distinct yellow/green background to signify it is the teacher's answer key.
          * [✨ AI Solve] button next to the solution field.
  * **Media Section:**
      * Preview area for the cover image.
      * Buttons: [Upload] [✨ Generate Image]
      * Input field for direct URL entry.

### 6.3. Teacher Guide View (LessonPlanView)

  * Full-screen view of a saved scenario for the teacher.
  * Displays topic, grade, duration, and all tasks with their descriptions and solutions.
  * Solutions are clearly marked as "Teacher Only" content.
  * Each task shows its cover image alongside the content.

-----

## 7. AI Service Integration

The system uses Google Gemini 2.5 Flash for AI-powered content generation.

### 7.1. API Configuration

```typescript
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey: API_KEY });
```

### 7.2. Available Functions

| Function | Inputs | Output | Description |
| :--- | :--- | :--- | :--- |
| `generateTaskContent` | topic, grade, discipline | `{ description, solution }` | Generates a complete task with problem and solution |
| `generateTaskSolution` | topic, grade, discipline, description | `string` (solution) | Generates a solution for an existing task description |
| `generateImagePrompt` | topic, discipline, description | `string` (prompt) | Creates a prompt suitable for AI image generation |

### 7.3. Prompt Examples

**Generate Task:**
```
Create a specific task/problem for a lesson scenario.
Topic: "${topic}"
Grade Level: "${grade}"
Discipline: "${discipline}"

Return a JSON object with:
- description: The task or problem statement for the student.
- solution: The correct answer or solution for the teacher.
```

**Generate Solution:**
```
Provide a solution for the following task.
Topic: "${topic}"
Grade Level: "${grade}"
Discipline: "${discipline}"
Task Description: "${description}"

Return ONLY the solution text.
```

-----

## 8. Internationalization (i18n)

The system supports multiple languages: English (en), Hebrew (he), and Arabic (ar).

### 8.1. Key Translation Keys

| Key | EN | HE |
| :--- | :--- | :--- |
| `topic` | Topic | נושא |
| `grade` | Grade | כיתה |
| `duration` | Duration | משך |
| `disciplines` | Disciplines | תחומי דעת |
| `task_problem` | Task / Problem | משימה / בעיה |
| `solution` | Solution | פתרון |
| `teacher_only` | Teacher Only | למורה בלבד |
| `ai_fill_task` | Fill Task with AI | מלא משימה עם AI |
| `ai_solve` | Solve with AI | פתור עם AI |
| `generate_image` | Generate Image | צור תמונה |
| `save_scenario` | Save Scenario | שמור תרחיש |

### 8.2. Discipline Translations

All disciplines have translation keys in the format `discipline_<name>`:
- `discipline_mathematics` → מתמטיקה
- `discipline_physics` → פיזיקה
- `discipline_chemistry` → כימיה
- `discipline_biology` → ביולוגיה
- etc.

### 8.3. Grade Translations

All grades have translation keys in the format `grade_<number>`:
- `grade_1` → כיתה א'
- `grade_9` → כיתה ט'
- `grade_12` → כיתה י"ב

-----

## 9. File Structure

```
src/
├── entities/
│   └── scenario/
│       ├── model/
│       │   └── types.ts          # Scenario, Task, Discipline types
│       └── ui/
│           └── ScenarioCard.tsx  # Scenario card component
├── features/
│   └── admin/
│       └── create-scenario/
│           └── ui/
│               └── CreateScenarioForm.tsx  # Main form component
├── shared/
│   ├── api/
│   │   └── geminiService.ts      # AI service integration
│   ├── i18n/
│   │   └── translations.ts       # All translations
│   └── model/
│       └── mockData.ts           # Sample scenarios
└── widgets/
    └── LessonPlanView.tsx        # Teacher guide view
```

-----

## 10. Future Considerations (Out of Scope for v1)

  * Exporting the Scenario to PDF/Word.
  * Student view mode (hiding solutions).
  * Sharing scenarios between teachers.
  * Real image generation API integration (currently placeholder).
  * File upload for cover images.
  * Multiple tasks per discipline (currently 1:1 relation).
