# dNinja, world's first open-source digital PCR

We have been making open-source PCR machines for decade. 1st generation thermal cycler [NinjaPCR](https://ninjapcr.hisa.dev/) was released in 2013. Super fast PCR machines ([video1](https://youtu.be/T5oA28M3jWU), [video2](https://youtu.be/mplz5LwAXIA)) in 2016 and 2017. During Covid pandemic 2020-2023, we developed $220 [qNinja](https://qninja.hisa.dev): 2nd generation [qPCR (RT-PCR)](https://en.wikipedia.org/wiki/Real-time_polymerase_chain_reaction) and $45 [qLAMP](https://en.wikipedia.org/wiki/Loop-mediated_isothermal_amplification). Now let us start 3rd generation dNinja, [Digital PCR (dPCR)](https://en.wikipedia.org/wiki/Digital_polymerase_chain_reaction). dPCR is 1,000 times more sensitive than qPCR and essential to [liquid biopsy](https://en.wikipedia.org/wiki/Liquid_biopsy) for [noncomunicable diseases that caused 74% of global death in 2019](https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death). Check [wiki](https://github.com/hisashin/dNinja/wiki) for details.

## Fundraising

We are fundraising at [experiment.com](https://experiment.com/projects/xyvmvuiwjhvyutlayrhn/).

## Stencil Data Generator

[dNinja Stencil Generator](https://dninja-stencil.hisa.dev)

You can run this generator inside your own PC once you installed [Docker](https://www.docker.com/) by this command.
```
docker run --name dninja-stencil -p 8080:8080 -d hisashin/dninja-stencil:latest
```
Then open [http://localhost:8080](http://localhost:8080) in any browser.

- [Dockerfile](https://github.com/hisashin/dNinja/tree/main/docker/stencil)
- [Docker Hub](https://hub.docker.com/repository/docker/hisashin/dninja-stencil/general)
- [142x142 holes 50x50mm stencil data](https://hisa.dev/wp-content/uploads/2023/06/gerbers-230625-50x50mm.zip)
- [20x20 holes 10x12mm stencil data](https://hisa.dev/wp-content/uploads/2023/06/gerbers-230625-10x12mm.zip)
- [First manufacturer at Taobao: with -+0.01mm error, CNY1200=$170 per piece](https://item.taobao.com/item.htm?ut_sk=1.Ypc9H/XorhEDAAcwD2ch0vJQ_21380790_1688378392455.Copy.1&id=623970507381&sourceType=item&price=10&suid=78A0F7FA-8B75-4613-91A6-45D714BB23D1&shareUniqueId=22191376057&un=95ad93137a6878d305c56616cc6ca708&share_crt_v=1&un_site=0&spm=a2159r.13376460.0.0&sp_abtk=gray_1_code_simpleios2&tbSocialPopKey=shareItem&sp_tk=RlVsR2RIMDlaeXA%3D&cpp=1&shareurl=true&short_name=h.5auJpLK&bxsign=scdBWLpVMVIkbSnqAfW2rnKfa7dWPoU4KA8uJBywBg1I3cvMinjX_jB2T0bnRwm8NDQqp9G8_6ivEOpTFam0G2zFqATo92WRVCw4wXnaTxFa7QGoavL1j480Azp-p_RFSSW&tk=FUlGdH09Zyp&app=chrome)

## Deep learning droplet tracker

[Install Python and Anaconda](https://test-jupyter.readthedocs.io/en/latest/install.html) then move to jupyter directory

`cd jupyter`

`jupyter notebook`

