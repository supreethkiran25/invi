// scripts/parse_policies.mjs
import fs from 'fs';

function extractPolicy(html) {
  // Extract content between <div class="shopify-policy__body"> and its closing </div>
  const match = html.match(/<div class="shopify-policy__body">([\s\S]*?)<\/div>\s*<\/div>/) ||
                html.match(/<div class="rte">([\s\S]*?)<\/div>/) ||
                html.match(/<main id="MainContent"[^>]*>([\s\S]*?)<\/main>/);
  
  if (match) {
    let clean = match[1]
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<p>/gi, '\n\n')
      .replace(/<\/p>/gi, '')
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/<h[1-6][^>]*>/gi, '\n\n### ')
      .replace(/<\/h[1-6]>/gi, '\n')
      .replace(/<li>/gi, '\n- ')
      .replace(/<\/li>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .trim();
    return clean;
  }
  return '';
}

const policies = {
  privacy: extractPolicy(fs.readFileSync('scripts/privacy.html', 'utf8')),
  terms: extractPolicy(fs.readFileSync('scripts/terms.html', 'utf8')),
  refund: extractPolicy(fs.readFileSync('scripts/refund.html', 'utf8'))
};

fs.writeFileSync('scripts/parsed_policies.json', JSON.stringify(policies, null, 2));
console.log('Successfully parsed policies!');
console.log('Privacy length:', policies.privacy.length);
console.log('Terms length:', policies.terms.length);
console.log('Refund length:', policies.refund.length);
