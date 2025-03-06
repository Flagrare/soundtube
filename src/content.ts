/**
 * SoundTube - YouTube IPA Subtitles
 * A simple, lovable, complete extension for learning English pronunciation
 */

// Common English words with their IPA pronunciation
const commonWords: Record<string, string> = {
  the: "ðə",
  be: "biː",
  to: "tuː",
  of: "əv",
  and: "ænd",
  a: "eɪ",
  in: "ɪn",
  that: "ðæt",
  have: "hæv",
  i: "aɪ",
  it: "ɪt",
  for: "fɔːr",
  not: "nɒt",
  on: "ɒn",
  with: "wɪð",
  he: "hiː",
  as: "æz",
  you: "juː",
  do: "duː",
  at: "æt",
  this: "ðɪs",
  but: "bʌt",
  his: "hɪz",
  by: "baɪ",
  from: "frɒm",
  they: "ðeɪ",
  we: "wiː",
  say: "seɪ",
  her: "hɜːr",
  she: "ʃiː",
  about: "əˈbaʊt",
  there: "ðɛər",
  use: "juːz",
  what: "wɒt",
  which: "wɪtʃ",
  their: "ðɛər",
  if: "ɪf",
  will: "wɪl",
  way: "weɪ",
  many: "ˈmɛni",
  then: "ðɛn",
  them: "ðɛm",
  would: "wʊd",
  write: "raɪt",
  like: "laɪk",
  so: "soʊ",
  these: "ðiːz",
  long: "lɔːŋ",
  make: "meɪk",
  thing: "θɪŋ",
  see: "siː",
  him: "hɪm",
  two: "tuː",
  has: "hæz",
  look: "lʊk",
  more: "mɔːr",
  day: "deɪ",
  could: "kʊd",
  go: "goʊ",
  come: "kʌm",
  did: "dɪd",
  sound: "saʊnd",
  number: "ˈnʌmbər",
  who: "huː",
  over: "ˈoʊvər",
  know: "noʊ",
  water: "ˈwɔːtər",
  than: "ðæn",
  call: "kɔːl",
  first: "fɜːrst",
  people: "ˈpiːpəl",
  may: "meɪ",
  down: "daʊn",
  side: "saɪd",
  been: "bɪn",
  now: "naʊ",
  find: "faɪnd",
  head: "hɛd",
  stand: "stænd",
  own: "oʊn",
  page: "peɪdʒ",
  should: "ʃʊd",
  found: "faʊnd",
  answer: "ˈænsər",
  school: "skuːl",
  grow: "groʊ",
  study: "ˈstʌdi",
  learn: "lɜːrn",
  plant: "plænt",
  cover: "ˈkʌvər",
  food: "fuːd",
  sun: "sʌn",
  four: "fɔːr",
  thought: "θɔːt",
  let: "lɛt",
  keep: "kiːp",
  eye: "aɪ",
  never: "ˈnɛvər",
  last: "læst",
  door: "dɔːr",
  between: "bɪˈtwiːn",
  city: "ˈsɪti",
  tree: "triː",
  cross: "krɔːs",
  since: "sɪns",
  hard: "hɑːrd",
  start: "stɑːrt",
  might: "maɪt",
  story: "ˈstɔːri",
  saw: "sɔː",
  far: "fɑːr",
  sea: "siː",
  draw: "drɔː",
  left: "lɛft",
  late: "leɪt",
  run: "rʌn",
  while: "waɪl",
  press: "prɛs",
  close: "kloʊz",
  night: "naɪt",
  real: "riːl",
  life: "laɪf",
  few: "fjuː",
  stop: "stɒp",
};

// Simple vowel and consonant sounds
const simplePhonemes: Record<string, string> = {
  a: "æ",
  e: "ɛ",
  i: "ɪ",
  o: "ɒ",
  u: "ʌ",
  th: "θ",
  sh: "ʃ",
  ch: "tʃ",
  ph: "f",
};

// Enhanced phoneme patterns for better word-to-IPA conversion
const phonemePatterns: Record<string, string> = {
  // Vowels
  a: "æ",
  e: "ɛ",
  i: "ɪ",
  o: "ɒ",
  u: "ʌ",

  // Common vowel combinations
  ee: "iː",
  ea: "iː",
  oo: "uː",
  ou: "aʊ",
  ow: "aʊ",
  ai: "eɪ",
  ay: "eɪ",
  ie: "aɪ",
  igh: "aɪ",
  oa: "oʊ",
  oe: "oʊ",
  oi: "ɔɪ",
  oy: "ɔɪ",

  // Consonants
  th: "θ",
  sh: "ʃ",
  ch: "tʃ",
  ph: "f",
  wh: "w",
  ng: "ŋ",
  gh: "", // Often silent

  // Common word endings
  ing: "ɪŋ",
  ed: "d",
  es: "z",
  er: "ər",
  or: "ər",
  ar: "ər",
  tion: "ʃən",
  sion: "ʒən",
};

// Import wink-nlp and model
import model from "wink-eng-lite-web-model";
import winkNLP from "wink-nlp";

// Initialize wink-nlp
const nlp = winkNLP(model);

class SoundTube {
  private enabled = false;
  private toggleButton: HTMLElement | null = null;
  private subtitleContainer: HTMLElement | null = null;
  private observer: MutationObserver | null = null;
  private buttonRetryCount = 0;
  private maxButtonRetries = 10;

  constructor() {
    console.log("SoundTube: Initializing...");
    this.createStyles();
    this.tryAddButton();
    this.setupCaptionObserver();

    // Watch for player changes
    this.setupPlayerObserver();
  }

  private createStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .ytp-button.soundtube-button {
        
        margin-right: 1.4rem;
      }

      .ytp-button.soundtube-button:hover {
        opacity: 1;
      }

      .ytp-button.soundtube-button svg {
        width: 100%;
        height: 100%;
        fill: #fff;
        transition: fill 0.2s ease;
      }

      .ytp-button.soundtube-button.active svg {
        fill: #ff0000;
      }

      .soundtube-caption-container {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 120px;
        display: flex;
        justify-content: center;
        z-index: 100;
      }

      .soundtube-caption {
        position: relative;
        background: rgba(8, 8, 8, 0.75);
        color: #ffeb3b;
        font-size: 24px;
        padding: 4px 8px;
        border-radius: 2px;
        text-align: center;
        max-width: 80%;
        margin-bottom: 8px;
        pointer-events: auto;
        user-select: none;
        border: 1px solid transparent;
        cursor: grab;
      }

      .soundtube-caption:hover {
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }

      .soundtube-caption.dragging {
        cursor: grabbing;
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
      }

      /* Adjust YouTube's caption container when our IPA is active */
      .ytp-caption-window-container {
        transition: bottom 0.2s ease;
      }

      /* When our captions are active, adjust YouTube's caption position */
      .ytp-caption-window-container.soundtube-active {
        bottom: 80px !important;
      }
    `;
    document.head.appendChild(style);
  }

  private setupPlayerObserver() {
    const observer = new MutationObserver(() => {
      if (!this.toggleButton || !document.contains(this.toggleButton)) {
        console.log("SoundTube: Button not found, attempting to add...");
        this.tryAddButton();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  private tryAddButton() {
    console.log("SoundTube: Attempting to add button...");
    const rightControls = document.querySelector(".ytp-right-controls");

    if (rightControls && !document.querySelector(".soundtube-button")) {
      console.log("SoundTube: Found right controls, adding button...");
      this.addButton(rightControls);
      this.buttonRetryCount = 0;
    } else {
      this.buttonRetryCount++;
      if (this.buttonRetryCount < this.maxButtonRetries) {
        console.log(
          `SoundTube: Button add attempt ${this.buttonRetryCount}/${this.maxButtonRetries}`
        );
        setTimeout(() => this.tryAddButton(), 1000);
      }
    }
  }

  private addButton(rightControls: Element) {
    // Create button
    this.toggleButton = document.createElement("button");
    this.toggleButton.className = "ytp-button soundtube-button";
    this.toggleButton.title = "Toggle IPA Subtitles";
    this.toggleButton.setAttribute("aria-keyshortcuts", "i");
    this.toggleButton.setAttribute("aria-label", "Toggle IPA Subtitles");
    this.toggleButton.setAttribute("data-title-no-tooltip", "true");
    this.toggleButton.setAttribute("data-priority", "15");
    this.toggleButton.setAttribute("aria-haspopup", "true");
    this.toggleButton.innerHTML = `
      <svg viewBox="0 0 18 9.21" class="soundtube-button-icon">
        <path d="M0,9.21L2.2,0h1.28L1.26,9.21H0Z"/>
        <path d="M12.19,7l1.67.3c-.23.64-.58,1.11-1.05,1.43-.47.32-1.07.48-1.8.48-.45,0-.87-.07-1.26-.22s-.73-.37-1.04-.66c-.29.25-.66.46-1.11.63s-.92.26-1.41.26c-.69,0-1.22-.18-1.61-.54-.38-.36-.58-.81-.58-1.36,0-.33.07-.62.2-.87.14-.26.3-.45.49-.6.19-.14.46-.27.8-.37.16-.05.64-.16,1.45-.33.4-.08.74-.17,1.03-.27v-.17c0-.31-.09-.54-.26-.7-.17-.15-.44-.23-.81-.23-.32,0-.58.07-.77.2-.19.13-.33.34-.41.61l-1.55-.3c.2-.62.52-1.08.96-1.38.44-.29,1.1-.44,1.99-.44.42,0,.8.05,1.13.15.33.1.61.25.85.45.25-.2.52-.35.81-.45.29-.1.61-.15.94-.15.65,0,1.2.14,1.64.41.45.27.8.68,1.06,1.21.26.53.38,1.28.38,2.26h-4.29c.07.55.22.95.46,1.2.24.25.53.37.88.37.29,0,.53-.07.73-.22.2-.15.36-.38.46-.68ZM7.97,5.97c-.94.25-1.44.38-1.52.41-.27.09-.46.2-.57.32-.11.13-.16.27-.16.44,0,.23.09.44.26.6s.41.25.69.25c.3,0,.58-.1.84-.29.19-.14.32-.32.37-.53s.08-.62.08-1.21ZM12.26,5.27c-.02-.36-.07-.61-.15-.77-.1-.23-.25-.4-.46-.53-.2-.13-.44-.19-.72-.19-.24,0-.45.06-.63.17-.18.11-.32.28-.43.5-.14.3-.21.57-.19.83h2.57Z"/>
        <path d="M14.51,9.21L16.72,0h1.28l-2.23,9.21h-1.26Z"/>
      </svg>
    `;
    this.toggleButton.onclick = () => this.toggleEnabled();

    // Insert after the first button (usually the captions button)
    const firstButton = rightControls.firstElementChild;
    if (firstButton) {
      firstButton.after(this.toggleButton);
    } else {
      rightControls.prepend(this.toggleButton);
    }

    console.log("SoundTube: Button added successfully");
  }

  private setupCaptionObserver() {
    // Watch for YouTube's caption container
    const observer = new MutationObserver(() => {
      const captionContainer = document.querySelector(
        ".ytp-caption-window-container"
      );
      if (
        captionContainer &&
        !document.querySelector(".soundtube-caption-container")
      ) {
        this.createSubtitleContainer();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Watch for caption text changes
    this.observer = new MutationObserver((mutations) => {
      if (!this.enabled) return;

      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          const segments = document.querySelectorAll(".ytp-caption-segment");
          if (segments.length > 0) {
            const text = Array.from(segments)
              .map((s) => s.textContent)
              .join(" ");
            this.updateCaption(text || "");
          }
        }
      }
    });
  }

  private createSubtitleContainer() {
    const player = document.querySelector(".html5-video-player");
    if (!player) return;

    this.subtitleContainer = document.createElement("div");
    this.subtitleContainer.className = "soundtube-caption-container";
    this.subtitleContainer.innerHTML = '<div class="soundtube-caption"></div>';
    this.subtitleContainer.style.display = "none";

    player.appendChild(this.subtitleContainer);

    // Setup draggable functionality
    this.setupDraggable(this.subtitleContainer);

    // Start observing YouTube's caption container
    const ytCaptionContainer = document.querySelector(
      ".ytp-caption-window-container"
    );
    if (ytCaptionContainer && this.observer) {
      this.observer.observe(ytCaptionContainer, {
        childList: true,
        subtree: true,
      });
    }
  }

  private setupDraggable(container: HTMLElement) {
    let isDragging = false;
    let clickOffsetY = 0;

    const caption = container.querySelector(
      ".soundtube-caption"
    ) as HTMLElement;
    if (!caption) return;

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      // Get the correct client position
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      // Get the player element for positioning
      const player = container.closest(".html5-video-player") as HTMLElement;
      if (!player) return;

      // Calculate the offset between click position and container bottom
      const playerRect = player.getBoundingClientRect();
      const captionRect = caption.getBoundingClientRect();
      const playerBottom = playerRect.bottom;
      const clickPositionFromBottom = playerBottom - clientY;
      const captionBottomFromPlayerBottom = playerBottom - captionRect.bottom;

      // This is the offset we'll maintain during dragging
      clickOffsetY = clickPositionFromBottom - captionBottomFromPlayerBottom;

      isDragging = true;
      caption.classList.add("dragging");

      // Add temporary event listeners
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onMouseMove as EventListener, {
        passive: false,
      });
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchend", onMouseUp as EventListener);
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      e.preventDefault();

      // Get the correct client position
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      // Get the player element for positioning
      const player = container.closest(".html5-video-player") as HTMLElement;
      if (!player) return;

      // Calculate new position based on cursor position and original offset
      const playerRect = player.getBoundingClientRect();
      const playerBottom = playerRect.bottom;
      const newBottomPosition = playerBottom - clientY - clickOffsetY;

      // Apply constraints
      const minBottom = 60; // Minimum distance from bottom
      const maxBottom = player.clientHeight - 60; // Maximum distance from bottom

      // Apply the position directly
      const constrainedBottom = Math.min(
        Math.max(newBottomPosition, minBottom),
        maxBottom
      );
      container.style.bottom = `${constrainedBottom}px`;

      // Log for debugging
      console.debug("SoundTube: Dragging", {
        clientY,
        playerBottom,
        clickOffsetY,
        newBottomPosition,
        constrainedBottom,
      });
    };

    const onMouseUp = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      isDragging = false;
      caption.classList.remove("dragging");

      // Remove temporary event listeners
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onMouseMove as EventListener);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchend", onMouseUp as EventListener);
    };

    // Add the initial event listeners
    caption.addEventListener("mousedown", onMouseDown);
    caption.addEventListener("touchstart", onMouseDown as EventListener, {
      passive: false,
    });
  }

  private toggleEnabled() {
    this.enabled = !this.enabled;

    if (this.toggleButton) {
      this.toggleButton.classList.toggle("active", this.enabled);
    }

    if (this.subtitleContainer) {
      this.subtitleContainer.style.display = this.enabled ? "flex" : "none";
    }

    // Add or remove class to body for YouTube caption positioning
    const player = document.querySelector(".html5-video-player");
    if (player) {
      player.classList.toggle("soundtube-enabled", this.enabled);
    }

    // Toggle YouTube's CC if needed
    const ccButton = document.querySelector(
      ".ytp-subtitles-button"
    ) as HTMLElement;
    if (ccButton) {
      const isCC = ccButton.getAttribute("aria-pressed") === "true";
      if (this.enabled && !isCC) {
        ccButton.click();
      }
    }
  }

  private updateCaption(text: string) {
    if (!this.subtitleContainer) return;

    const caption = this.subtitleContainer.querySelector(".soundtube-caption");
    if (!caption) return;

    const ipaText = this.textToIPA(text);
    caption.textContent = ipaText;
  }

  private textToIPA(text: string): string {
    // Process text with wink-nlp
    const doc = nlp.readDoc(text);

    // Split into words and convert each
    return doc
      .tokens()
      .out()
      .map((token) => {
        // Skip punctuation and special characters
        if (!token.match(/[a-zA-Z]/)) {
          return token;
        }

        // Check common words dictionary first
        const lowerWord = token.toLowerCase();
        if (commonWords[lowerWord]) {
          return commonWords[lowerWord];
        }

        // Use phoneme patterns for unknown words
        let ipa = lowerWord;
        const patterns = Object.keys(phonemePatterns).sort(
          (a, b) => b.length - a.length
        );

        for (const pattern of patterns) {
          const regex = new RegExp(pattern, "g");
          ipa = ipa.replace(regex, phonemePatterns[pattern]);
        }

        // Handle special cases
        ipa = this.handleSpecialCases(ipa);

        return ipa;
      })
      .join(" ");
  }

  private handleSpecialCases(ipa: string): string {
    // Handle silent e at the end of words
    ipa = ipa.replace(/e$/, "");

    // Handle doubled consonants
    ipa = ipa.replace(/([bcdfghjklmnpqrstvwxz])\1/g, "$1");

    // Add stress mark to words longer than one syllable
    const vowelMatches = ipa.match(/[æɛɪɒʌiːuːaʊeɪaɪoʊɔɪ]/g);
    if (vowelMatches && vowelMatches.length > 1) {
      ipa = "ˈ" + ipa;
    }

    return ipa;
  }
}

// Initialize
new SoundTube();
