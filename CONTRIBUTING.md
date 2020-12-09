# Contributing

* Try going through the project requirements and the code. See wiki and milestones etc.
* Run it in your local.
* Join the discord for this project.
* Try understanding the project code, we are using rxjs and ngrx store, which might be a new thing for you.
* Go through the code and start finding bugs, there are tons of bugs currently. Make issues for those bugs and raise pr, like smaller css issues, or code refactoring. We need a lot of refactoring, go through angular best practices and see what code can be refactored.
* Then maybe work on some functionality issues.
* You don't have to make a lot of pr's, just focus on quality of pr's. 

This project will require a few days for getting used to, and understanding what's happening. 
Also, you don't have to run fineract CN in your local, we are using a hosted instance of fineract CN, which has a few microservices hosted at buffalo.mifos URL. Check out https://github.com/openMF/digital-bank-ui/blob/master/proxy.conf.json 

Also take time to learn about rxjs, ngrx store and redux store in general, and also what we are trying to do in this project. Play around with the UI a bit on your machine. 

Helpful Links:  
Roadmap for future progress (tentative): https://github.com/openMF/digital-bank-ui/wiki/Roadmap-for-future-progress

Use cases and requirements (tentative): https://github.com/openMF/digital-bank-ui/wiki/Use-Cases-&-Requirements

Current issues: https://github.com/openMF/digital-bank-ui/issues 

Fineract CN documentation : https://izakey.github.io/fineract-cn-api-docs-site/

Fineract CN Structure: https://cwiki.apache.org/confluence/display/FINERACT/Fineract+CN+Project+Structure#FineractCNProjectStructure-identity. 


## Take Your First Steps

### Understand the basics

Not sure what a pull request is, or how to submit one? Take a look at GitHub's excellent [help
documentation](https://help.github.com/articles/using-pull-requests/) first.

### Search Issues first; create an issue if necessary

Is there already an issue that addresses your concern? Do a bit of searching in our [issue
tracker](https://issues.apache.org/jira/browse/FINCN-3?jql=project%20%3D%20FINCN%20AND%20component%20%3D%20fineract-cn-fims-web-app) to see if you can find something
similar. If you do not find something similar, please create a new issue before submitting a pull
request unless the change is truly trivial -- for example: typo fixes, removing compiler warnings,
etc.

### Discuss non-trivial contribution ideas with committers

If you're considering anything more than correcting a typo or fixing a minor bug, please discuss it
on the [dev list](mailto:dev-subscribe@fineract.apage.org) before submitting a pull request. We're
happy to provide guidance, but please spend an hour or two researching the subject on your own.

### Sign the Contributor License Agreement

Before we accept a non-trivial patch or pull request we will need you to sign the [Apache iCLA
form](https://www.apache.org/licenses/icla.pdf). Signing the
contributor's agreement does not grant anyone commit rights to the main repository, but it does mean
that we can accept your contributions, and you will get an author credit if we do.

## Create a Branch

### Branch from `develop`

Develop currently represents work toward Apache Fineract CN Framework 1.0.0. Please submit all pull requests
there, even bug fixes and minor improvements.

### Use short branch names

Branches used when submitting pull requests should preferably be named according to issues prefixed
FINCN followed by a dash and the issue number, e.g. 'FINCN-1234'. This is important, because
branch names show up in the merge commits that result from accepting pull requests and should be as
expressive and concise as possible.

## Coding Conventions
[Google Java Style](https://google.github.io/styleguide/javaguide.html) covers filenames, file
organization, indentation, comments, declarations, statements, white space, naming conventions, and
programming practices. All code written for Apache Fineract CN should follow these conventions except as noted
below.

### 3.1 License or copyright information, if present

Content of the license header: 

```javascript

```

### 4.4 Column Limit
We've chosen to use a column limit of 100 characters.

## Contributors
Huge thanks to the following contributors (by github username).
