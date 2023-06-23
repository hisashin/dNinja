# dNinja, world's first open-source digital PCR

We have been making open-source PCR machines for decade. 1st generation thermal cycler [NinjaPCR](https://ninjapcr.hisa.dev/) was released in 2013. Super fast PCR machines ([video1](https://youtu.be/T5oA28M3jWU), [video2](https://youtu.be/mplz5LwAXIA)) in 2016 and 2017. During Covid pandemic 2020-2023, we developed $220 [qNinja](https://qninja.hisa.dev): 2nd generation [qPCR (RT-PCR)](https://en.wikipedia.org/wiki/Real-time_polymerase_chain_reaction) and $45 [qLAMP](https://en.wikipedia.org/wiki/Loop-mediated_isothermal_amplification). Now let us start 3rd generation dNinja, [Digital PCR (dPCR)](https://en.wikipedia.org/wiki/Digital_polymerase_chain_reaction). dPCR is 1,000 times more sensitive than qPCR and essential to [liquid biopsy](https://en.wikipedia.org/wiki/Liquid_biopsy) for [noncomunicable diseases that caused 74% of global death in 2019](https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death). Check [wiki](https://github.com/hisashin/dNinja/wiki) for details.

## Fundraising

We are fundraising at [experiment.com](https://experiment.com/projects/xyvmvuiwjhvyutlayrhn/).

## Stencil Data Generator

[dNinja Stencil Generator](https://dninja-stencil.hisa.dev)
You can run this generator inside your own PC once you installed [Docker](https://www.docker.com/).
```
docker run --name dninja-stencil -p 8080:8080 -d hisashin/dninja-stencil:latest
```
Then open [http://localhost:8080](http://localhost:8080) in any browser.
- [Dockerfile](https://github.com/hisashin/dNinja/tree/main/docker/stencil)
- [Docker Hub](https://hub.docker.com/repository/docker/hisashin/dninja-stencil/general)

## Deep learning droplet tracker

[Install Python and Anaconda](https://test-jupyter.readthedocs.io/en/latest/install.html) then move to jupyter directory

`cd jupyter`

`jupyter notebook`

