<h1 align = "center">Drifter</h1>


A mathematical simulation of genetic drift that expands on the Hardy-Weinberg principle.
This is a fun side-project that I am currently working on. You can still submit a pull request or highlight issues!

Updated model to include genetic recombination.

---
<h2>Hardy-Weinberg Principle</h2>

The [Hardy-Weinberg Equilibrium](https://en.wikipedia.org/wiki/Hardy%E2%80%93Weinberg_principle) is a concept in population genetics that states allele (genotype) frequencies will remain constant throughout generations. The formula for it is:

```
p^2 + 2pq + q^2 = 1

Values:
p^2 = dominant homozygous (AA) frequency
2pq = heterozygous (Aa) frequency
q^2 = recessive homozygous (aa) frequency
```

[Assumptions](https://www.khanacademy.org/science/ap-biology/natural-selection/hardy-weinberg-equilibrium/a/hardy-weinberg-mechanisms-of-evolution#:~:text=When%20a%20population%20is%20in%20Hardy%2DWeinberg%20equilibrium%20for%20a,population%20size%2C%20and%20no%20selection.) of Hardy-Weinberg Equilibrium:

1. No mutations (alterations of nucleic acid)
2. Panmixia (random mating: all individuals are potential partners)
3. Large, ideally infinite, population size
4. No gene flow
5. No natural selection, the driver of evolution

Drifter aims to simulate genetic drift in a large variety of genes without the preassumptions of the Hardy-Weinberg equilibrium principle. 

---
There is an environmental genetic drift model that is much more complex. Adding genetic recombination to said model.
