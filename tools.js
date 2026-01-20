// ========== SEO ENHANCED TOOLS DATABASE ==========
// Each tool has SEO-optimized name and description
const TOOLS = [
    {
        id: 'word-counter',
        name: 'Word Counter Online - Free Word & Character Count Tool',
        icon: 'fas fa-font',
        version: 'v1',
        description: 'Free online word counter tool to count words and characters instantly. No registration needed. Perfect for writers, students, and professionals.',
        color: '#3b82f6',
        keywords: ['word counter', 'character count', 'text length', 'word count tool']
    },
    {
        id: 'character-counter',
        name: 'Character Counter - Count Characters Online Free',
        icon: 'fas fa-text-width',
        version: 'v1',
        description: 'Free character counter tool to count characters with and without spaces. Check text length for social media, essays, and documents.',
        color: '#8b5cf6',
        keywords: ['character counter', 'text length', 'character count', 'string length']
    },
    {
        id: 'text-cleaner',
        name: 'Text Cleaner Tool - Remove Extra Spaces Online',
        icon: 'fas fa-broom',
        version: 'v1',
        description: 'Free text cleaner tool to remove extra spaces, clean messy text, and format paragraphs. No login required.',
        color: '#10b981',
        keywords: ['text cleaner', 'remove spaces', 'clean text', 'format text']
    },
    {
        id: 'date-difference',
        name: 'Date Difference Calculator - Calculate Days Between Dates',
        icon: 'fas fa-calendar-alt',
        version: 'v1',
        description: 'Free date calculator to calculate days between two dates. Perfect for project planning, event counting, and date calculations.',
        color: '#f59e0b',
        keywords: ['date calculator', 'days between dates', 'date difference', 'day counter']
    },
    {
        id: 'case-converter',
        name: 'Case Converter - UPPERCASE lowercase Online Tool',
        icon: 'fas fa-exchange-alt',
        version: 'v1',
        description: 'Free case converter tool to change text to uppercase or lowercase. Convert text case instantly with one click.',
        color: '#ef4444',
        keywords: ['case converter', 'uppercase', 'lowercase', 'text case']
    },
    {
        id: 'bullet-paragraph',
        name: 'Bullet to Paragraph Converter - Free Online Tool',
        icon: 'fas fa-list-ul',
        version: 'v1',
        description: 'Free bullet to paragraph converter tool. Transform bullet points into a proper paragraph instantly.',
        color: '#06b6d4',
        keywords: ['bullet to paragraph', 'convert bullets', 'list to paragraph', 'text converter']
    }
];

// ========== PAGE TITLE MANAGEMENT ==========
// Dynamic page titles for SEO
const PAGE_TITLES = {
    home: 'MicroToolsHub - Free Online Tools Collection',
    v1: 'Toolsv1 - Free Online Tools | MicroToolsHub',
    v2: 'Toolsv2 - Coming Soon | MicroToolsHub',
    v3: 'Toolsv3 - Future Tools | MicroToolsHub',
    all: 'All Tools - Free Online Utilities | MicroToolsHub'
};

function updatePageTitle(filter) {
    const title = PAGE_TITLES[filter] || PAGE_TITLES.home;
    document.title = title;

    // Update meta description dynamically
    updateMetaDescription(filter);
}

function updateMetaDescription(filter) {
    const descriptions = {
        home: 'MicroToolsHub offers 100% free online tools: Word Counter, Character Counter, Text Cleaner, Date Calculator, Case Converter. No login required.',
        v1: 'Use our free Toolsv1 tools: Word Counter, Character Counter, Text Cleaner, Date Calculator, Case Converter, Bullet to Paragraph. All completely free.',
        v2: 'Toolsv2 coming soon with more advanced tools. Get notified when new tools launch.',
        v3: 'Toolsv3 planned with AI-powered tools and advanced features. Join waitlist for updates.',
        all: 'Browse all free online tools at MicroToolsHub. Word counter, character counter, text cleaner, date calculator and more.'
    };

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = descriptions[filter] || descriptions.home;
    }
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function () {
    renderTools();
    setupEventListeners();
    applyFilter('v1');

    // Initialize page analytics (simulated)
    trackPageView('home');
});

// ========== RENDER TOOLS ==========
function renderTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid) return;

    toolsGrid.innerHTML = '';

    TOOLS.forEach(tool => {
        const toolCard = createToolCard(tool);
        toolsGrid.appendChild(toolCard);
    });
}

function createToolCard(tool) {
    const card = document.createElement('article'); // Semantic HTML5 element
    card.className = 'tool-card';
    card.setAttribute('data-tool-id', tool.id);
    card.setAttribute('aria-labelledby', `tool-title-${tool.id}`);

    // Determine input type
    const isDateTool = tool.id.includes('date');
    const isCaseTool = tool.id === 'case-converter';

    let inputHTML = '';
    if (isDateTool) {
        const today = new Date().toISOString().split('T')[0];
        inputHTML = `
            <div class="date-inputs" aria-label="Date inputs for ${tool.name}">
                <div>
                    <label for="start-date-${tool.id}" class="visually-hidden">Start Date</label>
                    <input type="date" id="start-date-${tool.id}" class="tool-input" value="${today}" aria-label="Start date">
                </div>
                <div>
                    <label for="end-date-${tool.id}" class="visually-hidden">End Date</label>
                    <input type="date" id="end-date-${tool.id}" class="tool-input" value="${today}" aria-label="End date">
                </div>
            </div>
        `;
    } else {
        inputHTML = `
            <label for="text-input-${tool.id}" class="visually-hidden">Input text for ${tool.name}</label>
            <textarea id="text-input-${tool.id}" class="tool-input" 
                      placeholder="Enter your text here..." 
                      aria-label="Text input for ${tool.name}"></textarea>
        `;
    }

    // Action buttons
    let actionButtons = '';
    if (isCaseTool) {
        actionButtons = `
            <div class="tool-actions">
                <button class="primary-btn" onclick="executeTool('${tool.id}', 'upper')" 
                        style="background:${tool.color}"
                        aria-label="Convert to uppercase">
                    UPPERCASE
                </button>
                <button class="secondary-btn" onclick="executeTool('${tool.id}', 'lower')"
                        aria-label="Convert to lowercase">
                    lowercase
                </button>
            </div>
        `;
    } else {
        actionButtons = `
            <div class="tool-actions">
                <button class="primary-btn" onclick="executeTool('${tool.id}')" 
                        style="background:${tool.color};width:100%"
                        aria-label="Use ${tool.name}">
                    Use This Tool
                </button>
            </div>
        `;
    }

    card.innerHTML = `
        <div class="tool-header">
            <div class="tool-icon" style="background:${tool.color}" aria-hidden="true">
                <i class="${tool.icon}"></i>
            </div>
            <h4 id="tool-title-${tool.id}">${tool.name}</h4>
        </div>
        
        <p class="tool-desc">${tool.description}</p>
        
        ${inputHTML}
        ${actionButtons}
        
        <div class="tool-keywords" style="margin-top:15px;font-size:0.8rem;color:#64748b;">
            <strong>Keywords:</strong> ${tool.keywords.join(', ')}
        </div>
    `;

    return card;
}

// ========== TOOL EXECUTION ==========
function executeTool(toolId, mode = null) {
    const tool = TOOLS.find(t => t.id === toolId);
    if (!tool) return;

    // Track tool usage for analytics
    trackToolUsage(toolId);

    const card = document.querySelector(`[data-tool-id="${toolId}"]`);
    let result = '';

    if (toolId === 'word-counter') {
        const textarea = card.querySelector('textarea');
        const text = textarea.value;
        const words = text.trim().split(/\s+/).filter(w => w).length;
        result = `📊 Word Count Result:\n\n• Words: ${words}\n• Characters (with spaces): ${text.length}\n• Characters (without spaces): ${text.replace(/\s/g, '').length}`;

    } else if (toolId === 'character-counter') {
        const textarea = card.querySelector('textarea');
        const text = textarea.value;
        const withoutSpaces = text.replace(/\s/g, '').length;
        result = `🔤 Character Count Result:\n\n• Total Characters: ${text.length}\n• Without Spaces: ${withoutSpaces}\n• Space Count: ${text.length - withoutSpaces}`;

    } else if (toolId === 'text-cleaner') {
        const textarea = card.querySelector('textarea');
        const text = textarea.value;
        const cleaned = text.replace(/\s+/g, ' ').trim();
        const spaceReduction = text.length - cleaned.length;
        result = `✨ Cleaned Text:\n\n${cleaned}\n\n📈 Reduced ${spaceReduction} extra characters`;

    } else if (toolId === 'date-difference') {
        const inputs = card.querySelectorAll('input[type="date"]');
        const start = new Date(inputs[0].value);
        const end = new Date(inputs[1].value);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        result = `📅 Date Difference:\n\n• From: ${formatDate(start)}\n• To: ${formatDate(end)}\n• Difference: ${diff} day${diff !== 1 ? 's' : ''}`;

    } else if (toolId === 'case-converter') {
        const textarea = card.querySelector('textarea');
        const text = textarea.value;
        result = mode === 'upper' ? text.toUpperCase() : text.toLowerCase();

    } else if (toolId === 'bullet-paragraph') {
        const textarea = card.querySelector('textarea');
        const text = textarea.value;
        const lines = text.split('\n').filter(l => l.trim());
        result = lines.map(l => l.trim().replace(/^[•\-*]\s*/, '')).join('. ') + '.';
    }

    // Show result
    showToolResult(tool.name, result);
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showToolResult(toolName, result) {
    const modalHTML = `
        <div class="modal-overlay" id="resultModal" style="display:flex;">
            <div class="modal">
                <div class="modal-header">
                    <h3><i class="fas fa-check-circle"></i> ${toolName} Result</h3>
                    <button class="modal-close" onclick="closeResultModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="white-space:pre-line;padding:20px;background:#f8fafc;border-radius:8px;margin-bottom:20px;">
                        ${result}
                    </div>
                    <div class="result-actions">
                        <button class="primary-btn" onclick="copyToClipboard('${result.replace(/'/g, "\\'")}')" style="width:100%;">
                            <i class="fas fa-copy"></i> Copy Result
                        </button>
                        <button class="secondary-btn" onclick="closeResultModal()" style="width:100%;margin-top:10px;">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('resultModal');
    if (existingModal) existingModal.remove();

    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeResultModal() {
    const modal = document.getElementById('resultModal');
    if (modal) modal.remove();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Result copied to clipboard!');
        closeResultModal();
    });
}

// ========== FILTER SYSTEM ==========
function applyFilter(filter) {
    const cards = document.querySelectorAll('.tool-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const toolId = card.getAttribute('data-tool-id');
        const tool = TOOLS.find(t => t.id === toolId);

        if (!tool) return;

        if (filter === 'all' || tool.version === filter) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update active nav
    document.querySelectorAll('.nav-item[data-filter]').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-filter') === filter) {
            item.classList.add('active');
        }
    });

    // Update page title for SEO
    updatePageTitle(filter);

    // Track filter usage
    trackFilterUsage(filter);
}

// ========== SEARCH FUNCTIONALITY ==========
function setupSearch() {
    const searchInput = document.getElementById('searchTools');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.tool-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const toolId = card.getAttribute('data-tool-id');
            const tool = TOOLS.find(t => t.id === toolId);

            if (!tool) return;

            const nameMatch = tool.name.toLowerCase().includes(query);
            const descMatch = tool.description.toLowerCase().includes(query);
            const keywordMatch = tool.keywords.some(kw => kw.toLowerCase().includes(query));

            if (nameMatch || descMatch || keywordMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Track search queries
        if (query.length >= 2) {
            trackSearchQuery(query);
        }
    });
}

// ========== NOTIFY SYSTEM ==========
function showNotifyModal() {
    document.getElementById('notifyModal').style.display = 'flex';
    trackModalOpen('notify');
}

function submitNotification() {
    const name = document.getElementById('notifyName').value.trim();
    const email = document.getElementById('notifyEmail').value.trim();

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    // Get interests
    const checkboxes = document.querySelectorAll('.interest-checkboxes input[type="checkbox"]');
    const interests = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.nextElementSibling.textContent);

    // Save to localStorage
    const notifications = JSON.parse(localStorage.getItem('microtools_notifications') || '[]');
    notifications.push({
        name: name || 'Anonymous',
        email: email,
        interests: interests,
        date: new Date().toISOString(),
        source: 'notify_modal'
    });

    localStorage.setItem('microtools_notifications', JSON.stringify(notifications));

    // Show success
    alert(`Thank you${name ? ' ' + name : ''}! We'll notify you at ${email} when new tools are available.`);
    document.getElementById('notifyModal').style.display = 'none';

    // Track notification signup
    trackNotificationSignup(email, interests);

    // Clear form
    document.getElementById('notifyName').value = '';
    document.getElementById('notifyEmail').value = '';
    checkboxes.forEach(cb => cb.checked = false);
    if (checkboxes[0]) checkboxes[0].checked = true;
}

// ========== ANALYTICS FUNCTIONS ==========
// These simulate analytics tracking
function trackPageView(page) {
    console.log(`📊 Page View: ${page}`);
    // In production: Google Analytics, etc.
}

function trackToolUsage(toolId) {
    const tool = TOOLS.find(t => t.id === toolId);
    console.log(`🛠️ Tool Used: ${tool?.name || toolId}`);

    const usage = JSON.parse(localStorage.getItem('tool_usage') || '{}');
    usage[toolId] = (usage[toolId] || 0) + 1;
    localStorage.setItem('tool_usage', JSON.stringify(usage));
}

function trackFilterUsage(filter) {
    console.log(`🔍 Filter Used: ${filter}`);
}

function trackSearchQuery(query) {
    console.log(`🔎 Search Query: ${query}`);
}

function trackModalOpen(modal) {
    console.log(`📋 Modal Opened: ${modal}`);
}

function trackNotificationSignup(email, interests) {
    console.log(`📧 Notification Signup: ${email}, Interests: ${interests.join(', ')}`);
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Navigation filters
    document.querySelectorAll('.nav-item[data-filter]').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });

    // Search
    setupSearch();

    // Modal close
    document.querySelectorAll('.modal-overlay').forEach(el => {
        el.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.modal-overlay').style.display = 'none';
        });
    });

    // Modal form submit on Enter
    const notifyEmail = document.getElementById('notifyEmail');
    if (notifyEmail) {
        notifyEmail.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                submitNotification();
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchTools');
            if (searchInput) searchInput.focus();
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

// ========== UTILITY FUNCTIONS ==========
// For screen readers
const style = document.createElement('style');
style.textContent = `
    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);