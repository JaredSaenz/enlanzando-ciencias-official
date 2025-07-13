import type React from "react"

interface TextOnlyProps {
  title?: string
  content: string
  className?: string
}

const TextOnly: React.FC<TextOnlyProps> = ({ title, content, className = "" }) => {
  return (
    <div className={`bg-[#552673] text-white p-8 rounded-lg shadow-lg mb-8 ${className}`}>
      {title && <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{title}</h2>}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed whitespace-pre-line">{content}</p>
      </div>
    </div>
  )
}

export default TextOnly
