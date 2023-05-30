// Advanced Genetic simulation. Currently trying to write documentation for it. Any changes to genetic recomnination techniques are welcome. Just submit a pull request!

import Chart from 'chart.js'; //for simulation

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
function mutateIndividual(individual: Individual, chromosomeIndex: number, geneIndex: number): Individual {
  const mutationRate = calculateMutationRate(chromosomeIndex, geneIndex);
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

// Calculate the mutation rate for a specific gene
function calculateMutationRate(chromosomeIndex: number, geneIndex: number): number {
  // You can customize this function to define different mutation rates based on your desired criteria

  // Generate a random mutation rate between 0.01 and 0.05
  const minMutationRate = 0.01;
  const maxMutationRate = 0.05;
  const mutationRate = Math.random() * (maxMutationRate - minMutationRate) + minMutationRate;

  return mutationRate;
}

// Apply fitness evaluation to an individual
function evaluateFitness(individual: Individual): number {
  // Implementation of fitness evaluation logic
  // You can customize this function to define how the fitness of an individual is evaluated based on its genetic makeup

  // Calculate the sum of all genes in the individual
  const totalGenes = individual.flat().reduce((sum, gene) => sum + gene, 0);

  // Calculate fitness as the ratio of the sum of genes to the total number of genes
  const fitness = totalGenes / (individual.length * individual[0].length);

  return fitness;
}

// Apply selection pressure to the population
function applySelectionPressure(population: Population): Population {
  const evaluatedPopulation = population.map((individual) => ({
    individual,
    fitness: evaluateFitness(individual),
  }));

  // Sort the evaluated population based on fitness scores in descending order
  evaluatedPopulation.sort((a, b) => b.fitness - a.fitness);

  // Apply selection pressure by keeping the top individuals
  const selectedPopulation = evaluatedPopulation.slice(0, Math.floor(population.length / 2));

  // Extract the individuals from the selected population
  const newPopulation: Population = selectedPopulation.map((evaluatedIndividual) => evaluatedIndividual.individual);

  return newPopulation;
}

// Perform genetic drift mechanisms (bottleneck, founder effect, migration, etc.)
function applyGeneticDrift(population: Population): Population {
  // Implementation of genetic drift mechanisms
  // You can customize this function to introduce genetic drift based on your desired mechanisms

  // Shuffle the population randomly to simulate genetic mixing
  const shuffledPopulation = population.sort(() => Math.random() - 0.5);

  return shuffledPopulation;
}

// Perform non-random mating patterns
function performNonRandomMating(population: Population): Population {
  // Implementation of non-random mating patterns
  // You can customize this function to define different mating patterns based on your desired patterns

  // Perform random pairwise mating within each chromosome
  const newPopulation: Population = [];

  for (let i = 0; i < population.length; i += 2) {
    const parent1 = population[i];
    const parent2 = population[i + 1];

    const offspring = mate(parent1, parent2);
    newPopulation.push(offspring);
  }

  return newPopulation;
}

// Perform genetic recombination
function performGeneticRecombination(population: Population): Population {
  // Implementation of genetic recombination
  // You can customize this function to define different recombination patterns based on your desired mechanisms

  // Perform uniform crossover between random pairs of individuals
  const newPopulation: Population = [];

  for (let i = 0; i < population.length; i += 2) {
    const parent1 = population[i];
    const parent2 = population[i + 1];

    const offspring = mate(parent1, parent2); // Assuming mate() function performs crossover
    newPopulation.push(offspring);
  }

  return newPopulation;
}

// Apply environmental factors
function applyEnvironmentalFactors(population: Population): Population {
  // Implementation of environmental factors
  // You can customize this function to introduce environmental factors that affect the fitness of individuals

  // Add a random fitness factor to each individual
  const modifiedPopulation: Population = [];

  for (const individual of population) {
    const fitness = evaluateFitness(individual); // Assuming evaluateFitness() function is implemented
    const modifiedFitness = fitness * (1 + Math.random() * 0.2 - 0.1); // Add random fitness factor within a range

    // Create a copy of the individual with the modified fitness
    const modifiedIndividual: Individual = individual.map(chromosome => [...chromosome]);
    modifiedPopulation.push(modifiedIndividual);
  }

  return modifiedPopulation;
}

// Generate a population structure (e.g., structured populations, subpopulations)
function generatePopulationStructure(population: Population): Population {
  // Implementation of population structure
  // You can customize this function to create different population structures based on your desired configurations

  // Shuffle the population randomly to create a new population structure
  const shuffledPopulation = population.sort(() => Math.random() - 0.5);

  return shuffledPopulation;
}

// Run the simulation
function runSimulation() {
  const populationSize = parseInt(populationSizeInput.value);
  const numberOfChromosomes = parseInt(numberOfChromosomesInput.value);
  const generations = 100;

  let population = generateInitialPopulation(populationSize, numberOfChromosomes);
  const alleleFrequencyHistory: number[][] = [];

  for (let generation = 0; generation < generations; generation++) {
    population = applyGeneticDrift(population);
    population = performNonRandomMating(population);
    population = performGeneticRecombination(population);
    population = applyEnvironmentalFactors(population);
    population = generatePopulationStructure(population);

    const mutatedPopulation: Population = [];
    for (let i = 0; i < population.length; i++) {
      const individual = population[i];

      const mutatedIndividual = individual.map((chromosome, chromosomeIndex) =>
        chromosome.map((gene, geneIndex) => mutateIndividual(individual, chromosomeIndex, geneIndex))
      );

      mutatedPopulation.push(...mutatedIndividual);
    }

    population = applySelectionPressure(mutatedPopulation);

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
