import Chart from 'chart.js';

// Define the genetic representation
type Chromosome = number[];
type Individual = Chromosome[];
type Population = Individual[];

// GUI elements
const populationSizeInput = document.getElementById('population-size') as HTMLInputElement;
const numberOfChromosomesInput = document.getElementById('number-of-chromosomes') as HTMLInputElement;
const startButton = document.getElementById('start-button') as HTMLButtonElement;

// Generate a random number of genes for a chromosome
function generateRandomNumberOfGenes(): number {
  const minGenes = 40;
  const maxGenes = 2968;
  return Math.floor(Math.random() * (maxGenes - minGenes + 1)) + minGenes;
}

// Generate an initial population
function generateInitialPopulation(populationSize: number, numberOfChromosomes: number): Population {
  const population: Population = [];

  for (let i = 0; i < populationSize; i++) {
    const individual: Individual = [];

    for (let j = 0; j < numberOfChromosomes; j++) {
      const numberOfGenes = generateRandomNumberOfGenes();
      const chromosome: Chromosome = Array.from({ length: numberOfGenes }, () =>
        Math.round(Math.random())
      );

      individual.push(chromosome);
    }

    population.push(individual);
  }

  return population;
}

// Apply mutation to an individual
function mutateIndividual(individual: Individual): Individual {
  const mutationRate = 0.01;
  const mutatedIndividual: Individual = JSON.parse(JSON.stringify(individual));

  for (let i = 0; i < mutatedIndividual.length; i++) {
    for (let j = 0; j < mutatedIndividual[i].length; j++) {
      if (Math.random() < mutationRate) {
        mutatedIndividual[i][j] = 1 - mutatedIndividual[i][j]; // Flip the allele
      }
    }
  }

  return mutatedIndividual;
}

// Perform mating between two parents
function mate(parent1: Individual, parent2: Individual): Individual {
  const offspring: Individual = [];

  for (let i = 0; i < parent1.length; i++) {
    const chromosomeLength = parent1[i].length;
    const crossoverPoint = Math.floor(Math.random() * chromosomeLength);

    const offspringChromosome: Chromosome = [
      ...parent1[i].slice(0, crossoverPoint),
      ...parent2[i].slice(crossoverPoint),
    ];

    offspring.push(offspringChromosome);
  }

  return offspring;
}

// Calculate the fitness of an individual
function calculateFitness(individual: Individual): number {
  // Add your fitness evaluation logic here
  // Return a fitness score based on the genetic makeup of the individual
  // The higher the score, the fitter the individual
  return Math.random(); // Placeholder fitness function (random score)
}

// Perform natural selection
function naturalSelection(population: Population): Population {
  const sortedPopulation = population.sort(
    (a, b) => calculateFitness(b) - calculateFitness(a)
  );

  const populationSize = population.length;
  const fittestIndividuals = sortedPopulation.slice(0, populationSize);

  return fittestIndividuals;
}

// Run the simulation
function runSimulation() {
  const populationSize = parseInt(populationSizeInput.value);
  const numberOfChromosomes = parseInt(numberOfChromosomesInput.value);
  const generations = 100;

  const population = generateInitialPopulation(populationSize, numberOfChromosomes);
  const fitnessHistory: number[] = [];

  for (let generation = 0; generation < generations; generation++) {
    const mutatedPopulation = population.map(mutateIndividual);

    const newPopulation: Population = [];
    for (let i = 0; i < populationSize; i++) {
      const parent1 = mutatedPopulation[Math.floor(Math.random() * populationSize)];
      const parent2 = mutatedPopulation[Math.floor(Math.random() * populationSize)];
      const offspring = mate(parent1, parent2);
      newPopulation.push(offspring);
    }

    population.splice(0, populationSize, ...newPopulation);

    const fittestIndividual = population.reduce(
      (fittest, individual) => (calculateFitness(individual) > calculateFitness(fittest) ? individual : fittest)
    );

    const fittestFitness = calculateFitness(fittestIndividual);
    fitnessHistory.push(fittestFitness);
  }

  // Display fitness history graph
  const ctx = document.getElementById('fitness-chart') as HTMLCanvasElement;
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: generations }, (_, i) => i + 1),
      datasets: [
        {
          label: 'Fittest Individual Fitness',
          data: fitnessHistory,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
        },
      },
    },
  });
}

// Event listener for the start button
startButton.addEventListener('click', runSimulation);
