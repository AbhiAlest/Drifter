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

// Calculate the allele frequencies in the population
function calculateAlleleFrequencies(population: Population): number[] {
  const alleleCounts: number[] = [];

  for (let i = 0; i < population[0].length; i++) {
    let alleleCount = 0;
    for (let j = 0; j < population.length; j++) {
      for (let k = 0; k < population[j][i].length; k++) {
        alleleCount += population[j][i][k];
      }
    }
    alleleCounts.push(alleleCount);
  }

  const totalAlleleCount = alleleCounts.reduce((total, count) => total + count, 0);
  const alleleFrequencies = alleleCounts.map((count) => count / totalAlleleCount);

  return alleleFrequencies;
}

// Run the simulation
function runSimulation() {
  const populationSize = parseInt(populationSizeInput.value);
  const numberOfChromosomes = parseInt(numberOfChromosomesInput.value);
  const generations = 100;

  const population = generateInitialPopulation(populationSize, numberOfChromosomes);
  const alleleFrequencyHistory: number[][] = [];

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

    const alleleFrequencies = calculateAlleleFrequencies(population);
    alleleFrequencyHistory.push(alleleFrequencies);
  }

  // Display allele frequency history graph
  const ctx = document.getElementById('allele-frequency-chart') as HTMLCanvasElement;
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: generations }, (_, i) => i + 1),
      datasets: alleleFrequencyHistory.map((frequencies, index) => ({
        label: `Chromosome ${index + 1}`,
        data: frequencies,
        borderColor: `hsl(${(index / numberOfChromosomes) * 360}, 100%, 50%)`,
        backgroundColor: `hsl(${(index / numberOfChromosomes) * 360}, 100%, 80%)`,
      })),
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
