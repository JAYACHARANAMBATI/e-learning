import React, { useState, useEffect, useRef } from 'react';
import '../Accessibility.css';

export default function Accessibility() {
  // General settings
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('tools');

  // Speech-to-Text
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [workspaceHistory, setWorkspaceHistory] = useState([]);
  const [translationLang, setTranslationLang] = useState('en-US');
  const [translatedText, setTranslatedText] = useState('');
  const recognition = useRef(null);

  // Text-to-Speech
  const [synthesisText, setSynthesisText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Languages
  const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = translationLang;

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setTranscript(transcript);
      };

      recognition.current.onerror = (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      };
    }
  }, [translationLang]);

  // Initialize Speech Synthesis
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices.find(v => v.lang === translationLang) || availableVoices[0]);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, [translationLang]);

  // Apply accessibility settings
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.body.classList.toggle('high-contrast', highContrast);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [fontSize, highContrast, darkMode]);

  // Speech handlers
  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop();
      setWorkspaceHistory([...workspaceHistory, transcript]);
    } else {
      setTranscript('');
      recognition.current?.start();
    }
    setIsListening(!isListening);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(synthesisText);
    utterance.voice = selectedVoice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Translation handler (simulated)
  const handleTranslate = async () => {
    // Simulated translation - replace with actual API call
    setTranslatedText(`${translationLang} translation: ${transcript}`);
  };

  return (
    <div className={`accessibility-container ${darkMode ? 'dark' : ''}`}>
      <header className="accessibility-header">
        <h1>Accessibility Center</h1>
        <nav className="accessibility-nav">
          {['tools', 'guide', 'resources', 'workspace'].map((tab) => (
            <button
              key={tab}
              className={`nav-btn ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <main className="accessibility-main">
        {selectedTab === 'tools' && (
          <div className="tools-grid">
            <div className="tool-card">
              <h2>Visual Settings</h2>
              <div className="font-controls">
                <button onClick={() => setFontSize(Math.max(14, fontSize - 2))}>A-</button>
                <span>{fontSize}px</span>
                <button onClick={() => setFontSize(Math.min(24, fontSize + 2))}>A+</button>
              </div>
              
              <h3>Screen Brightness</h3>
              <div className="brightness-control">
                <span>🔅</span>
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  defaultValue="100" 
                  onChange={(e) => {
                    document.documentElement.style.filter = `brightness(${e.target.value}%)`;
                  }}
                />
                <span>🔆</span>
              </div>
              
              <div className="toggle-group">
                <label>
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                  />
                  High Contrast
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                  Dark Mode
                </label>
              </div>
            </div>

            <div className="tool-card">
              <h2>Navigation Help</h2>
              <div className="keyboard-shortcuts">
                <kbd>Tab</kbd> Navigate elements
                <kbd>Enter</kbd> Select
                <kbd>Esc</kbd> Close menus
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'workspace' && (
          <div className="workspace-grid">
            <div className="workspace-section">
              <h2>Speech to Text</h2>
              <div className="recognition-controls">
                <button
                  className={`mic-btn ${isListening ? 'active' : ''}`}
                  onClick={toggleListening}
                  disabled={!recognition.current}
                >
                  🎤 {isListening ? 'Stop' : 'Start'}
                </button>
                <select
                  value={translationLang}
                  onChange={(e) => setTranslationLang(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
                <button onClick={handleTranslate}>Translate</button>
              </div>
              <div className="transcript-box">
                {transcript || 'Start speaking to see transcript...'}
                {translatedText && (
                  <div className="translation-result">
                    <strong>Translation:</strong> {translatedText}
                  </div>
                )}
              </div>
              
              {workspaceHistory.length > 0 && (
                <div className="workspace-history">
                  <h3>History</h3>
                  {workspaceHistory.map((entry, index) => (
                    <div key={index} className="history-entry">
                      <p>{entry}</p>
                      <button onClick={() => setSynthesisText(entry)}>
                        Use for Speech
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="workspace-section">
              <h2>Text to Speech</h2>
              <textarea
                value={synthesisText}
                onChange={(e) => setSynthesisText(e.target.value)}
                placeholder="Enter text to speak..."
              />
              <div className="voice-controls">
                <select
                  value={selectedVoice?.name}
                  onChange={(e) => 
                    setSelectedVoice(voices.find(v => v.name === e.target.value))
                  }
                >
                  {voices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
                <div className="range-controls">
                  <label>
                    Pitch: 
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                    />
                    <span>{pitch}</span>
                  </label>
                  <label>
                    Speed: 
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                    <span>{rate}</span>
                  </label>
                </div>
                <button
                  className={`speak-btn ${isSpeaking ? 'active' : ''}`}
                  onClick={handleSpeak}
                  disabled={!synthesisText}
                >
                  {isSpeaking ? '⏹ Stop' : '▶ Speak'}
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'guide' && (
          <div className="guide-container">
            <h2>User Guide</h2>
            <div className="guide-section">
              <h3>🎯 Getting Started</h3>
              <p>Use the workspace tab for speech/text conversion and translation between multiple languages.</p>
            </div>
            <div className="guide-section">
              <h3>🎙 Voice Commands</h3>
              <p>Click the microphone button to start speaking. Your speech will be transcribed in real-time.</p>
            </div>
          </div>
        )}

        {selectedTab === 'resources' && (
          <div className="resources-container">
            <h2>Accessibility Resources</h2>
            <div className="resource-card">
              <h3>📚 Web Accessibility Guidelines</h3>
              <a href="https://www.w3.org/WAI/" target="_blank" rel="noreferrer">
                W3C Accessibility Standards
              </a>
            </div>
            <div className="resource-card">
              <h3>🔍 Accessibility Checker</h3>
              <a href="https://wave.webaim.org/" target="_blank" rel="noreferrer">
                WAVE Evaluation Tool
              </a>
            </div>
          </div>
        )}
      </main>

      <footer className="accessibility-footer">
        <p>♿ Committed to accessible design</p>
        <p>Need help? Contact our accessibility team</p>
      </footer>
    </div>
  );
}