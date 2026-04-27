/**
 * A lightweight utility to parse Markdown files with frontmatter.
 */

export const parseMarkdown = (content) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  const frontmatter = {};
  let body = content;

  if (match) {
    const yaml = match[1];
    yaml.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim().replace(/^"(.*)"$/, '$1');
        if (key === 'tags') {
          try {
            frontmatter[key] = JSON.parse(value.replace(/'/g, '"'));
          } catch (e) {
            frontmatter[key] = value.split(',').map(t => t.trim());
          }
        } else {
          frontmatter[key] = value;
        }
      }
    });
    body = content.replace(frontmatterRegex, '').trim();
  }

  // STRIP DUPLICATE TITLE: If the body starts with an H1 that matches the title, remove it.
  const firstH1Regex = /^# (.*$)/m;
  const firstH1Match = body.match(firstH1Regex);
  if (firstH1Match && (firstH1Match[1].trim() === frontmatter.title?.trim() || true)) {
    // If the user wants only ONE title, we remove any H1 at the very top
    body = body.replace(firstH1Regex, '').trim();
  }

  // Enhanced Markdown to HTML Conversion
  let html = body
    // Headings
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Images: ![alt](url) -> <figure><img src="url" alt="alt" /><figcaption>alt</figcaption></figure>
    .replace(/\!\[(.*?)\]\((.*?)\)/gim, '<figure><img src="$2" alt="$1" /><figcaption>$1</figcaption></figure>')
    // Bold/Italic
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/<\/li>\n<li>/gim, '</li><li>') 
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Paragraphs (simplified)
    .replace(/\n\n/gim, '</p><p>')
    .replace(/^(.+)$/gim, (match) => {
      if (match.startsWith('<')) return match;
      return `<p>${match}</p>`;
    });

  // Wrap lists
  if (html.includes('<li>')) {
    html = html.replace(/(<li>.*<\/li>)/sim, '<ul>$1</ul>');
  }

  return { frontmatter, body, html };
};

export const getPosts = async () => {
  const modules = import.meta.glob('/src/content/blog/*.md', { as: 'raw', eager: true });
  
  const posts = Object.entries(modules).map(([path, content]) => {
    const slug = path.split('/').pop().replace('.md', '');
    const { frontmatter, html } = parseMarkdown(content);
    return {
      slug,
      ...frontmatter,
      content: html
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};
