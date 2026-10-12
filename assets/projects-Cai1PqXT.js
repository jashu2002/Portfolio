import{i as k,a as L,s as E,b as A,e as z,c as T}from"./motionflow-setup-rnESdfuI.js";/* empty css                   */const I={dhansiri:{badge:'<span class="badge badge-cyan">COMMERCIAL · E-COMMERCE</span>',title:"Dhansiri Chakki Fresh Atta Platform",purpose:"Multi-Page D2C Storefront, B2B Portal & Direct WhatsApp Checkout",github:"https://github.com/jashu2002/dhansiri",live:"https://dhansiri-ten.vercel.app/",tech:["HTML5","CSS3 Custom Properties","Vanilla JavaScript (ES6+)","WhatsApp API","Vercel Edge","Responsive Design"],body:`
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">1. The Problem & Business Goal</h3>
            <p>DTR Elite Industries required a modern direct-to-consumer e-commerce storefront for their traditional stone-ground chakki wheat flour brand (Dhansiri). The client needed a zero-friction ordering flow without recurring Shopify/SaaS platform subscriptions, dynamic packaging size selectors (1kg, 5kg, 10kg), free delivery thresholds, coupon validation, and instant ordering tailored to Indian regional consumers.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">2. What I Built & Architecture</h3>
            <p>Engineered a high-performance multi-page commercial platform with zero external runtime dependencies (pure HTML5, CSS3 design tokens, modular ES6 JavaScript). Features include an interactive shopping cart with local session persistence, 3D mouse parallax packaging showcase, live stone chakki process visualization, wholesale B2B lead capture, and instant WhatsApp checkout integration.</p>
            <div style="background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.8rem; color: var(--cyan-primary); margin-top: 8px;">
              [Browser Client] ──> [Interactive Pack Sizing (1kg / 5kg / 10kg)] ──> [Client Cart State Engine]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──> [Formatted WhatsApp Order Payload Dispatcher]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [Global Vercel Edge Network Deployment]
            </div>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">3. Key Engineering Challenge & Solution</h3>
            <p><strong>Challenge:</strong> Complex payment gateways often cause 60%+ checkout drop-offs for regional grocery buyers who prefer ordering directly with merchant confirmation.<br>
            <strong>Solution:</strong> Implemented a 1-click WhatsApp order generator that serializes the customer's selected pack sizes, quantities, applied coupon discount, total amount, and delivery address into a formatted URL string dispatched immediately to the brand's business line, closing the conversion loop in seconds.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">4. Production & Business Impact</h3>
            <p style="font-style: italic; color: var(--text-primary); border-left: 2px solid var(--cyan-primary); padding-left: 12px;">
              "Live in production at dhansiri-ten.vercel.app with 0 external JavaScript libraries, near-instant 100/100 Lighthouse performance metrics, and zero recurring hosting or platform fees for the client."
            </p>
          </div>
        `},woofe:{badge:'<span class="badge badge-cyan">NEXT.JS · LUXURY E-COMMERCE</span>',title:"WOofe — Luxury Dog Lifestyle & Furniture",purpose:"Scandinavian Architectural Pet Furniture Concept Store & Interactive Storytelling",github:"https://github.com/jashu2002/woofz",live:"https://woozy-xi.vercel.app/",tech:["Next.js 16","React 19","TypeScript","Tailwind CSS v4","GSAP","Framer Motion","Lucide Icons","Vercel Edge"],body:`
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">1. The Problem & Design Vision</h3>
            <p>Traditional pet supply e-commerce sites suffer from visually cluttered, generic product listings that clash with high-end interior aesthetics. The objective was to design and engineer an architectural concept store for WOofe—a Copenhagen-inspired luxury brand uniting canine orthopedic ergonomics with Scandinavian minimalism (bouclé wool, Belgian linen, architectural oak, and orthopedic memory foam).</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">2. What I Built & Architecture</h3>
            <p>Built a modern frontend application on Next.js 16 (App Router) and React 19 leveraging TypeScript for strict component typing. Integrated fluid gesture animations using GSAP and Framer Motion, 3D perspective product cards with smooth hover parallax, an interactive horizontal material storytelling timeline with pulse inspection hotspots, and a slide-out cart drawer with dynamic item state.</p>
            <div style="background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.8rem; color: var(--cyan-primary); margin-top: 8px;">
              [Next.js 16 App Router] ──> [React 19 Server/Client Components] ──> [Tailwind CSS v4 Design Tokens]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──> [GSAP & Framer Motion Physics Engine]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [Interactive Slide-Out Shopping Cart State]
            </div>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">3. Key Engineering Challenge & Solution</h3>
            <p><strong>Challenge:</strong> Orchestrating complex multi-layered scroll timelines and material hotspot inspection dialogs without causing jank or layout recalculations on mobile devices.<br>
            <strong>Solution:</strong> Leveraged GPU-accelerated CSS transforms paired with GSAP timeline batching, offloading spring physics to Framer Motion components with strict <code>will-change: transform</code> hints for smooth, hardware-accelerated scrolling.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">4. Production & Craftsmanship</h3>
            <p style="font-style: italic; color: var(--text-primary); border-left: 2px solid var(--cyan-primary); padding-left: 12px;">
              "Live at woozy-xi.vercel.app with flawless type hierarchy, warm organic color palettes (terracotta, ivory, sand, espresso), and editorial craftsmanship tailored for luxury commerce."
            </p>
          </div>
        `},mood:{badge:'<span class="badge badge-cyan">E-COMMERCE · LUXURY BRAND</span>',title:"Mood & Musk Luxury Perfumery",purpose:"Artisanal Fragrance Showcase, Accord Visualizer & Discovery Sets",github:"https://github.com/jashu2002",live:"#",tech:["HTML5","CSS3 Custom Properties","Vanilla JavaScript (ES6+)","Responsive Grid","Vercel Edge"],body:`
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">1. The Problem & Brand Vision</h3>
            <p>Selling high-end artisanal perfumery online is notoriously challenging because buyers cannot physically smell fragrance formulations. The requirement was to build an immersive digital storefront for Mood & Musk that visually communicates olfactory scent pyramids (Top, Heart, Base notes) and evokes mood associations (Smoky Oud, Santal Noir, Bergamot Glow).</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">2. What I Built & Architecture</h3>
            <p>Designed and built a tactile direct-to-consumer storefront with bespoke olfactive accord breakdown cards, interactive notes pyramids, discovery set selectors, and a persistent client shopping cart. Emphasized rich typography, warm obsidian surfaces, and zero-jank micro-interactions on mobile devices.</p>
            <div style="background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.8rem; color: var(--cyan-primary); margin-top: 8px;">
              [Browser Client] ──> [Fragrance Note Accord Visualizer] ──> [Concentration Selector (50ml / 100ml)]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [Cart State Manager] ──> [Direct Checkout Flow]
            </div>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">3. Key Engineering Decision</h3>
            <p><strong>Decision:</strong> Used lightweight CSS custom property palettes for instant theme switches between scent profiles without downloading heavy image assets or 3D runtimes, preserving sub-second mobile page loads.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">4. Status & Availability</h3>
            <p style="font-style: italic; color: var(--text-primary); border-left: 2px solid var(--cyan-primary); padding-left: 12px;">
              "Live showcase demonstrating luxury aesthetic sensibility, conversion copywriting, and friction-free shopping experience."
            </p>
          </div>
        `},ecommerce:{badge:'<span class="badge badge-cyan">DJANGO · FULL-STACK</span>',title:"369 Herbal's E-Commerce Platform",purpose:"Full-Stack Ayurvedic Wellness Storefront & Inventory System",github:"https://github.com/jashu2002/369-Herbal-s",tech:["Django","Python","MySQL","HTML5","CSS3","JavaScript"],body:`
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">1. The Problem</h3>
            <p>An Ayurvedic wellness client needed a direct-to-consumer online storefront for hair oils and health formulations. The platform required categorized product exploration, persistent customer shopping carts, checkout validation, and an internal administrative workflow for tracking customer orders without third-party vendor lock-in.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">2. What I Built & Architecture</h3>
            <p>Engineered an end-to-end Django web application using the Model-View-Template (MVT) architectural pattern backed by a relational MySQL database. Implemented dynamic catalog querying with slug-based routing, customer authentication, session-persisted shopping carts, and a streamlined checkout flow.</p>
            <div style="background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.8rem; color: var(--cyan-primary); margin-top: 8px;">
              [Browser Client] ──HTTP──> [Django URL Router & Views] ──ORM──> [MySQL Relational DB]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [Session-Based Cart Manager] ──> [Atomic Order Finalizer]
            </div>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">3. Key Engineering Challenge & Solution</h3>
            <p><strong>Challenge:</strong> Preventing race conditions and inaccurate inventory updates during concurrent customer checkouts.<br>
            <strong>Solution:</strong> Wrapped the order creation and stock decrement logic in Django's <code>transaction.atomic()</code> block. If any step failed (such as payment token failure or insufficient stock), all state changes rolled back completely to preserve database integrity.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">4. What I Learned</h3>
            <p style="font-style: italic; color: var(--text-primary); border-left: 2px solid var(--cyan-primary); padding-left: 12px;">
              "Managing stateful transactions taught me never to trust client-side values. Re-calculating prices and validating quantities strictly on the server is fundamental to reliable e-commerce systems."
            </p>
          </div>
        `},video:{badge:'<span class="badge badge-violet">AI AUTOMATION · PIPELINE</span>',title:"AI Automated Video Pipeline",purpose:"Python Script-to-Video Engine with LLM Scripting, TTS & Video Composition",github:"https://github.com/jashu2002/video_creator",tech:["Python","MoviePy","FFmpeg","TTS Engine","LLM APIs","Pillow"],body:`
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">1. The Problem</h3>
            <p>Creating short-form informational or marketing videos manually is labor-intensive: drafting scripts, generating audio voiceovers, finding matching visual assets, aligning subtitles, and exporting MP4 compositions takes hours of tedious editing per video.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">2. What I Built & Architecture</h3>
            <p>Engineered an end-to-end automated Python pipeline that takes a single text prompt, generates a scene-by-scene script with visual cues via LLM API, synthesizes voiceover audio, generates synchronized subtitles, and stitches together images and animations into a finalized 1080p MP4 file via MoviePy and FFmpeg.</p>
            <div style="background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.8rem; color: var(--violet-primary); margin-top: 8px;">
              [Text Topic Prompt] ──> [LLM Structured Script JSON] ──> [TTS Audio Generation Engine]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [MoviePy + FFmpeg Audio/Visual Sync] ──> [1080p MP4 Render]
            </div>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">3. Key Engineering Challenge & Solution</h3>
            <p><strong>Challenge:</strong> Discrepancies between voiceover durations and visual slide lengths causing audio to be cut off or awkward pauses at slide transitions.<br>
            <strong>Solution:</strong> Programmatically inspected generated audio file durations in milliseconds prior to video composition, dynamically calculating each scene's frame hold duration to guarantee 100% synchronization.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">4. Status & Limitations</h3>
            <p style="font-style: italic; color: var(--text-primary); border-left: 2px solid var(--violet-primary); padding-left: 12px;">
              "MVP / Experimental tool built for batch production experiments. Transparently documented on GitHub with clear local installation instructions."
            </p>
          </div>
        `},caption:{badge:'<span class="badge badge-violet">DEEP LEARNING · NLP</span>',title:"Dynamic Image Caption Generator",purpose:"CNN Visual Feature Extraction + LSTM Sequence Token Generation",github:"https://github.com/jashu2002/A-Deep-Learning-Framework-for-Dynamic-Caption-Generation",tech:["Python","TensorFlow","Keras","VGG16","LSTM","NumPy","NLTK"],body:`
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">1. The Problem</h3>
            <p>Translating unstructured visual scenes into syntactically correct, contextually descriptive natural language descriptions is a core challenge in multimodal machine intelligence, requiring simultaneous scene understanding and natural language sentence generation.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">2. What I Built & Architecture</h3>
            <p>Constructed an encoder-decoder neural network trained on the Flickr8k benchmark. Visual features are extracted using a pre-trained VGG16 Convolutional Neural Network (discarding the final softmax classification layer to yield a 4096-dimensional representation). The dense embedding is fused with tokenized text sequences and passed into a Long Short-Term Memory (LSTM) recurrent decoder that generates word probabilities sequentially until an <code>&lt;end&gt;</code> token is predicted.</p>
            <div style="background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.8rem; color: var(--violet-primary); margin-top: 8px;">
              [Input Photo] ──> [VGG16 CNN (Dense 4096)] ──> [Feature Bottleneck (256-dim)] ──┐<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──> [Fusion Dense Layer] ──> [LSTM Token Decoder] ──> [Softmax Vocabulary Word]<br>
              [Token History] ──> [Embedding Layer (256-dim)] ─────────────────────────────────┘
            </div>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">3. Key Engineering Challenge & Solution</h3>
            <p><strong>Challenge:</strong> Extremely slow training epochs and memory bottlenecks caused by repeatedly running multi-layer CNN forward passes on thousands of images.<br>
            <strong>Solution:</strong> Precomputed all VGG16 feature embeddings in a one-time preprocessing pass, serializing them into compressed NumPy structures. During LSTM sequence training, the model read pre-extracted feature vectors directly, accelerating training epoch speed by more than 10x.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">4. What I Learned</h3>
            <p style="font-style: italic; color: var(--text-primary); border-left: 2px solid var(--violet-primary); padding-left: 12px;">
              "Decoupling static feature extraction from iterative recurrent sequence training saved immense compute time and made systematic hyperparameter tuning feasible."
            </p>
          </div>
        `},cancer:{badge:'<span class="badge badge-emerald">MACHINE LEARNING</span>',title:"Clinical Breast Cancer Prediction System",purpose:"Supervised Classification of Diagnostic Fine Needle Aspirate Features",github:"https://github.com/jashu2002/Breast-Cancer-prediction-using-various-machine-learning",tech:["Python","Scikit-learn","Pandas","NumPy","Matplotlib","Seaborn"],body:`
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">1. The Problem</h3>
            <p>Accurate differentiation between benign and malignant cell masses from clinical biopsy reports is critical for patient health. In medical diagnostics, a false negative (failing to diagnose malignancy) is significantly more hazardous than a false positive, making threshold calibration essential.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">2. What I Built & Architecture</h3>
            <p>Designed a rigorous machine learning analysis pipeline using the Wisconsin Diagnostic Breast Cancer dataset (569 patient instances, 30 continuous cellular attributes). Conducted multi-collinearity analysis, standardized features using <code>StandardScaler</code>, and benchmarked Logistic Regression against Random Forest and Support Vector Classifiers using stratified 5-fold cross validation.</p>
            <div style="background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.8rem; color: var(--emerald-status); margin-top: 8px;">
              [Clinical FNA Data] ──> [Correlation Matrix Heatmap] ──> [StandardScaler Normalization]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [Stratified K-Fold Splits] ──> [Logistic Regression / RF] ──> [ROC-AUC & Confusion Matrix]
            </div>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">3. Key Engineering Challenge & Solution</h3>
            <p><strong>Challenge:</strong> High feature correlation between radius, perimeter, and area (Pearson correlation &gt; 0.98) causing coefficient instability in linear models.<br>
            <strong>Solution:</strong> Pruned redundant collinear predictors based on correlation thresholds and evaluated feature importances using Random Forest Gini impurity reductions, stabilizing model decision boundaries.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">4. What I Learned</h3>
            <p style="font-style: italic; color: var(--text-primary); border-left: 2px solid var(--emerald-status); padding-left: 12px;">
              "In clinical data science, optimizing for raw accuracy is irresponsible—evaluating confusion matrices, false-negative penalties, and ROC-AUC is what makes a model technically credible."
            </p>
          </div>
        `},yolo:{badge:'<span class="badge badge-cyan">COMPUTER VISION</span>',title:"Real-Time YOLO Object Detection Pipeline",purpose:"Video Stream Bounding Box Localization & Telemetry Tracking",github:"https://github.com/jashu2002/YOLO-Object-Detection",tech:["Python","OpenCV","YOLOv8","PyTorch","NumPy"],body:`
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">1. The Problem</h3>
            <p>Real-time visual stream understanding requires high-accuracy bounding box regression and multi-class object classification without introducing frame lag or queue overflow on standard compute hardware.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">2. What I Built & Architecture</h3>
            <p>Constructed an asynchronous OpenCV and PyTorch video processing pipeline utilizing YOLOv8. Incoming camera frames are normalized with letterbox resizing, fed through single-stage convolutional detection heads, and filtered using Non-Maximum Suppression (NMS) to generate smooth bounding box overlays, class labels, and live frame-rate telemetry.</p>
            <div style="background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.8rem; color: var(--cyan-primary); margin-top: 8px;">
              [Camera Stream] ──> [OpenCV Frame Capture] ──> [Letterbox 640x640 Normalization]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [YOLOv8 PyTorch Inference] ──> [IoU NMS Filtering] ──> [Live Bounding Box Overlay]
            </div>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">3. Key Engineering Challenge & Solution</h3>
            <p><strong>Challenge:</strong> Duplicate overlapping detections on single objects in dense visual environments.<br>
            <strong>Solution:</strong> Tuned Non-Maximum Suppression (NMS) Intersection-over-Union (IoU) thresholds to 0.45 and set confidence filtering to 0.50, eliminating visual clutter while maintaining detection recall.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">4. What I Learned</h3>
            <p style="font-style: italic; color: var(--text-primary); border-left: 2px solid var(--cyan-primary); padding-left: 12px;">
              "Computer vision performance depends heavily on pre- and post-processing efficiency. Well-tuned resizing and suppression can double throughput without degrading detection quality."
            </p>
          </div>
        `},fastapi:{badge:'<span class="badge badge-emerald">BACKEND · REST API</span>',title:"FastAPI Modular REST API Service",purpose:"Layered API Architecture with Dependency Injection, JWT & SQLAlchemy",github:"https://github.com/jashu2002/server1",tech:["FastAPI","Python","SQLAlchemy","Pydantic","Uvicorn","Bcrypt","PyJWT"],body:`
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">1. The Problem</h3>
            <p>Unstructured backend prototypes frequently mix routing, database queries, and business logic into monolithic files, leading to brittle refactors, credential leaks, and difficult testing as the application grows.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">2. What I Built & Architecture</h3>
            <p>Designed a clean, layered backend service following modern Python software conventions. Implemented decoupled router modules, Pydantic request/response schemas, SQLAlchemy relational models, and dependency-injected database sessions.</p>
            <div style="background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.8rem; color: var(--emerald-status); margin-top: 8px;">
              [HTTP Request] ──> [FastAPI Router] ──> [Pydantic Validation Schema]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [Depends(get_db) Session] ──> [SQLAlchemy ORM] ──> [Database Engine]<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [Pydantic ResponseModel Filter] ──> [Safe 200 OK JSON Output]
            </div>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">3. Key Engineering Challenge & Solution</h3>
            <p><strong>Challenge:</strong> Ensuring user authentication credentials and password hashes never leak into API responses.<br>
            <strong>Solution:</strong> Enforced distinct Pydantic models for <code>UserCreate</code>, <code>UserInDB</code>, and <code>UserOut</code>. The response model explicitly excludes hashed passwords, guaranteeing strict serialization boundaries.</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 1.05rem; margin-bottom: 6px;">4. What I Learned</h3>
            <p style="font-style: italic; color: var(--text-primary); border-left: 2px solid var(--emerald-status); padding-left: 12px;">
              "Leveraging FastAPI's dependency injection system guarantees clean resource lifecycles—database sessions open per request and close predictably, preventing connection leaks."
            </p>
          </div>
        `}},h=()=>{k(),L(),E(),A(),z();const r=T(),l=document.querySelectorAll(".filter-btn"),d=document.querySelectorAll(".filter-dropdown-item"),t=document.querySelector(".filter-dropdown-container"),i=document.getElementById("filter-dropdown-btn"),c=document.querySelector(".filter-dropdown-current"),f=document.querySelectorAll(".project-item");function m(n,e){l.forEach(s=>{s.getAttribute("data-filter")===n?s.classList.add("active","badge-cyan"):s.classList.remove("active","badge-cyan")}),d.forEach(s=>{const p=s.getAttribute("data-filter")===n;s.classList.toggle("active",p),s.setAttribute("aria-selected",p?"true":"false")}),c&&e&&(c.textContent=e),f.forEach(s=>{const p=s.getAttribute("data-category");n==="all"||p===n?(s.classList.remove("is-hidden"),s.style.removeProperty("display")):(s.classList.add("is-hidden"),s.style.setProperty("display","none","important"))}),r&&typeof r.refresh=="function"&&r.refresh(),window.parallaxEngine&&typeof window.parallaxEngine.refresh=="function"&&window.parallaxEngine.refresh()}i&&t&&(i.addEventListener("click",n=>{n.stopPropagation();const e=t.classList.toggle("open");i.setAttribute("aria-expanded",e?"true":"false")}),document.addEventListener("click",n=>{t.contains(n.target)||(t.classList.remove("open"),i.setAttribute("aria-expanded","false"))})),d.forEach(n=>{n.addEventListener("click",e=>{e.stopPropagation();const s=n.getAttribute("data-filter"),p=n.querySelector("span"),g=p?p.textContent.trim():n.textContent.trim();m(s,g),t&&i&&(t.classList.remove("open"),i.setAttribute("aria-expanded","false"))})}),l.forEach(n=>{n.addEventListener("click",()=>{const e=n.getAttribute("data-filter"),s=n.textContent.trim();m(e,s)})});const b=document.getElementById("case-study-modal-backdrop"),y=document.getElementById("modal-case-badge"),v=document.getElementById("modal-case-title"),x=document.getElementById("modal-case-purpose"),S=document.getElementById("modal-case-body"),w=document.getElementById("modal-case-tech"),C=document.getElementById("modal-case-github"),o=document.getElementById("modal-case-live"),u=document.getElementById("btn-close-case-modal");function P(n){const e=I[n];e&&(y.innerHTML=e.badge,v.textContent=e.title,x.textContent=e.purpose,S.innerHTML=e.body,C.setAttribute("href",e.github),o&&(e.live?(o.setAttribute("href",e.live),o.style.display="inline-flex"):o.style.display="none"),w.innerHTML=e.tech.map(s=>`<span class="badge" style="font-size: 0.725rem;">${s}</span>`).join(""),b.classList.add("open"),document.body.style.overflow="hidden")}function a(){b.classList.remove("open"),document.body.style.overflow=""}document.querySelectorAll(".btn-open-case-study").forEach(n=>{n.addEventListener("click",e=>{e.preventDefault();const s=n.getAttribute("data-project");P(s)})}),u&&u.addEventListener("click",a),b&&b.addEventListener("click",n=>{n.target===b&&a()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&b.classList.contains("open")&&a()})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",h):h();
