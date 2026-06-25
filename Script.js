// Grab the hamburger button and the navigation menu by their IDs
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// When the hamburger is clicked, toggle the "active" class on both.
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

//  close the menu automatically after a link is tapped
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});


// ===== AI CHAT WIDGET LOGIC =====
// This is a "smart FAQ" assistant: it doesn't call any real AI API.
// Instead, it looks for keywords in what the user types and replies
// with a matching answer from the knowledgeBase list below.
// You can add more entries any time to teach it new answers.

const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Open and close the chat window
chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
});

chatClose.addEventListener('click', () => {
  chatWindow.classList.remove('open');
});

// The "knowledge base": each entry lists keywords to watch for,
// and the reply to send if the user's message contains one of them.
const knowledgeBase = [
  { keywords: ['hello', 'hi', 'hey'], reply: "Hello! How can I help you today? You can ask about our services, prices, hours, or location." },
  { keywords: ['service', 'offer', 'print'], reply: "We offer document printing, photocopying, business cards, and binding & lamination." },
  { keywords: ['price', 'cost', 'how much'], reply: "Document printing starts from $0.20/page, photocopying from $0.10/page, business cards are $15 per 100, and binding starts from $2.00." },
  { keywords: ['hour', 'open', 'time'], reply: "We're open Monday to Saturday, 8am to 7pm." },
  { keywords: ['location', 'address', 'where'], reply: "We're located at Ma Kebeh Gas Station, Redlight, Paynesville City, Monrovia, Liberia." },
  { keywords: ['contact', 'phone', 'number', 'call'], reply: "You can reach us at (+231) 770 256 314 or email zarwumoluway95@gmail.com." },
  { keywords: ['ceo', 'owner', 'founder', 'zarwu'], reply: "Zarwu Moluway is our founder and CEO. He's also a student at the University of Liberia." },
  { keywords: ['thank'], reply: "You're very welcome! Let me know if there's anything else." },
  { keywords: ['bye', 'goodbye'], reply: "Goodbye! Have a great day." },
];

// Looks through the knowledge base for a matching keyword.
// If nothing matches, it falls back to a default reply.
function getBotReply(message) {
  const text = message.toLowerCase();

  for (const entry of knowledgeBase) {
    if (entry.keywords.some((keyword) => text.includes(keyword))) {
      return entry.reply;
    }
  }

  return "I'm not sure about that yet, but you can call us at (+231) 770 256 314 for more details.";
}

// Adds a message bubble to the chat window and scrolls down to show it
function addMessage(text, senderClass) {
  const msg = document.createElement('div');
  msg.classList.add('chat-msg', ...senderClass.split(' '));
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

// Runs when the user sends a message
function handleSend() {
  const text = chatInput.value.trim();
  if (text === '') return;

  addMessage(text, 'user');
  chatInput.value = '';

  // Show a brief "Typing..." bubble before the reply, so it feels
  // more like a real assistant thinking, rather than an instant lookup.
  const typingMsg = addMessage('Typing...', 'bot typing');

  setTimeout(() => {
    typingMsg.remove();
    addMessage(getBotReply(text), 'bot');
  }, 700);
}

chatSend.addEventListener('click', handleSend);

chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSend();
  }
});