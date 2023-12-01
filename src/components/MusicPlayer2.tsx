import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';


interface Track {
  url: string;
  title: string;
}

interface MusicPlayerProps {
  playlist: Track[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlist }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume; 
      setVolume(newVolume); 
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', () => {
        setCurrentTime(audioElement.currentTime);
        if (audioElement.duration && !isNaN(audioElement.duration)) {
          setDuration(audioElement.duration);
        }
      });
    }
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('durationchange', () => {
        if (!isNaN(audioElement.duration)) {
          setDuration(audioElement.duration);
        }
      });
    }
  }, []);

  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    const newIndex = currentTrackIndex + 1;
    if (newIndex < playlist.length) {
      setCurrentTrackIndex(newIndex);
    }
  };
  
  const playPrevious = () => {
    const newIndex = currentTrackIndex - 1;
    if (newIndex >= 0) {
      setCurrentTrackIndex(newIndex);
    }
  };
  
  const onEnded = () => {
    const newIndex = currentTrackIndex + 1;
    if (newIndex < playlist.length) {
      setCurrentTrackIndex(newIndex);
    }
  };
  
  useEffect(() => {
    const audioElement = audioRef.current;
  
    const handleAudioPlay = () => {
      setIsPlaying(true);
    };
  
    const handleAudioPause = () => {
      setIsPlaying(false);
    };
  
    if (audioElement) {
      audioElement.addEventListener('play', handleAudioPlay);
      audioElement.addEventListener('pause', handleAudioPause);
    }
  
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('play', handleAudioPlay);
        audioElement.removeEventListener('pause', handleAudioPause);
      }
    };
  }, [currentTrackIndex]); 
  
  useEffect(() => {
    const audioElement = audioRef.current;
  
    if (audioElement) {
      audioElement.src = playlist[currentTrackIndex]?.url; 
      audioElement.load(); 
      audioElement.play(); 
    }
  }, [currentTrackIndex]); 
  

  // Too many issues with the time formatting, scrapped
  

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]?.url}
        onEnded={onEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className='player-container'>
        <h5>{playlist[currentTrackIndex]?.title}</h5>
        <div className='seek-handle'>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            
          />
        </div>
        <p className='volume-text'>Seek</p>
        <div className='volume-control'>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className='volume-slider'
          />
          <p className='volume-text'>Volume</p>
        </div>
        <Button className='audio-button' onClick={playPrevious} disabled={currentTrackIndex === 0}>
          Previous
        </Button>
        <Button className='audio-button' onClick={playPause}>{isPlaying ? 'Pause' : 'Play'}</Button>
        <Button className='audio-button' onClick={playNext} disabled={currentTrackIndex === playlist.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default MusicPlayer;
