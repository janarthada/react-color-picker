import React, { useState } from 'react';

// Counter Component
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="example-container">
      <h2>Counter Example</h2>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Helper function to check for EyeDropper support
function isEyeDropperSupported() {
  return typeof window !== 'undefined' && 'EyeDropper' in window;
}

// Helper function to detect browser
function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if (userAgent.includes('Chrome')) {
    return 'Chrome';
  } else if (userAgent.includes('Edge')) {
    return 'Edge';
  } else if (userAgent.includes('Safari')) {
    return 'Safari';
  }
  return 'Unknown';
}

// Helper function to use EyeDropper
async function pickColorFromScreen() {
  if (!isEyeDropperSupported()) {
    const browser = getBrowserInfo();
    throw new Error(`Color picker is not supported in ${browser}. Please use the color input or enter a hex code instead.`);
  }
  
  // Create and add overlay
  const overlay = document.createElement('div');
  overlay.className = 'eyedropper-overlay';
  document.body.appendChild(overlay);
  
  // Add class to prevent pointer events
  document.body.classList.add('eyedropper-active');
  
  try {
    // @ts-ignore
    const eyeDropper = new window.EyeDropper();
    const result = await eyeDropper.open();
    return result;
  } finally {
    // Clean up
    document.body.classList.remove('eyedropper-active');
    overlay.remove();
  }
}

// Color Picker Component
function ColorPicker() {
  const [color, setColor] = useState('#000000');
  const [showBrowserMessage, setShowBrowserMessage] = useState(false);
  const rgb = hexToRgb(color);
  const browser = getBrowserInfo();

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setShowBrowserMessage(false);
  };

  const handleDropperClick = async () => {
    try {
      const result = await pickColorFromScreen();
      setColor(result.sRGBHex);
      setShowBrowserMessage(false);
    } catch (e) {
      setShowBrowserMessage(true);
    }
  };

  return (
    <div className="example-container">
      <h2>Color Picker Example</h2>
      <div style={{ backgroundColor: color, padding: '20px', borderRadius: '8px' }}>
        <div className="color-controls">
          <input 
            type="color" 
            value={color} 
            onChange={handleColorChange}
          />
          <button 
            className={`dropper-button ${!isEyeDropperSupported() ? 'unsupported' : ''}`}
            onClick={handleDropperClick}
            title={isEyeDropperSupported() ? "Pick color from screen" : "Color picker not supported in Firefox"}
          >
            💉
          </button>
        </div>
        {showBrowserMessage && !isEyeDropperSupported() && (
          <div className="browser-message">
            <p>💡 Color picker not available in {browser}</p>
            <p>You can:</p>
            <ul>
              <li>Use the color input above to pick colors</li>
              <li>View the RGB values below to verify your color</li>
            </ul>
          </div>
        )}
        <p style={{ color: '#ffffff' }}>Selected color: {color}</p>
        <p style={{ color: '#ffffff' }}>
          RGB: {rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'Invalid color'}
        </p>
      </div>
    </div>
  );
}

// Reverse Color Picker Component
function ReverseColorPicker() {
  const [colorInput, setColorInput] = useState('#000000');
  const [error, setError] = useState('');
  const [showBrowserMessage, setShowBrowserMessage] = useState(false);
  const rgb = hexToRgb(colorInput);
  const browser = getBrowserInfo();

  const handleColorInput = (e) => {
    const value = e.target.value;
    setColorInput(value);
    setShowBrowserMessage(false);
    
    // Validate hex color format
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setError('');
    } else {
      setError('Please enter a valid hex color (e.g., #FF0000)');
    }
  };

  const handleDropperClick = async () => {
    try {
      const result = await pickColorFromScreen();
      setColorInput(result.sRGBHex);
      setError('');
      setShowBrowserMessage(false);
    } catch (e) {
      setShowBrowserMessage(true);
    }
  };

  return (
    <div className="example-container">
      <h2>Reverse Color Picker</h2>
      <div style={{ 
        backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(colorInput) ? colorInput : '#000000',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <div className="color-controls">
          <input
            type="text"
            value={colorInput}
            onChange={handleColorInput}
            placeholder="#000000"
            className="color-input"
          />
          <button 
            className={`dropper-button ${!isEyeDropperSupported() ? 'unsupported' : ''}`}
            onClick={handleDropperClick}
            title={isEyeDropperSupported() ? "Pick color from screen" : "Color picker not supported in Firefox"}
          >
            💉
          </button>
        </div>
        {error && <p style={{ color: '#ff4444' }}>{error}</p>}
        {showBrowserMessage && !isEyeDropperSupported() && (
          <div className="browser-message">
            <p>💡 Color picker not available in {browser}</p>
            <p>You can:</p>
            <ul>
              <li>Enter a hex code manually (e.g., #FF0000 for red)</li>
              <li>View the RGB values below to verify your color</li>
            </ul>
          </div>
        )}
        <p style={{ color: '#ffffff' }}>Entered color: {colorInput}</p>
        <p style={{ color: '#ffffff' }}>
          RGB: {rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'Invalid color'}
        </p>
      </div>
    </div>
  );
}

// Main Examples Component
function Examples() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Examples</h1>
      <Counter />
      <ColorPicker />
      <ReverseColorPicker />
    </div>
  );
}

export default Examples; 