# 🚀 Quick Git Commands for Cafe Aroma

## Initial Setup (First Time Only)

### 1. Initialize Git Repository
```bash
git init
```

### 2. Add All Files
```bash
git add .
```

### 3. Create Initial Commit
```bash
git commit -m "Initial commit: Cafe Aroma - Premium Coffee Experience"
```

### 4. Create Main Branch
```bash
git branch -M main
```

### 5. Add Remote Repository
```bash
# Replace 'yourusername' with your GitHub username
git remote add origin https://github.com/yourusername/cafe-aroma.git
```

### 6. Push to GitHub
```bash
git push -u origin main
```

## Daily Workflow

### Check Status
```bash
git status
```

### Add Changes
```bash
# Add all changes
git add .

# Or add specific files
git add filename.tsx
```

### Commit Changes
```bash
git commit -m "Description of your changes"
```

### Push to GitHub
```bash
git push
```

### Pull Latest Changes
```bash
git pull
```

## Common Commit Messages

```bash
# Feature additions
git commit -m "feat: Add new product category filter"
git commit -m "feat: Implement AI barista improvements"

# Bug fixes
git commit -m "fix: Resolve cart total calculation issue"
git commit -m "fix: Fix mobile responsive layout"

# Updates
git commit -m "update: Enhance product images"
git commit -m "update: Improve AI responses"

# Documentation
git commit -m "docs: Update README with deployment guide"

# Style changes
git commit -m "style: Improve button hover animations"
```

## Branching (Optional but Recommended)

### Create New Branch
```bash
git checkout -b feature/new-feature-name
```

### Switch Branches
```bash
git checkout main
git checkout feature/new-feature-name
```

### Merge Branch to Main
```bash
git checkout main
git merge feature/new-feature-name
```

### Delete Branch
```bash
git branch -d feature/new-feature-name
```

## Undo Changes

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Discard All Local Changes
```bash
git reset --hard HEAD
```

### Discard Changes in Specific File
```bash
git checkout -- filename.tsx
```

## View History

### View Commit History
```bash
git log
```

### View Compact History
```bash
git log --oneline
```

## GitHub Repository Setup

### Create New Repository on GitHub:
1. Go to https://github.com/new
2. Repository name: `cafe-aroma`
3. Description: "Premium coffee shop web application with AI barista"
4. Keep it Public or Private (your choice)
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"
7. Follow the commands above to push your code

## Troubleshooting

### If you get "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/cafe-aroma.git
```

### If push is rejected
```bash
git pull --rebase origin main
git push
```

### View Remote URL
```bash
git remote -v
```

---

**Pro Tip**: Commit often with clear messages. It makes tracking changes easier!
