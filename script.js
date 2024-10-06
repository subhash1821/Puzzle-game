// Exoplanet data
const exoplanets = [
    { name: "Kepler-452b", image: "kepler-452b.jpg", temperature: "Earth-like", size: "Larger than Earth", distance: "1,400 light-years" },
    { name: "Proxima b", image: "proxima-b.jpg", temperature: "Cold", size: "Smaller than Earth", distance: "4.2 light-years" },
    { name: "TRAPPIST-1e", image: "trappist-1e.jpg", temperature: "Temperate", size: "Similar to Earth", distance: "39 light-years" },
    { name: "K2-18b", image: "k2-18b.jpg", temperature: "Hot", size: "Larger than Earth", distance: "111 light-years" },
    { name: "55 Cancri e", image: "55-cancri-e.jpg", temperature: "Scorching hot", size: "Smaller than Earth", distance: "41 light-years" },
    { name: "WASP-12b", image: "wasp-12b.jpg", temperature: "Extremely hot", size: "Larger than Jupiter", distance: "1,200 light-years" }
  ];
  
  // Characteristic data
  const characteristics = [
    { type: "temperature", value: "Earth-like" },
    { type: "temperature", value: "Cold" },
    { type: "temperature", value: "Temperate" },
    { type: "temperature", value: "Hot" },
    { type: "temperature", value: "Scorching hot" },
    { type: "temperature", value: "Extremely hot" },
    { type: "size", value: "Larger than Earth" },
    { type: "size", value: "Smaller than Earth" },
    { type: "size", value: "Similar to Earth" },
    { type: "size", value: "Larger than Jupiter" },
    { type: "distance", value: "1,400 light-years" },
    { type: "distance", value: "4.2 light-years" },
    { type: "distance", value: "39 light-years" },
    { type: "distance", value: "111 light-years" },
    { type: "distance", value: "41 light-years" },
    { type: "distance", value: "1,200 light-years" }
  ];
  
  // Game variables
  let score = 0;
  let time = 60; // seconds
  let gameStarted = false;
  let gameInterval;
  
  // Get HTML elements
  const startButton = document.getElementById('start-button');
  const endButton = document.getElementById('end-button');
  const timerElement = document.getElementById('time');
  const scoreElement = document.getElementById('score');
  const exoplanetCardsContainer = document.querySelector('.exoplanet-cards');
  const characteristicCardsContainer = document.querySelector('.characteristic-cards');
  
  // Function to generate exoplanet cards
function generateExoplanetCards() {
    exoplanetCardsContainer.innerHTML = ''; // Clear the container
  
    exoplanets.forEach((exoplanet) => {
      // Create a new div for each exoplanet card
      const card = document.createElement('div');
      card.classList.add('exoplanet-card');
  
      // Create the img element for the exoplanet image
      const planetImage = document.createElement('img');
      planetImage.src = `images/${exoplanet.image}`; // Set the image source
      planetImage.alt = exoplanet.name; // Alt text for accessibility
      planetImage.classList.add('planet-image'); // Class for styling
  
      // Create a div for the exoplanet name
      const nameLabel = document.createElement('div');
      nameLabel.classList.add('exoplanet-name');
      nameLabel.textContent = exoplanet.name; // Set the exoplanet's name as text
  
      // Append the image and the name to the card
      card.appendChild(planetImage);
      card.appendChild(nameLabel);
  
      // Add data attributes to store information for checking the answer
      card.dataset.name = exoplanet.name;
      card.dataset.temperature = exoplanet.temperature;
      card.dataset.size = exoplanet.size;
      card.dataset.distance = exoplanet.distance;
  
      // Add an event listener to handle card clicks
      card.addEventListener('click', () => {
        if (gameStarted) {
          const characteristicCard = characteristicCardsContainer.querySelector('.selected');
          if (characteristicCard) {
            checkAnswer(card, characteristicCard);
          }
        }
      });
  
      // Append the card to the exoplanet cards container
      exoplanetCardsContainer.appendChild(card);
    });
  }
  
  // Function to generate exoplanet cards
function generateExoplanetCards() {
    exoplanetCardsContainer.innerHTML = '';
    exoplanets.forEach((exoplanet, index) => {
      const card = document.createElement('div');
      card.classList.add('exoplanet-card');
      card.style.backgroundImage = `url(${exoplanet.image})`;
  
      // Create a div for the exoplanet name
      const nameLabel = document.createElement('div');
      nameLabel.classList.add('exoplanet-name');
      nameLabel.textContent = exoplanet.name;
  
      // Append the name label to the card
      card.appendChild(nameLabel);
  
      // Set data attributes for game logic
      card.dataset.name = exoplanet.name;
      card.dataset.temperature = exoplanet.temperature;
      card.dataset.size = exoplanet.size;
      card.dataset.distance = exoplanet.distance;
  
      // Click event listener for interaction
      card.addEventListener('click', () => {
        if (gameStarted) {
          const characteristicCard = characteristicCardsContainer.querySelector('.selected');
          if (characteristicCard) {
            checkAnswer(card, characteristicCard);
          }
        }
      });
  
      exoplanetCardsContainer.appendChild(card);
    });
  }
  
  
  // Function to generate characteristic cards
  function generateCharacteristicCards() {
    characteristicCardsContainer.innerHTML = '';
    characteristics.forEach((characteristic) => {
      const card = document.createElement('div');
      card.classList.add('characteristic-card');
      card.textContent = characteristic.value;
      card.dataset.type = characteristic.type;
      card.dataset.value = characteristic.value;
      card.addEventListener('click', () => {
        if (gameStarted) {
          const selectedCard = characteristicCardsContainer.querySelector('.selected');
          if (selectedCard) {
            selectedCard.classList.remove('selected');
          }
          card.classList.add('selected');
        }
      });
      characteristicCardsContainer.appendChild(card);
    });
  }
  
  // Function to start game
  function startGame() {
    gameStarted = true;
    score = 0;
    time = 60;
    generateExoplanetCards();
    generateCharacteristicCards();
    startButton.disabled = true;
    endButton.disabled = false;
    timerElement.textContent = `00:${time.toString().padStart(2, '0')}`;
    scoreElement.textContent = score;
    gameInterval = setInterval(() => {
      if (time > 0) {
        time--;
        timerElement.textContent = `00:${time.toString().padStart(2, '0')}`;
      } else {
        endGame();
      }
    }, 1000);
  }
  
  // Function to end game
  function endGame() {
    gameStarted = false;
    startButton.disabled = false;
    endButton.disabled = true;
    clearInterval(gameInterval);
    alert(`Game over! Your score is ${score}.`);
  }
  
  // Function to check answer
  function checkAnswer(exoplanetCard, characteristicCard) {
    const exoplanet = exoplanets.find((exoplanet) => exoplanet.name === exoplanetCard.dataset.name);
    if (exoplanet && exoplanet[characteristicCard.dataset.type] === characteristicCard.dataset.value) {
      score += 10;
      scoreElement.textContent = score;
      exoplanetCard.classList.add('correct');
    } else {
      exoplanetCard.classList.add('incorrect');
    }
    setTimeout(() => {
      exoplanetCard.classList.remove('correct', 'incorrect');
      characteristicCard.classList.remove('selected');
    }, 1000);
  }
  
  // Add event listeners
  startButton.addEventListener('click', startGame);
  endButton.addEventListener('click', endGame);
  