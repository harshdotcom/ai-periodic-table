import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { ElementComponent, AiElement } from './element/element.component';
import { EquationsComponent } from './equations/equations.component';

export interface AiEquation {
  name: string;
  description: string;
  architectureLayer: string;
  ingredients: AiElement[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ElementComponent, EquationsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDarkMode = true;
  activeTab: 'table' | 'equations' = 'table';

  // Define the grid structure: 4 rows, 5 columns
  grid: (AiElement | null)[][] = [];
  equations: AiEquation[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.applyTheme();
    this.initializeGridAndEquations();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  setActiveTab(tab: 'table' | 'equations') {
    this.activeTab = tab;
  }

  private applyTheme() {
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.document.documentElement.setAttribute('data-theme', theme);
  }

  private initializeGridAndEquations() {
    const tableData: AiElement[] = [
      // Row 1: PRIMITIVES
      { symbol: 'Pr', name: 'Prompts', group: 'REACTIVE', row: 0, col: 0, description: 'Base input text guiding LLM behavior.' },
      { symbol: 'Em', name: 'Embeddings', group: 'RETRIEVAL', row: 0, col: 1, description: 'Vector representation of data essence.' },
      { symbol: 'Lg', name: 'LLM', group: 'MODELS', row: 0, col: 4, description: 'Core neural network processing.' },
      
      // Row 2: COMPOSITIONS
      { symbol: 'Fc', name: 'Function call', group: 'REACTIVE', row: 1, col: 0, description: 'LLM triggering external tools.' },
      { symbol: 'Vx', name: 'Vector', group: 'RETRIEVAL', row: 1, col: 1, description: 'Storing and matching semantic states.' },
      { symbol: 'Rg', name: 'RAG', group: 'ORCHES.', row: 1, col: 2, description: 'Retrieval Augmented Generation pipeline.' },
      { symbol: 'Gr', name: 'Guardrails', group: 'VALID.', row: 1, col: 3, description: 'Checking inputs/outputs for safety.' },
      { symbol: 'Mm', name: 'Multimodal', group: 'MODELS', row: 1, col: 4, description: 'Handling images, audio & text.' },

      // Row 3: DEPLOYMENT
      { symbol: 'Ag', name: 'Agent', group: 'REACTIVE', row: 2, col: 0, description: 'Autonomous entity solving tasks.' },
      { symbol: 'Ft', name: 'Finetune', group: 'RETRIEVAL', row: 2, col: 1, description: 'Adjusting model weights on custom data.' },
      { symbol: 'Fw', name: 'Framework', group: 'ORCHES.', row: 2, col: 2, description: 'LangChain, LlamaIndex bindings.' },
      { symbol: 'Re', name: 'Red-team', group: 'VALID.', row: 2, col: 3, description: 'Adversarial testing boundaries.' },
      { symbol: 'Sm', name: 'Small', group: 'MODELS', row: 2, col: 4, description: 'SLMs, edge-optimized models.' },

      // Row 4: EMERGING
      { symbol: 'Ma', name: 'Multi-agent', group: 'REACTIVE', row: 3, col: 0, description: 'Swarm of agents cooperating.' },
      { symbol: 'Sy', name: 'Synthetic', group: 'RETRIEVAL', row: 3, col: 1, description: 'AI-generated training datasets.' },
      { symbol: 'In', name: 'Interpret.', group: 'VALID.', row: 3, col: 3, description: 'Understanding token activation contexts.' },
      { symbol: 'Th', name: 'Thinking', group: 'MODELS', row: 3, col: 4, description: 'Models with reasoning paths (chain-of-thought).' }
    ];

    // Helper to get element by symbol
    const getEl = (sym: string) => tableData.find(e => e.symbol === sym)!;

    // Create 4x5 empty grid
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push(null);
      }
      this.grid.push(row);
    }

    // Populate grid
    tableData.forEach(el => {
      this.grid[el.row][el.col] = el;
    });

    // Define 20 Equations (Recipes)
    this.equations = [
      { name: 'Basic Chatbot', description: 'A standard generative conversational interface.', architectureLayer: 'Interactive', ingredients: [getEl('Pr'), getEl('Lg')] },
      { name: 'Semantic Search Engine', description: 'Finding documents based on meaning, not just keywords.', architectureLayer: 'Data / Retrieval', ingredients: [getEl('Em'), getEl('Vx')] },
      { name: 'Enterprise Q&A (RAG)', description: 'Chatbot that answers questions based on your private company docs.', architectureLayer: 'Orchestration', ingredients: [getEl('Pr'), getEl('Em'), getEl('Vx'), getEl('Rg'), getEl('Lg')] },
      { name: 'Automated Coding Assistant', description: 'An agent that can write code, run it, and fix errors.', architectureLayer: 'Agentic', ingredients: [getEl('Pr'), getEl('Ag'), getEl('Fc'), getEl('Lg')] },
      { name: 'Data Extraction Pipeline', description: 'Pulling structured JSON data from messy PDFs and images.', architectureLayer: 'Data Processing', ingredients: [getEl('Pr'), getEl('Fc'), getEl('Mm')] },
      { name: 'Custom Domain Expert', description: 'A model highly specialized in a narrow field (like medical law).', architectureLayer: 'Foundation Model', ingredients: [getEl('Sy'), getEl('Ft'), getEl('Lg')] },
      { name: 'Safe Consumer AI', description: 'A public-facing bot that refuses inappropriate requests.', architectureLayer: 'Security / Compliance', ingredients: [getEl('Pr'), getEl('Lg'), getEl('Gr'), getEl('Re')] },
      { name: 'On-Device AI App', description: 'A fast, private AI running locally on a smartphone.', architectureLayer: 'Edge Deployment', ingredients: [getEl('Ft'), getEl('Sm')] },
      { name: 'Complex Problem Solver', description: 'System that breaks down hard math/logic problems before answering.', architectureLayer: 'Cognitive', ingredients: [getEl('Pr'), getEl('Th'), getEl('Lg')] },
      { name: 'Software Development Team', description: 'Multiple agents (Coder, Reviewer, Tester) collaborating to build an app.', architectureLayer: 'Multi-Agent', ingredients: [getEl('Ma'), getEl('Ag'), getEl('Fw'), getEl('Lg')] },
      { name: 'Voice-to-Text Assistant', description: 'Transcribes and answers voice commands instantly.', architectureLayer: 'Interactive', ingredients: [getEl('Pr'), getEl('Mm'), getEl('Lg')] },
      { name: 'ReAct Agent', description: 'Agent that interleaves reasoning and action to solve dynamic tasks.', architectureLayer: 'Agentic', ingredients: [getEl('Pr'), getEl('Th'), getEl('Fc'), getEl('Ag')] },
      { name: 'Graph RAG', description: 'Advanced retrieval mixing vector similarity with knowledge graphs.', architectureLayer: 'Data / Retrieval', ingredients: [getEl('Em'), getEl('Vx'), getEl('In'), getEl('Rg')] },
      { name: 'DSPy Optimizer', description: 'Automated framework that compiles and optimizes your prompts.', architectureLayer: 'Orchestration', ingredients: [getEl('Pr'), getEl('Fw'), getEl('Sy')] },
      { name: 'Multimodal Guardrail', description: 'Filters out inappropriate or malicious images and text simultaneously.', architectureLayer: 'Security / Compliance', ingredients: [getEl('Mm'), getEl('Gr'), getEl('In')] },
      { name: 'Self-Correcting Code Bot', description: 'Agent that writes tests, runs them, and fixes its own failures.', architectureLayer: 'Multi-Agent', ingredients: [getEl('Ag'), getEl('Re'), getEl('Fc')] },
      { name: 'Synthetic Data Generator', description: 'Pipeline to create massive high-quality datasets for training.', architectureLayer: 'Data Processing', ingredients: [getEl('Pr'), getEl('Sy'), getEl('Lg')] },
      { name: 'Autonomous Web Scraper', description: 'Agent that navigates the web to extract specific market research.', architectureLayer: 'Agentic', ingredients: [getEl('Ag'), getEl('Mm'), getEl('Fc')] },
      { name: 'Local Private Assistant', description: 'Assistant running fully offline ensuring data privacy.', architectureLayer: 'Edge Deployment', ingredients: [getEl('Pr'), getEl('Sm'), getEl('In')] },
      { name: 'AI Tutor', description: 'Educational bot that adapts its teaching style to the student.', architectureLayer: 'Cognitive', ingredients: [getEl('Pr'), getEl('Rg'), getEl('Th'), getEl('Lg')] }
    ];
  }
}
