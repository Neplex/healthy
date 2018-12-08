# How to contribute ?

The project is based on ionic framework. The doc can be found [here](https://beta.ionicframework.com/docs/).

## Work on the project

To work with git and the project please use [git flow](https://github.com/petervanderdoes/gitflow-avh)

First you need to clone the repository and initialize git flow:

```shell
git clone https://github.com/Neplex/healthy.git
cd healthy
git flow init -d
```

Then, to add a feature:

```shell
git flow feature start <your feature>
# Do some work
git add <you modification>
git commit -m "My beautifull work"
git flow feature publish <your feature>
```

You can do multiple commit before publishing. When you want to add your feature to the project, you need to go to GitHub and open a pull request to merge your feature into develop.
