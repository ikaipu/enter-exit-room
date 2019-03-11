# GitHub

[home](index.md) - [views>](views.md)

## Issue

Project leader has responsibility to manage issues.
If member forgets to do task non-assigned issues, the leader should hold accountable.

Member has responsibility of assigned issues. If member forgets to do assigned issues, the member should hold accountable.

It doesn't mean all issue should be made by the leader. the leader can ask someone to create issues.

Don't put many problems into one issue. Make issues as the number of problems.

### Title

Should be understandable only reading title.

Should be included the name of design material.

> \[XX Page\] Crash when press YY button.

### Description

#### For a bug

Write details of how to replicate.

> 1. Display XX Screen
> 2. Put username on YY form.
> 3. error message "ZZZ" is shown after you press AA button.

Write expected behavior.

### Labels

#### bug

Used for reporting bug

-> Close when you fix

#### duplicate

Used if the issue is already reported

-> Close with link of duplicated issues

#### enhancement

Used for new feature

-> Close when the feature is merged. Or Close with reason not to deal

#### invalid

Used if the is not correct

-> Close with reason not to deal.

#### question

Used for asking question

-> Close when answer is written

#### wontfix

Used known problem but don't deal

-> Close with reason not to deal.

### Milestone, Assign, Project

Project leader should put milestones and assignee, Project every beginning of week.
At the time all issues should have milestones and assignee and projects.

These should be fresh, means well-revised and new.

#### Milestone

At least need to put milestone every 2 weeks.

If there is milestone already expired, or impossible to follow schedule,
should be revised.

#### Assign

Each issue should have only one assignee.
If the issue needs to be related more than one, separate issues.

#### Project

To make project, go to "Project" tab, "New Project".
Use Project template, "Automated kanban with reviews".

Each member has responsibility of managing assigned issues.

Project has 5 columns

- To do
  Card is automatically assigned here when issue is assigned to project.

- In progress
  You must move card here when you start the issue or
  decline other one's issue from "Needs review".

- Needs review
  You must move card here when you finish the issue and waiting for review.

- Reviewer approved
  You must move card here when you approve other one's issue.

- Done
  Card is automatically moved when you close the issue.

## Branch

Based on [Git Flow Workflow](https://leanpub.com/git-flow/read)

### Branch types

#### master

Should be always deployable.
It's merged from develop branch when deploy is needed.
Can not be merged from any other branches expect for develop branch.
Can not push any commits here directly.

#### develop

All feature branch should be merged to here.
Can not push any commits here directly.

#### qa

It's merged form develop when needs qa testing.
Can not push any commits here directly.

#### feature

It's related from issues.
When you start to fix issue. you must make branch from the latest develop branch.
It's merged to develop branch.

naming should be `<type>/<name>`

#### `<type>`

```
fix - Code changes linked to a known issue of bug.
feature - Code changes linked to a known issue of feature.
```

#### `<name>`

Always use dashes to separate words, and keep it short.

#### Examples

```
feature/member-redux
fix/home-button-crash
```

## Git commit

Don't do many tasks in one commit. Each task should be in each commit.The code will be more structured if you commit one by one.

Use present tense not past tense.

> Fix the bug on job details page that doesn't show loading modal.

Make it understandable what you did when you look at comments later on.

For the unclear place, put a comment or a reference on the code.

## Pull Requests

### Title

Should be understandable what you did

### Description

**must put screen shot** if you have View changes.

Put link of related issues and pull requests if there are.

Use following formats to close related issues **as commit message**.

- fix #12
- fixes #12
- fixed #12
- close #12
- closes #12
- closed #12
- resolve #12
- resolves #12
- resolved #12

It should be written when you done.

**Don't put them in other place**
such title or description of pull request. It's redundant.

#### After Code Review

Commit revise for each comment but not all. So that reviewer can easily check by reading each commit.

Put simple comment "Fixed", "Done" for each reviewers comment if you finish modification.
