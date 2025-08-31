import { PageParser } from './pageParser'
import fs from 'fs'
import path from 'path'

export async function generatePagesFromTxt() {
  const hetcPagesDir = path.join(process.cwd(), 'public/pages/hetcPages')
  const outputDir = path.join(process.cwd(), 'src/pages/hetcPages')
  
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // Read all txt files from hetcPages directory
    const files = fs.readdirSync(hetcPagesDir).filter(file => file.endsWith('.txt'))
    
    for (const file of files) {
      const filePath = path.join(hetcPagesDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      
      // Parse the content
      const parsedPage = PageParser.parse(content)
      
      // Generate React component
      const componentCode = PageParser.generateReactComponent(parsedPage)
      
      // Write the component file
      const componentFileName = `${parsedPage.metadata.id}.tsx`
      const componentPath = path.join(outputDir, componentFileName)
      
      fs.writeFileSync(componentPath, componentCode)
      
      console.log(`Generated component: ${componentFileName}`)
      console.log(`Title: ${parsedPage.metadata.titlePage}`)
      console.log(`Components: ${parsedPage.components.length}`)
      console.log('---')
    }
    
    console.log('Page generation completed!')
    
  } catch (error) {
    console.error('Error generating pages:', error)
  }
}

// For Node.js execution
if (require.main === module) {
  generatePagesFromTxt()
}