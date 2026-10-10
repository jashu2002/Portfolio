/**
 * Code Execution Sandbox Controller
 * Interactive typing simulator, live runtime compilation, and telemetry streamer
 * Crafted with zero external dependencies and 60 FPS performance
 */
import { sound } from './audio.js';

export const CODE_SCENARIOS = {
  fastapi_auth: {
    id: 'fastapi_auth',
    title: 'blog_api_auth.py',
    lang: 'python',
    badge: 'PYTHON // FASTAPI & SQLALCHEMY',
    command: 'pytest tests/test_auth_api.py -v',
    code: `from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_db
from core.security import verify_token, get_current_user
from models.post import PostModel
from schemas.post import PostCreate, PostResponse

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def create_post(
    payload: PostCreate, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Secure endpoint creating a post bound to the authenticated user ID."""
    new_post = PostModel(
        title=payload.title,
        content=payload.content,
        author_id=current_user.id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post`,
    logs: [
      { delay: 80, text: '⟳ [0.00s] Initializing test session: FastAPI test client loaded...', type: 'info' },
      { delay: 180, text: '✓ [0.11s] Database schema verified: Relational constraints & foreign keys intact', type: 'success' },
      { delay: 280, text: '⚡ [0.22s] Executing OAuth2 password bearer token validation...', type: 'info' },
      { delay: 380, text: '🔑 [0.35s] JWT signature validated: User authenticated (ID: 104)', type: 'accent' },
      { delay: 490, text: '📦 [0.48s] POST /posts/ 201 Created: New record persisted to SQLite/MySQL', type: 'info' },
      { delay: 620, text: '🛡️ [0.61s] Ownership validation test passed: Unauthorized edits blocked (403)', type: 'success' },
      { delay: 760, text: '✓ [0.74s] All API unit tests passed (8/8) with 100% schema coverage', type: 'success' },
      { delay: 880, text: '● [STATUS] Tests passed: Exit code 0 · REST endpoints verified', type: 'metric' }
    ]
  },

  caption_lstm: {
    id: 'caption_lstm',
    title: 'caption_generator.py',
    lang: 'python',
    badge: 'DEEP LEARNING // CNN & LSTM',
    command: 'python evaluate_model.py --weights model.h5',
    code: `import numpy as np
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.sequence import pad_sequences

def generate_caption(model, tokenizer, image_features, max_length=34):
    """Generates natural language caption token-by-token from CNN image embeddings."""
    in_text = "startseq"
    
    for _ in range(max_length):
        sequence = tokenizer.texts_to_sequences([in_text])[0]
        sequence = pad_sequences([sequence], maxlen=max_length)
        
        # Predict next word distribution
        yhat = model.predict([image_features, sequence], verbose=0)
        word_id = np.argmax(yhat)
        predicted_word = tokenizer.index_word.get(word_id)
        
        if predicted_word is None or predicted_word == "endseq":
            break
        in_text += f" {predicted_word}"
        
    return in_text.replace("startseq", "").strip()`,
    logs: [
      { delay: 80, text: '⟳ [0.00s] Loading pre-trained CNN feature extractor & LSTM weights...', type: 'info' },
      { delay: 160, text: '✓ [0.12s] CNN visual embeddings loaded (shape: [1, 4096])', type: 'success' },
      { delay: 280, text: '⚡ [0.25s] Initializing sequence decoder with vocabulary size 8,450...', type: 'info' },
      { delay: 420, text: '🧠 [0.41s] Generating token sequence: "a dog running through grassy field"', type: 'accent' },
      { delay: 560, text: '📊 [0.58s] Model evaluation complete: BLEU-1 score achieved on test split', type: 'accent' },
      { delay: 700, text: '⚡ [0.72s] Inference latency steady · Zero tensor allocation leak', type: 'success' },
      { delay: 840, text: '● [STATUS] Pipeline verification complete: Captioning pipeline operational', type: 'metric' }
    ]
  },

  yolo_vision: {
    id: 'yolo_vision',
    title: 'yolo_detector.py',
    lang: 'python',
    badge: 'COMPUTER VISION // OPENCV & YOLO',
    command: 'python detect.py --source test_stream.mp4 --conf 0.5',
    code: `import cv2
from ultralytics import YOLO

# Load real-time YOLO object detection weights
model = YOLO("yolov8n.pt")
cap = cv2.VideoCapture("input_stream.mp4")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
        
    # Execute batch frame inference
    results = model(frame, conf=0.50, verbose=False)
    
    for result in results:
        boxes = result.boxes
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cls_name = model.names[int(box.cls[0])]
            conf = float(box.conf[0])
            
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 240, 255), 2)
            cv2.putText(frame, f"{cls_name} {conf:.2f}", (x1, y1 - 6),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 240, 255), 1)`,
    logs: [
      { delay: 80, text: '⟳ [0.00s] Initializing OpenCV video capture & YOLOv8 model weights...', type: 'info' },
      { delay: 150, text: '✓ [0.09s] Neural network weights loaded into memory buffer', type: 'success' },
      { delay: 270, text: '⚡ [0.21s] Video stream opened: 1920x1080 resolution at 30 FPS', type: 'info' },
      { delay: 410, text: '🎯 [0.36s] Detections active: [person: 0.92, car: 0.88, traffic light: 0.84]', type: 'accent' },
      { delay: 560, text: '✓ [0.51s] Non-Maximum Suppression (NMS) applied to overlapping bounding boxes', type: 'success' },
      { delay: 720, text: '🚀 [0.67s] Real-time frame processing steady · Multi-class tracking verified', type: 'success' },
      { delay: 850, text: '● [STATUS] Computer vision worker: 0 dropped frames · Complete', type: 'metric' }
    ]
  }
};

/**
 * Lightweight syntax highlighter with zero external dependencies
 */
function highlightCode(code, lang) {
  // Escape HTML characters
  let safe = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (lang === 'python') {
    // Comments
    safe = safe.replace(/(#[^\n]*)/g, '<span class="syn-cm">$1</span>');
    // Docstrings & Strings
    safe = safe.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|f?['"][^'"]*['"])/g, '<span class="syn-str">$1</span>');
    // Keywords
    safe = safe.replace(/\b(from|import|async|def|await|with|as|for|in|return|if|else|elif|while|break|not|is|None|True|False)\b/g, '<span class="syn-kw">$1</span>');
    // Types & Classes
    safe = safe.replace(/\b(FastAPI|APIRouter|Depends|HTTPException|status|Session|Model|PostModel|PostCreate|PostResponse|Tokenizer|YOLO|VideoCapture)\b/g, '<span class="syn-type">$1</span>');
    // Functions
    safe = safe.replace(/\b(create_post|get_db|verify_token|get_current_user|generate_caption|pad_sequences|predict|argmax|read|isOpened)\b/g, '<span class="syn-fn">$1</span>');
    // Numbers
    safe = safe.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="syn-num">$1</span>');
  }

  return safe;
}

export function initCodeSandbox() {
  const container = document.getElementById('code-sandbox-root');
  if (!container) return;

  const tabButtons = container.querySelectorAll('.sandbox-tab');
  const codeDisplay = document.getElementById('sandbox-code-display') || container.querySelector('.sandbox-code-display');
  const lineNumbers = document.getElementById('sandbox-line-numbers') || container.querySelector('.sandbox-line-numbers');
  const termCommand = document.getElementById('sandbox-term-command') || container.querySelector('.sandbox-term-command');
  const termOutput = document.getElementById('sandbox-term-output') || container.querySelector('.sandbox-term-output');
  const termBadge = document.getElementById('sandbox-term-badge') || container.querySelector('.sandbox-term-badge');
  const btnRun = document.getElementById('sandbox-btn-run') || container.querySelector('.sandbox-btn-run');
  const btnCopy = document.getElementById('sandbox-btn-copy') || container.querySelector('.sandbox-btn-copy');
  const activeBadge = document.getElementById('sandbox-active-badge') || container.querySelector('.sandbox-active-badge');

  let currentKey = 'fastapi_auth';
  let isTyping = false;
  let typingTimer = null;
  let terminalTimeouts = [];

  function clearAllTimers() {
    if (typingTimer) clearTimeout(typingTimer);
    terminalTimeouts.forEach(t => clearTimeout(t));
    terminalTimeouts = [];
  }

  function updateLineNumbers(text) {
    if (!lineNumbers) return;
    const lines = text.split('\n').length;
    let numbers = '';
    for (let i = 1; i <= lines; i++) {
      numbers += `<span>${i}</span>\n`;
    }
    lineNumbers.innerHTML = numbers;
  }

  function typeCode(fullText, lang, onComplete) {
    clearAllTimers();
    isTyping = true;
    let index = 0;
    const speed = 7; // Fast, snappy, cinematic typing cadence

    // Quick burst typing
    function step() {
      // Chunk characters for buttery 60 FPS animation
      const chunkSize = Math.floor(Math.random() * 3) + 2;
      index = Math.min(index + chunkSize, fullText.length);
      const currentSlice = fullText.slice(0, index);

      codeDisplay.innerHTML = highlightCode(currentSlice, lang) + '<span class="typing-cursor" aria-hidden="true"></span>';
      updateLineNumbers(currentSlice);

      if (index < fullText.length) {
        typingTimer = setTimeout(step, speed);
      } else {
        isTyping = false;
        codeDisplay.innerHTML = highlightCode(fullText, lang) + '<span class="typing-cursor" aria-hidden="true"></span>';
        updateLineNumbers(fullText);
        if (onComplete) onComplete();
      }
    }

    step();
  }

  function runTerminal(scenario) {
    if (!termOutput) return;

    if (termCommand) {
      termCommand.textContent = `$ ${scenario.command}`;
    }

    if (termBadge) {
      termBadge.textContent = '● EXECUTING';
      termBadge.className = 'term-badge';
      termBadge.style.color = '#00F0FF';
      termBadge.style.borderColor = 'rgba(0, 240, 255, 0.4)';
      termBadge.style.background = 'rgba(0, 240, 255, 0.1)';
    }

    termOutput.innerHTML = '';

    scenario.logs.forEach((log, i) => {
      const timeout = setTimeout(() => {
        const line = document.createElement('div');
        line.className = `term-line ${log.type}`;
        line.textContent = log.text;
        line.style.opacity = '0';
        line.style.transform = 'translateY(4px)';
        termOutput.appendChild(line);

        // Micro-fade in
        requestAnimationFrame(() => {
          line.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        });

        termOutput.scrollTop = termOutput.scrollHeight;

        // On last log item, play success chime and mark status OK
        if (i === scenario.logs.length - 1) {
          if (termBadge) {
            termBadge.textContent = '✓ 200 OK';
            termBadge.style.color = '#10B981';
            termBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
            termBadge.style.background = 'rgba(16, 185, 129, 0.1)';
          }
          sound.playSuccess();
        }
      }, log.delay);

      terminalTimeouts.push(timeout);
    });
  }

  function loadScenario(key, shouldType = true) {
    currentKey = key;
    const scenario = CODE_SCENARIOS[key];
    if (!scenario) return;

    // Update active tab buttons
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === key) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    if (activeBadge) {
      activeBadge.textContent = scenario.badge;
    }

    if (shouldType) {
      typeCode(scenario.code, scenario.lang, () => {
        runTerminal(scenario);
      });
    } else {
      clearAllTimers();
      codeDisplay.innerHTML = highlightCode(scenario.code, scenario.lang) + '<span class="typing-cursor" aria-hidden="true"></span>';
      updateLineNumbers(scenario.code);
      runTerminal(scenario);
    }
  }

  // Bind Tab Click Handlers
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab === currentKey && !isTyping) return;
      sound.playClick();
      loadScenario(tab, true);
    });
  });

  // Bind Run/Replay Button
  if (btnRun) {
    btnRun.addEventListener('click', () => {
      sound.playClick();
      loadScenario(currentKey, true);
    });
  }

  // Bind Copy Code Button
  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      sound.playClick();
      const scenario = CODE_SCENARIOS[currentKey];
      if (scenario) {
        try {
          await navigator.clipboard.writeText(scenario.code);
          const originalHTML = btnCopy.innerHTML;
          btnCopy.innerHTML = `<span style="color: #10B981;">✓ Copied</span>`;
          setTimeout(() => {
            btnCopy.innerHTML = originalHTML;
          }, 2000);
        } catch (e) {
          // Fallback if clipboard api blocked
          console.warn('Clipboard write failed:', e);
        }
      }
    });
  }

  // Lazy trigger: Start animation only when scrolled into view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadScenario('agent_swarm', true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(container);
  } else {
    loadScenario('agent_swarm', true);
  }
}
