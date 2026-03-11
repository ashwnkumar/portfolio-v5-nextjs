# 💻 cmdtask

> A terminal-inspired todo list for developers and keyboard-first thinkers

## The Problem I Was Solving

You know that feeling when you're deep in the terminal, in the zone, and then you need to check your todo list? So you alt-tab to some GUI app, click around with your mouse, break your flow, and by the time you get back to coding, you've forgotten what you were doing.

Yeah, I got tired of that too.

So I built cmdtask - a todo list that lives where I live: in the terminal aesthetic. No context switching, no mouse required, just pure keyboard-driven task management that feels like home for developers.

## What Makes It Different?

**Terminal-First Design**: Built for people who think in commands, not clicks. If you've ever felt more productive in a terminal than a GUI, this is your todo list.

**Zero Friction**: Type `add "fix that bug" --high` and you're done. No menus, no forms, no distractions. Just you and your tasks.

**Keyboard Everything**: Your mouse can take a break. Arrow keys for history, tab for autocomplete vibes, and commands that feel natural if you've ever used git or npm.

## Features

- **Pure keyboard navigation** — Your mouse can take a break
- **Command-line interface** — Familiar syntax for developers
- **Priority management** — Flag tasks as high, medium, or low priority
- **Task filtering** — List by status or priority
- **Command history** — Arrow keys to navigate previous commands
- **Local storage** — Your tasks persist using IndexedDB
- **ASCII art** — Because why not?
- **Motivational quotes** — For when you need that extra push
- **Zero distractions** — Just you and your tasks

## Features

- 💻 **Pure keyboard navigation** - Your mouse can take a break
- ⌨️ **Command-line interface** - Familiar syntax for developers
- 🎯 **Priority management** - Flag tasks as high, medium, or low priority
- 🔍 **Task filtering** - List by status or priority
- ⏮️ **Command history** - Arrow keys to navigate previous commands
- 💾 **Local storage** - Your tasks persist using IndexedDB
- 🎨 **ASCII art** - Because why not?
- 💪 **Motivational quotes** - For when you need that extra push
- 🧘 **Zero distractions** - Just you and your tasks

## How It Works

1. **Type commands** like you would in a real terminal
2. **Add tasks** with `add "task name" --high` for priorities
3. **List tasks** with `list` or filter by status/priority
4. **Mark complete** with `done <taskID>`
5. **Delete tasks** with `delete <taskID>`
6. **Get motivated** with `motivate` when you need a boost
7. **Clear history** with `clear` for a fresh start

## Command Reference

```bash
# Task Management
add "task name"                    # Add a task (default: low priority)
add "urgent task" --high           # Add with high priority
done <taskID>                      # Mark task as complete
delete <taskID>                    # Delete a task

# Viewing Tasks
list                               # Show all tasks
list done                          # Show completed tasks
list pending                       # Show pending tasks
list --high                        # Show high priority tasks

# Utilities
help                               # Show available commands
motivate                           # Get a random motivational quote
clear                              # Clear the terminal
refresh                            # Reload the app
purge                              # Delete all completed tasks
```

## Tech Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: TailwindCSS 4.1.11
- **Storage**: IndexedDB (client-side persistence)
- **Hosting**: Firebase Hosting

## Why "cmdtask"?

Because "command-task" was too long to type, and if there's one thing developers hate, it's unnecessary keystrokes. Plus, it sounds cool when you say it out loud.

---

Made with ☕ by [Ashwin](https://github.com/yourusername) for keyboard warriors everywhere.
