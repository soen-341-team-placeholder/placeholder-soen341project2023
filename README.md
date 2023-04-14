# Continuous Integration and Deployment for Team Project 341

This project is an implementation of the same code as the team project for course 341. The next step is to implement Continuous Integration and Continuous Deployment (CI/CD). We initially attempted to host our own pipelines but encountered problems. Therefore, we decided to explore cloud-based pipelines which use third-party servers. Unfortunately, using these servers comes at a cost, which we found to be too high for our project budget.

To overcome this issue, I decided to fork the original repository. This was done to take advantage of the free CI/CD services provided for public repositories. It's unfortunate that we are not able to use these services for our private repository due to the lack of a school agreement with these companies. I'm deleting this the second it's graded, no worries.

In this repository, you will find the necessary files and configurations to run our CI/CD pipeline using a free cloud-based service. The pipeline is triggered whenever a pull request is made to the master branch of the original repository. It automatically runs our tests, linters, and code quality checks. If everything passes, the pipeline deploys the code to our production environment.
