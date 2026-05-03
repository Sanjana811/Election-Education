export function formatAIResponse(text: string): string {
  if (!text) return text;
  
  // Split into paragraphs based on double newlines or clear breaks
  let paragraphs = text.split(/\n\s*\n/);
  
  // Process each paragraph
  paragraphs = paragraphs.map(para => {
    // Trim whitespace
    para = para.trim();
    
    // Skip empty paragraphs
    if (!para) return '';
    
    // Convert bold markdown (**text**) to HTML <strong> tags
    para = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points (• or - or *) to proper list items if we detect a list
    // For simplicity, we'll just ensure proper spacing for bullet points
    if (para.startsWith('•') || para.startsWith('-') || para.startsWith('*')) {
      // Already formatted bullet, just ensure it stands out
      return para;
    }
    
    // Check if paragraph looks like it contains a list (multiple lines starting with bullet chars)
    const lines = para.split('\n');
    const hasBulletLines = lines.some(line => 
      line.trim().startsWith('•') || 
      line.trim().startsWith('-') || 
      line.trim().startsWith('*')
    );
    
    if (hasBulletLines && lines.length > 1) {
      // Process each line for bullet formatting
      const processedLines = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
          // Ensure proper bullet formatting
          return `• ${trimmed.substring(1).trim()}`;
        }
        return trimmed;
      });
      return processedLines.join('\n');
    }
    
    return para;
  });
  
  // Join paragraphs with double newlines for proper spacing
  return paragraphs.filter(p => p).join('\n\n');
}