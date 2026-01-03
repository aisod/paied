export interface Module {
  week: number
  title: string
  objectives: string
  content: string
}

export function extractModules(content: string): Module[] {
  const modules: Module[] = []
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return modules
  }
  
  const lines = content.split('\n')
  let currentModule: Partial<Module> | null = null
  let currentContent: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // Match **Week N: title** where title can contain any characters including em dashes
    // Try multiple regex patterns for robustness - order matters (most specific first)
    const weekMatch = 
      line.match(/\*\*Week (\d+):\s*([^*]+?)\s*\*\*/) ||  // Title without asterisks (most common)
      line.match(/\*\*Week (\d+):\s*(.+?)\*\*/) ||          // Any title (fallback)
      line.match(/\*\*Week (\d+):\s*(.+)\*\*/)             // Greedy match (last resort)
    
    if (weekMatch) {
      // Save previous module if exists
      if (currentModule && currentContent.length > 0) {
        modules.push({
          week: currentModule.week!,
          title: currentModule.title!,
          objectives: currentModule.objectives || '',
          content: currentContent.join('\n').trim()
        })
      }
      
      // Start new module
      currentModule = {
        week: parseInt(weekMatch[1]),
        title: weekMatch[2].trim()
      }
      currentContent = [line]
      
      // Look for objectives in next few lines
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        const objectivesLine = lines[j]
        // Match **Objectives**: text (objectives can be on same line or next line)
        const objectivesMatch = objectivesLine.match(/\*\*Objectives\*\*:?\s*(.+)/)
        if (objectivesMatch) {
          // Objectives text is on the same line after **Objectives**:
          const objectivesText = objectivesMatch[1]?.trim()
          if (objectivesText && objectivesText.length > 0) {
            currentModule.objectives = objectivesText
            break
          } else {
            // Objectives might be on next line (fallback)
            const nextLine = lines[j + 1]?.trim()
            if (nextLine && !nextLine.startsWith('**')) {
              currentModule.objectives = nextLine
              break
            }
          }
        }
      }
    } else if (currentModule) {
      // Stop collecting if we hit a major section (like Month X Milestone)
      if (line.match(/\*\*Month \d+ Milestone/) || line.match(/\*\*Month Overview\*\*/)) {
        if (currentContent.length > 0) {
          modules.push({
            week: currentModule.week!,
            title: currentModule.title!,
            objectives: currentModule.objectives || '',
            content: currentContent.join('\n').trim()
          })
        }
        currentModule = null
        currentContent = []
        continue
      }
      
      // Check if we hit the next week (shouldn't happen if regex works, but safety check)
      const nextWeekMatch = line.match(/\*\*Week \d+:/)
      if (nextWeekMatch) {
        // This shouldn't happen if the regex above works, but if it does, save current and process next
        if (currentContent.length > 0) {
          modules.push({
            week: currentModule.week!,
            title: currentModule.title!,
            objectives: currentModule.objectives || '',
            content: currentContent.join('\n').trim()
          })
        }
        // Process this line as a new week in next iteration
        currentModule = null
        currentContent = []
        continue
      }
      
      currentContent.push(line)
    }
  }
  
  // Add last module
  if (currentModule && currentContent.length > 0) {
    modules.push({
      week: currentModule.week!,
      title: currentModule.title!,
      objectives: currentModule.objectives || '',
      content: currentContent.join('\n').trim()
    })
  }
  
  return modules
}
