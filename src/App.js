import React, { useState, useEffect } from 'react';
import './App.css';

const bankOne = [
  { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: "Kick-n'-Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

const bankTwo = [
  { key: 'Q', id: 'Chord-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
  { key: 'W', id: 'Chord-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
  { key: 'E', id: 'Chord-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
  { key: 'A', id: 'Shaker', url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
  { key: 'S', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
  { key: 'D', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
  { key: 'Z', id: 'Punchy-Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
  { key: 'X', id: 'Side-Stick', url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
  { key: 'C', id: 'Snare', url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }
];

const App = () => {
  const [display, setDisplay] = useState('');
  const [volume, setVolume] = useState(0.5);
  const [power, setPower] = useState(true);
  const [currentBank, setCurrentBank] = useState(bankOne);
  const [bankName, setBankName] = useState('Heater Kit');

  const handleKeyPress = (event) => {
    const pad = currentBank.find(p => p.key === event.key.toUpperCase());
    if (pad && power) {
      playSound(pad.key, pad.id);
    }
  };

  const playSound = (key, id) => {
    const audio = document.getElementById(key);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    setDisplay(id);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    setDisplay(`Volume: ${Math.round(event.target.value * 100)}`);
    setTimeout(() => setDisplay(''), 1000);
  };

  const togglePower = () => {
    setPower(prevPower => !prevPower);
    setDisplay(power ? 'Power Off' : 'Power On');
  };

  const switchBank = () => {
    if (currentBank === bankOne) {
      setCurrentBank(bankTwo);
      setBankName('Smooth Piano Kit');
      setDisplay('Smooth Piano Kit');
    } else {
      setCurrentBank(bankOne);
      setBankName('Heater Kit');
      setDisplay('Heater Kit');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentBank, power]);

  return (
    <div id="drum-machine" className='d-flex'>

      <div className="drum-pads">
        {currentBank.map(pad => (
          <div
            key={pad.id}
            id={pad.id}
            className="drum-pad"
            onClick={() => power && playSound(pad.key, pad.id)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.url}></audio>
          </div>
        ))}
      </div>
      <div >
      
      <div className="controls">
        <div className='flex-column'>
        <span>Power</span>
        <label className="toggle-switch">
          <input type="checkbox" checked={power} onChange={togglePower} />
          <span className="slider"></span>
        </label>
        </div>
        <div id="display">{display}</div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <div className='flex-column'>
        <span>Bank</span>
        <label className="toggle-switch">
          <input type="checkbox" onChange={switchBank} />
          <span className="slider"></span>
        </label>
        </div>
        {/* <span className="bank-name">{bankName}</span> */}
      </div>
      </div>
    </div>
  );
};

export default App;
