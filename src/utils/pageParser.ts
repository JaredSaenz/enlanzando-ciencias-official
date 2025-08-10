interface PageMetadata {
  section: string
  id: string
  titlePage: string
}

interface ComponentCall {
  type: "TextOnly" | "TextWithImage" | "FullWidthImage" | "ThreeImages"
  params: any[]
}

interface ParsedPage {
  metadata: PageMetadata
  components: ComponentCall[]
}

export class PageParser {
  static parse(content: string): ParsedPage {
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    const metadata: PageMetadata = {
      section: "",
      id: "",
      titlePage: "",
    }

    const components: ComponentCall[] = []
    let currentComponentLines: string[] = []
    let inComponent = false

    for (const line of lines) {
      // Parse metadata
      if (line.startsWith("section=")) {
        metadata.section = line.split("=")[1].replace(/"/g, "")
        continue
      }

      if (line.startsWith("id=")) {
        metadata.id = line.split("=")[1].replace(/"/g, "")
        continue
      }

      if (line.startsWith("titlePage=")) {
        metadata.titlePage = line.split("=")[1].replace(/"/g, "")
        continue
      }

      // Parse components
      if (line.match(/^(TextOnly|TextWithImage|FullWidthImage|ThreeImages)\(/)) {
        // If we were already in a component, process it first
        if (inComponent && currentComponentLines.length > 0) {
          const component = this.parseComponent(currentComponentLines.join("\n"))
          if (component) components.push(component)
        }

        // Start new component
        currentComponentLines = [line]
        inComponent = true
        continue
      }

      if (inComponent) {
        currentComponentLines.push(line)

        // Check if component is complete (ends with ))
        const fullComponent = currentComponentLines.join("\n")
        if (this.isComponentComplete(fullComponent)) {
          const component = this.parseComponent(fullComponent)
          if (component) components.push(component)
          currentComponentLines = []
          inComponent = false
        }
      }
    }

    // Process last component if exists
    if (inComponent && currentComponentLines.length > 0) {
      const component = this.parseComponent(currentComponentLines.join("\n"))
      if (component) components.push(component)
    }

    return { metadata, components }
  }

  private static isComponentComplete(componentStr: string): boolean {
    let openParens = 0
    let inString = false
    let inBacktick = false
    let escapeNext = false

    for (let i = 0; i < componentStr.length; i++) {
      const char = componentStr[i]

      if (escapeNext) {
        escapeNext = false
        continue
      }

      if (char === "\\") {
        escapeNext = true
        continue
      }

      if (char === "`" && !inString) {
        inBacktick = !inBacktick
        continue
      }

      if (char === '"' && !inBacktick) {
        inString = !inString
        continue
      }

      if (!inString && !inBacktick) {
        if (char === "(") openParens++
        if (char === ")") openParens--
      }
    }

    return openParens === 0
  }

  private static parseComponent(componentStr: string): ComponentCall | null {
    const match = componentStr.match(/^(TextOnly|TextWithImage|FullWidthImage|ThreeImages)$$([\s\S]*)$$$/)
    if (!match) return null

    const [, type, paramsStr] = match
    const params = this.parseParameters(paramsStr)

    return {
      type: type as ComponentCall["type"],
      params,
    }
  }

  private static parseParameters(paramsStr: string): any[] {
    const params: any[] = []
    let current = ""
    let inString = false
    let inBacktick = false
    let inArray = false
    let inObject = false
    let escapeNext = false
    let parenDepth = 0
    let bracketDepth = 0
    let braceDepth = 0

    for (let i = 0; i < paramsStr.length; i++) {
      const char = paramsStr[i]

      if (escapeNext) {
        current += char
        escapeNext = false
        continue
      }

      if (char === "\\") {
        current += char
        escapeNext = true
        continue
      }

      if (char === "`" && !inString) {
        inBacktick = !inBacktick
        current += char
        continue
      }

      if (char === '"' && !inBacktick) {
        inString = !inString
        current += char
        continue
      }

      if (!inString && !inBacktick) {
        if (char === "(") parenDepth++
        if (char === ")") parenDepth--
        if (char === "[") {
          bracketDepth++
          if (bracketDepth === 1) inArray = true
        }
        if (char === "]") {
          bracketDepth--
          if (bracketDepth === 0) inArray = false
        }
        if (char === "{") {
          braceDepth++
          if (braceDepth === 1) inObject = true
        }
        if (char === "}") {
          braceDepth--
          if (braceDepth === 0) inObject = false
        }

        if (char === "," && parenDepth === 0 && bracketDepth === 0 && braceDepth === 0) {
          params.push(this.parseValue(current.trim()))
          current = ""
          continue
        }
      }

      current += char
    }

    if (current.trim()) {
      params.push(this.parseValue(current.trim()))
    }

    return params
  }

  private static parseValue(value: string): any {
    value = value.trim()

    // Handle backtick strings (template literals)
    if (value.startsWith("`") && value.endsWith("`")) {
      return value.slice(1, -1)
    }

    // Handle quoted strings
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1)
    }

    // Handle numbers
    if (/^\d+$/.test(value)) {
      return Number.parseInt(value, 10)
    }

    // Handle booleans
    if (value === "true") return true
    if (value === "false") return false

    // Handle arrays
    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    }

    // Handle objects
    if (value.startsWith("{") && value.endsWith("}")) {
      try {
        return JSON.parse(value)
      } catch {
        return {}
      }
    }

    // Handle special variables
    if (value === "section" || value === "id") {
      return value // These will be replaced later
    }

    // Return as string
    return value
  }
}
