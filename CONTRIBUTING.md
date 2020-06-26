# Contributing

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
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
```

### 4.4 Column Limit
We've chosen to use a column limit of 100 characters.

## Contributors
Huge thanks to the following contributors (by github username).
