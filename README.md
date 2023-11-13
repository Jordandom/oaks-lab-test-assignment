# OAK'S LAB assignment - TODO App

## Here is live [preview](https://oaks-lab-test-assignment.vercel.app/)

## Introduction

Startup progress tracker is an innovative web application designed to help you monitor and manage the progress of your startup journey. This user-friendly platform allows you to systematically organize phases and tasks, providing a clear overview of your startup's development.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **SWC**: A super-fast compiler written in Rust; used for transforming TypeScript/JavaScript code.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **ESLint**: A static code analysis tool for identifying problematic patterns found in JavaScript code.
- **Prettier**: An opinionated code formatter that enforces a consistent style.
- **Husky**: A tool for improving your commits and more by using hooks.

## Features

- **Task Management**: Create and track tasks for each phase of your startup.
- **Phase Tracking**: Automatically update the status of phases based on task completion.
- **Interactive UI**: A dynamic and responsive user interface that adapts to your project needs.

## Getting Started

### Prerequisites

- Node.js
- bun, npm or yarn

## How to run the project

1. `bun install`
2. `bun dev`
3. The app will be available at [http://localhost:5173](http://localhost:5173)

## Requirements

- Every phase can have an unlimited amount of tasks
- If the startup accomplishes all tasks in the phase, it’s marked as
  done and unlocks the next phase.
- Tasks cannot be marked as completed unless all tasks in the
  previous phase were completed.
- Propose and implement a solution how to reopen (undo) a task.

## Propose a solution how to reopen (undo) a task

### The main problem

Currently, once a task is marked as completed, users do not have the option to revert it back to an incomplete state. However, having the ability to reopen a task would be beneficial. This feature would be particularly useful in situations where a task is accidentally marked as complete or it is later discovered that the task has not been fully completed.

### How do you propose to solve the problem?

A task can only be reopened if its corresponding phase is still incomplete. Once the phase is marked as complete, reopening any task within it is not possible. This approach was chosen for its simplicity and because it minimally alters the application's existing logic.
