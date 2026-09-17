// Create audio objects once

const keyStrokeSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

function useKeyboardSound() {
  // Function to play a random sound
  const playRandomKeyStrokeSound = () => {
    // Pick random audio from array
    const randomSound =
      keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

    // Restart audio from beginning
    // Prevents delays when typing fast
    randomSound.currentTime = 0;

    // Play audio
    randomSound
      .play()
      .catch((error) => console.log("Audio play failed:", error));
  };

  // Expose function to components
  return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;
