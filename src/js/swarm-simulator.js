/**
 * Interactive Engineering Pipeline Simulator
 * Demonstrates the Multi-Agent Production Architecture Workflow using AI-assisted engineering.
 */

import { sound } from './audio.js';

export function initSwarmSimulator() {
  const container = document.getElementById('swarm-simulator');
  if (!container) return;

  const engineeringScenarios = [
    {
      id: 'saas-mvp',
      name: 'Full-Stack SaaS MVP (Production Architecture)',
      promisedTimeline: 'Verified Production Architecture',
      actualDelivery: '100% Passing Tests · Clean AST Audited',
      scope: 'User Auth, PostgreSQL Database, Stripe Payments, Dashboard & REST APIs',
      stages: [
        {
          nodeId: 0,
          stageTitle: 'STAGE 1 · SPECIFICATION',
          role: 'Architecture & Spec',
          action: 'System scope locked. AI spec generator produces PostgreSQL schema, OpenAPI contracts, and wireframes.',
          timeTag: 'Phase 1 (Specification)',
          status: 'Done'
        },
        {
          nodeId: 1,
          stageTitle: 'STAGE 2 · BUILD',
          role: 'Parallel Full-Stack Build',
          action: 'Multi-agent coding workflow writes backend CRUD controllers and responsive frontend dashboard simultaneously.',
          timeTag: 'Phase 2 (Parallel Build)',
          status: 'Done'
        },
        {
          nodeId: 2,
          stageTitle: 'STAGE 3 · QA',
          role: 'Automated QA & Security',
          action: 'End-to-end testing, payment webhook verification, mobile responsiveness pass, and security headers check.',
          timeTag: 'Phase 3 (Automated Audit)',
          status: 'Done'
        },
        {
          nodeId: 3,
          stageTitle: 'STAGE 4 · DEPLOY',
          role: 'Production Release & Launch',
          action: 'Staging deployed on Vercel/AWS. Automated walkthrough completed. Production-ready with comprehensive test suite.',
          timeTag: 'Phase 4 (Live Production)',
          status: 'Complete'
        }
      ]
    },
    {
      id: 'landing-page',
      name: 'High-Converting Web App / Landing Page',
      promisedTimeline: 'Design-Engineered System',
      actualDelivery: '98+ Lighthouse · WCAG AA Compliant',
      scope: 'Custom responsive design, 60fps animations, contact form, SEO optimization',
      stages: [
        {
          nodeId: 0,
          stageTitle: 'STAGE 1 · DESIGN',
          role: 'Design System & Copy',
          action: 'Typography, color tokens, and layout wireframes tailored to product target audience.',
          timeTag: 'Phase 1 (Design Setup)',
          status: 'Done'
        },
        {
          nodeId: 1,
          stageTitle: 'STAGE 2 · BUILD',
          role: 'Component Build & Polish',
          action: 'Vite/Vanilla CSS build, fluid clamp scaling, hardware-accelerated animations, and dark mode.',
          timeTag: 'Phase 2 (Build)',
          status: 'Done'
        },
        {
          nodeId: 2,
          stageTitle: 'STAGE 3 · AUDIT',
          role: 'SEO & Performance Audit',
          action: 'Lighthouse score locked at 98+, OpenGraph cards verified, WCAG 2.2 accessibility AA compliant.',
          timeTag: 'Phase 3 (Optimization)',
          status: 'Done'
        },
        {
          nodeId: 3,
          stageTitle: 'STAGE 4 · LAUNCH',
          role: 'Domain & CDN Deployment',
          action: 'Custom domain connected, SSL secured, production walkthrough video provided.',
          timeTag: 'Phase 4 (Live Launch)',
          status: 'Complete'
        }
      ]
    },
    {
      id: 'ai-automation',
      name: 'Custom AI Agent Workflow / Internal Tool',
      promisedTimeline: 'Autonomous Pipeline',
      actualDelivery: 'Deterministic Output · MCP Connected',
      scope: 'Model Context Protocol (MCP) server, autonomous data extraction pipeline & dashboard',
      stages: [
        {
          nodeId: 0,
          stageTitle: 'STAGE 1 · MAPPING',
          role: 'Process Mapping',
          action: 'Analyzing system operational bottlenecks; creating deterministic LLM prompt schemas and API definitions.',
          timeTag: 'Phase 1 (Mapping)',
          status: 'Done'
        },
        {
          nodeId: 1,
          stageTitle: 'STAGE 2 · INTEGRATION',
          role: 'MCP Server & Integrations',
          action: 'Connecting Claude/Gemini API to internal database, cloud storage, or CRM tools via secure MCP transport.',
          timeTag: 'Phase 2 (Integration)',
          status: 'Done'
        },
        {
          nodeId: 2,
          stageTitle: 'STAGE 3 · FUZZING',
          role: 'Fuzzing & Review Gate',
          action: 'Simulating 500 edge cases, verifying zero hallucinations, and adding safety approval controls.',
          timeTag: 'Phase 3 (Validation)',
          status: 'Done'
        },
        {
          nodeId: 3,
          stageTitle: 'STAGE 4 · PIPELINE',
          role: 'Live Workflow Deployment',
          action: 'Automated job runner online. Engineering team onboarding session completed with full documentation.',
          timeTag: 'Phase 4 (Deployment)',
          status: 'Complete'
        }
      ]
    }
  ];

  let currentScenario = engineeringScenarios[0];
  let isRunning = false;

  container.innerHTML = `
    <div class="simulator-box">
      <div class="simulator-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="pulse-dot"></span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">
            AUTONOMOUS ENGINEERING ENGINE: ZERO CODE DEFECTS
          </span>
          <span class="badge badge-emerald" style="font-size: 0.7rem;">SENIOR CRAFT STANDARD</span>
        </div>

        <div style="display: flex; gap: 8px;">
          <select id="scenario-selector" class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-primary); cursor: pointer; outline: none; padding: 6px 12px;">
            ${engineeringScenarios.map(s => `<option value="${s.id}" style="background: #111; color: #fff;">${s.name}</option>`).join('')}
          </select>
          <button id="run-delivery-btn" class="btn btn-primary" style="padding: 6px 16px; font-size: 0.825rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Simulate Pipeline
          </button>
        </div>
      </div>

      <!-- Scope Description Bar -->
      <div style="padding: 12px 20px; background: rgba(0, 240, 255, 0.04); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-size: 0.825rem; font-family: var(--font-mono);">
        <div>
          <span style="color: var(--text-tertiary);">Project Scope:</span>
          <strong id="scope-desc" style="color: #fff; margin-left: 6px;">${currentScenario.scope}</strong>
        </div>
        <div>
          <span style="color: var(--text-tertiary);">Standard:</span>
          <span id="sla-badge" class="badge badge-cyan" style="font-size: 0.725rem;">${currentScenario.promisedTimeline}</span>
        </div>
      </div>

      <!-- 4 Concrete Milestone Stages -->
      <div class="simulator-nodes">
        <div class="node-card" id="stage-0">
          <div class="node-header">
            <span id="badge-stage-0">PHASE 1</span>
            <span class="badge badge-cyan" style="font-size: 0.65rem;">STAGE 1</span>
          </div>
          <div class="node-title">Spec & Architecture</div>
          <div class="node-status">Schema & Wireframes</div>
        </div>

        <div class="node-card" id="stage-1">
          <div class="node-header">
            <span id="badge-stage-1">PHASE 2</span>
            <span class="badge badge-violet" style="font-size: 0.65rem;">STAGE 2</span>
          </div>
          <div class="node-title">Parallel Synthesis</div>
          <div class="node-status">Frontend + Backend Build</div>
        </div>

        <div class="node-card" id="stage-2">
          <div class="node-header">
            <span id="badge-stage-2">PHASE 3</span>
            <span class="badge" style="font-size: 0.65rem;">STAGE 3</span>
          </div>
          <div class="node-title">Automated QA & Polish</div>
          <div class="node-status">Unit & Accessibility Tests</div>
        </div>

        <div class="node-card" id="stage-3">
          <div class="node-header">
            <span id="badge-stage-3">PHASE 4</span>
            <span class="badge badge-emerald" style="font-size: 0.65rem;">STAGE 4</span>
          </div>
          <div class="node-title">Production Release</div>
          <div class="node-status">Deployment Verified</div>
        </div>
      </div>

      <!-- Live Terminal Output -->
      <div class="terminal-console scanline-box" id="delivery-terminal" aria-live="polite">
        <div class="terminal-line">
          <span class="terminal-time">[MILESTONE]</span>
          <span class="terminal-actor">SYSTEM PIPELINE:</span>
          <span class="terminal-action">Autonomous architecture engine initialized with senior craft standards. AI-assisted engineering ready to eliminate development bottlenecks.</span>
        </div>
      </div>

      <!-- Guarantee Footer -->
      <div style="padding: 12px 20px; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-tertiary); flex-wrap: wrap; gap: 8px;">
        <div>
          <span style="color: var(--text-secondary);">Production Guarantee:</span> 
          <span style="color: var(--emerald-status); font-weight: 600;">Clean Scalable Architecture. Senior-Level Code Quality.</span>
        </div>
        <div>
          <span style="color: var(--text-secondary);">Quality Metric:</span> 
          <span id="result-metric" style="color: var(--cyan-primary); font-weight: 600;">${currentScenario.actualDelivery}</span>
        </div>
      </div>
    </div>
  `;

  const selector = container.querySelector('#scenario-selector');
  const runBtn = container.querySelector('#run-delivery-btn');
  const terminal = container.querySelector('#delivery-terminal');
  const scopeDesc = container.querySelector('#scope-desc');
  const slaBadge = container.querySelector('#sla-badge');
  const resultMetric = container.querySelector('#result-metric');

  selector.addEventListener('change', (e) => {
    currentScenario = engineeringScenarios.find(s => s.id === e.target.value) || engineeringScenarios[0];
    scopeDesc.textContent = currentScenario.scope;
    slaBadge.textContent = currentScenario.promisedTimeline;
    resultMetric.textContent = currentScenario.actualDelivery;
    resetSimulator();
  });

  runBtn.addEventListener('click', () => {
    if (isRunning) return;
    runSimulation();
  });

  function resetSimulator() {
    for (let i = 0; i < 4; i++) {
      const node = container.querySelector(`#stage-${i}`);
      node.classList.remove('active', 'completed');
    }
    terminal.innerHTML = `
      <div class="terminal-line">
        <span class="terminal-time">[READY]</span>
        <span class="terminal-actor">WORKFLOW:</span>
        <span class="terminal-action">Scope: <strong style="color: #fff;">${currentScenario.name}</strong>. Click 'Simulate Pipeline' to observe progression.</span>
      </div>
    `;
  }

  async function runSimulation() {
    isRunning = true;
    runBtn.disabled = true;
    runBtn.style.opacity = '0.5';
    resetSimulator();

    for (let i = 0; i < currentScenario.stages.length; i++) {
      const stage = currentScenario.stages[i];
      const node = container.querySelector(`#stage-${stage.nodeId}`);

      node.classList.add('active');
      sound.playAgentStep();

      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = `
        <span class="terminal-time">[${stage.stageTitle}]</span>
        <span class="terminal-actor">[${stage.role}]</span>
        <span class="terminal-action">${stage.action}</span>
      `;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;

      await new Promise(r => setTimeout(r, 650));

      node.classList.remove('active');
      node.classList.add('completed');
    }

    const successLine = document.createElement('div');
    successLine.className = 'terminal-line';
    successLine.innerHTML = `
      <span class="terminal-time">[SUCCESS]</span>
      <span class="terminal-actor" style="color: var(--emerald-status);">PIPELINE VERIFIED:</span>
      <span class="terminal-success">Production delivery verified: ${currentScenario.actualDelivery}. Zero code defects.</span>
    `;
    terminal.appendChild(successLine);
    terminal.scrollTop = terminal.scrollHeight;

    sound.playSuccess();
    isRunning = false;
    runBtn.disabled = false;
    runBtn.style.opacity = '1';
  }
}
