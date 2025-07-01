# Contributing to SmartStepper

Thank you for your interest in contributing to **SmartStepper**! Your help is greatly appreciated. Please follow these guidelines to make the process smooth for everyone.

## Table of Contents
- [Contributing to SmartStepper](#contributing-to-smartstepper)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Getting Help](#getting-help)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Project Setup](#project-setup)
  - [Development Workflow](#development-workflow)
  - [Branching Model \& Pull Requests](#branching-model--pull-requests)
  - [Branch Protection](#branch-protection)
  - [Coding Standards](#coding-standards)
  - [Releasing New Versions](#releasing-new-versions)
  - [Community Guidelines](#community-guidelines)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)
  - [Commit Message Guidelines](#commit-message-guidelines)
  - [Templates](#templates)

---

## Code of Conduct
This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Help
If you have questions or need help, please open a [GitHub Discussion](https://github.com/Miladxsar23/smartstepper/discussions) or create an issue.

## Reporting Bugs
- Search [issues](https://github.com/Miladxsar23/smartstepper/issues) to see if your bug is already reported.
- If not, open a new issue and include:
  - A clear, descriptive title
  - Steps to reproduce
  - Expected and actual behavior
  - Screenshots or code snippets if possible
  - Your environment (OS, Node.js version, browser, etc.)

## Suggesting Features
- Check [issues](https://github.com/Miladxsar23/smartstepper/issues) for existing feature requests.
- Open a new issue with:
  - A clear, descriptive title
  - A detailed description of the feature and its use case
  - Any relevant examples or references

## Project Setup
1. **Fork** the repository and **clone** your fork.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server or build/test scripts as needed:
   ```bash
   npm run build
   npm test
   ```

## Development Workflow
- Create a feature or fix branch from the `develop` branch (e.g., `feature/your-feature` or `fix/your-bug`).
- Make your changes and ensure all tests pass.
- Commit your changes using the [Conventional Commits](https://www.conventionalcommits.org/) format.
- Push your branch to your fork.
- Open a Pull Request (PR) against the `develop` branch of the main repository.
- Fill out the PR template and describe your changes clearly.
- All code must be merged via Pull Requests; direct pushes to protected branches are not allowed.
- One or more maintainers will review your PR. Please respond to feedback promptly.

## Branching Model & Pull Requests
- The `develop` branch is the main branch for ongoing development.
- The `main` branch is reserved for stable, production-ready releases.
- All features, bugfixes, and improvements must be developed in separate branches created from `develop`.
- Pull Requests are required for all changes. No direct commits to `develop` or `main` are permitted.

## Branch Protection
- Branch protection rules are enforced on `develop` and `main` branches.
- All PRs must pass CI checks (tests, linting, etc.) before merging.
- At least one code review approval is required before merging.
- Force pushes and deletions of protected branches are disabled.

## Coding Standards
- Use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) for code formatting and linting.
- Write clear, concise, and well-documented code.
- Add or update tests for new features and bug fixes.

## Releasing New Versions
- New versions are published to npm from the `main` branch.
- Only maintainers can publish releases.
- Ensure the changelog is updated and all changes are merged into `main` via Pull Request before publishing.
- Use the appropriate npm commands to publish the package (e.g., `npm publish`).

## Community Guidelines
- Be respectful and inclusive.
- Provide constructive feedback.
- Help others when possible.
- Follow the [Code of Conduct](https://opensource.guide/code-of-conduct/).

## License
By contributing, you agree that your contributions will be licensed under the [MIT License](../LICENSE).

## Acknowledgements
Thanks to all contributors and the open source community for making SmartStepper better!

## Commit Message Guidelines
We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages (e.g., `feat: add new stepper animation`).
- All commits must follow this format. PRs with non-conforming commits may be rejected.

## Templates
Please use the provided issue and pull request templates to help us address your contribution efficiently.

---

Thank you for helping make **SmartStepper** better! 
