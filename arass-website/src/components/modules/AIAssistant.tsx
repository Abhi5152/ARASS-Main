'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const responses: Record<string, string> = {
    'service': 'We offer four core services: AI & Machine Learning (deep learning, NLP, computer vision), Web & App Development (React, Next.js, mobile), Data Intelligence (real-time analytics, BI dashboards, ETL), and Automation & SaaS (workflow engines, CI/CD, multi-tenant platforms).',
    'tech': 'Our core stack: Python, TensorFlow, PyTorch, React, Next.js, Node.js, Go, PostgreSQL, Redis, Docker, Kubernetes, AWS, GCP. We choose tools based on project requirements, not trends.',
    'project': 'We have 6 featured projects: Jesper AI (AI software engineering), Pro Sports (modern sports e-commerce), Flow (futuristic orbital digital experience), Novaire (neo fine dining experience), MediScan AI (medical imaging), and Voyage (futuristic luxury digital experience).',
    'price': 'Our pricing is project-based. We start with a free discovery phase to scope your needs, then provide a tailored estimate. Typical engagements range from $15K for MVPs to $200K+ for enterprise platforms.',
    'ai': 'Our AI team builds production-grade models — NLP pipelines, computer vision systems, predictive analytics engines. We have deployed models processing millions of requests daily with 99%+ accuracy.',
    'web': 'We build with React, Next.js, Node.js — from progressive web apps to complex enterprise dashboards with real-time WebSocket updates and sub-second response times.',
    'data': 'Real-time streaming with Kafka, ClickHouse dashboards, data lake architectures — we reduce decision latency from days to minutes with sub-second query performance.',
    'saas': 'Full SaaS lifecycle: ideation, multi-tenant architecture, billing integration, CI/CD pipelines, and scale-to-millions infrastructure. We have helped launch 8K+ user products.',
    'hello': 'Hello! Welcome to ARASS Tech. I can help you learn about our services, tech stack, projects, or pricing. What interests you?',
    'help': 'I can answer questions about: our services (AI, web, data, SaaS), technology stack, featured projects, pricing model, or company info. Just type naturally!',
    'company': 'ARASS Tech is a cutting-edge technology firm founded 8 years ago. We have 50+ engineers across 3 offices (San Francisco, London, Singapore) and have delivered 147+ projects for 62+ global clients.',
    'hire': 'Great question! The best way is to use our contact form — tell us about your project, timeline, and budget. We typically respond within 24 hours with a detailed proposal.',
    'timeline': 'Project timelines vary by complexity: MVPs take 8-12 weeks, full products 3-6 months, enterprise platforms 6-12 months. We always start with a 1-2 week discovery phase.',
    'stack': 'Python, TensorFlow, PyTorch, React, Next.js, Node.js, Go, PostgreSQL, Redis, Docker, Kubernetes, AWS, GCP, Kafka, ClickHouse, FastAPI, GraphQL, Rust, Solidity.',
    'default': 'I can help with: services, tech stack, projects, pricing, hiring, timelines, or company info. What would you like to know?'
};

function getResponse(msg: string) {
    const lower = msg.toLowerCase();
    for (const key in responses) {
        if (key !== 'default' && lower.includes(key)) {
            return responses[key];
        }
    }
    return responses['default'];
}

export default function AIAssistant() {
  const { isAssistantOpen, setAssistantOpen } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Welcome to ARASS Tech. Ask about our services, tech stack, or projects.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const latestTranscriptRef = useRef<string>('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text || !text.trim()) return;
    
    setShowSuggestions(false);
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: getResponse(text) };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice not supported in this browser");
      return;
    }
    
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    latestTranscriptRef.current = '';

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onend = () => {
      setIsListening(false);
      const finalSpeech = latestTranscriptRef.current.trim();
      if (finalSpeech) {
        sendMessage(finalSpeech);
      }
      recognitionRef.current = null;
    };
    
    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = e.resultIndex; i < e.results.length; ++i) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const accumulated = finalTranscript || interimTranscript;
      if (accumulated) {
        latestTranscriptRef.current = accumulated;
        setInput(accumulated);
      }
    };

    if (!isAssistantOpen) {
      setAssistantOpen(true);
    }
    recognition.start();
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        className={`chat-toggle ${isAssistantOpen ? 'hidden' : ''}`}
        onClick={() => setAssistantOpen(true)}
        aria-label="Open AI Assistant"
      >
          <span className="notif-dot"></span>
          <i className="fas fa-robot" id="toggleIcon"></i>
      </button>

      {/* Chat Panel */}
      <div className={`chat-panel ${isAssistantOpen ? 'on' : ''}`} style={{ border: '1px solid rgba(0,198,255,.35)', boxShadow: '0 0 20px rgba(0,198,255,.2), 0 0 50px rgba(0,123,255,.1), 0 8px 32px rgba(0,0,0,.5)' }}>

          {/* Header */}
          <div className="chat-header">
              <div className="flex items-center">
                  <div className="chat-avatar"><i className="fas fa-robot"></i></div>
                  <div className="chat-info">
                      <div className="chat-name">ARASS AI</div>
                      <div className="chat-status"><span className="chat-status-dot"></span>Online</div>
                  </div>
              </div>
              <div className="chat-actions">
                  <button 
                    className={`voice-btn ${isListening ? 'listening' : ''}`} 
                    onClick={toggleVoice} 
                    title="Voice input"
                  >
                    <i className="fas fa-microphone"></i>
                  </button>
                  <button className="chat-close" onClick={() => setAssistantOpen(false)} aria-label="Close">
                    <i className="fas fa-times"></i>
                  </button>
              </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`msg-row ${msg.role === 'user' ? 'user' : ''}`}>
                    {msg.role === 'assistant' ? (
                      <>
                        <div className="msg-avatar-sm"><i className="fas fa-robot"></i></div>
                        <div className="msg-bubble-bot">{msg.content}</div>
                      </>
                    ) : (
                      <div className="msg-bubble-user">{msg.content}</div>
                    )}
                </div>
              ))}
              {isTyping && (
                <div className="msg-row" id="typingRow">
                    <div className="msg-avatar-sm"><i className="fas fa-robot"></i></div>
                    <div className="typing-dots"><span></span><span></span><span></span></div>
                </div>
              )}
              <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {showSuggestions && (
            <div className="suggestions">
                <button className="suggest-chip" onClick={() => sendMessage('What services do you offer?')}>Services</button>
                <button className="suggest-chip" onClick={() => sendMessage('Tell me about your tech stack')}>Tech Stack</button>
                <button className="suggest-chip" onClick={() => sendMessage('Show me your projects')}>Projects</button>
                <button className="suggest-chip" onClick={() => sendMessage('How much does it cost?')}>Pricing</button>
            </div>
          )}

          {/* Input */}
          <form 
            className="chat-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
              <input 
                type="text" 
                className="chat-input" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask ARASS..." 
                autoComplete="off" 
              />
              <button type="submit" className="chat-send" aria-label="Send">
                <i className="fas fa-paper-plane"></i>
              </button>
          </form>
      </div>
    </>
  );
}
