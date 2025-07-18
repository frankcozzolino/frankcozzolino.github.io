const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const MEDIUM_RSS_URL = 'https://medium.com/feed/@francesco.cozzolino';
const OUTPUT_FILE = path.join(__dirname, '../rss.xml');
const SITE_URL = 'https://frankcozzolino.github.io';

// Function to make HTTP request and return promise
function fetchRSS(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            
            response.on('data', (chunk) => {
                data += chunk;
            });
            
            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// Function to clean CDATA sections
function cleanCDATA(str) {
    if (!str) return '';
    
    // Remove outer CDATA wrapper if present
    let cleaned = str.replace(/^<!\[CDATA\[(.*?)\]\]>$/s, '$1');
    
    // Handle nested CDATA sections
    cleaned = cleaned.replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1');
    
    return cleaned.trim();
}

// Function to extract first image URL from content
function extractFirstImage(content) {
    if (!content) return null;
    
    // Look for images in the content, prioritizing larger images
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
    const matches = [];
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
        const imgUrl = match[1];
        
        // Skip tiny tracking images (usually 1x1 pixels)
        if (imgUrl.includes('stat?event=') || 
            imgUrl.includes('clientViewed') || 
            imgUrl.includes('width="1"') || 
            imgUrl.includes('height="1"')) {
            continue;
        }
        
        // Skip very small images (less than 100px)
        if (imgUrl.includes('resize:fit:') || imgUrl.includes('resize:fill:')) {
            const sizeMatch = imgUrl.match(/resize:(?:fit|fill):(\d+)/);
            if (sizeMatch && parseInt(sizeMatch[1]) < 100) {
                continue;
            }
        }
        
        matches.push(imgUrl);
    }
    
    // Return the first valid image, or null if none found
    return matches.length > 0 ? matches[0] : null;
}

// Function to parse XML and extract articles
function parseRSS(xmlData) {
    const articles = [];
    
    // Extract items using regex (simple parser)
    const itemRegex = /<item>(.*?)<\/item>/gs;
    const items = xmlData.match(itemRegex);
    
    if (!items) {
        console.log('No items found in RSS feed');
        return articles;
    }
    
    items.forEach(item => {
        const title = cleanCDATA(extractTag(item, 'title'));
        const description = cleanCDATA(extractTag(item, 'description'));
        const link = extractTag(item, 'link');
        const pubDate = extractTag(item, 'pubDate');
        const creator = cleanCDATA(extractTag(item, 'dc:creator')) || 'Frank Cozzolino';
        const content = cleanCDATA(extractTag(item, 'content:encoded')) || description;
        const guid = extractTag(item, 'guid');
        
        // Extract first image from content
        const imageUrl = extractFirstImage(content);
        
        // Generate article ID from title
        const articleId = generateArticleId(title);
        
        // Extract categories and clean them
        const categoryMatches = item.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g);
        const categories = categoryMatches ? 
            categoryMatches.map(cat => cleanCDATA(cat.replace(/<\/?category>/g, ''))) : [];
        
        if (title && link) {
            articles.push({
                title,
                description,
                link,
                pubDate,
                creator,
                content,
                guid,
                categories,
                articleId,
                imageUrl
            });
        }
    });
    
    return articles;
}

// Function to extract content from XML tags
function extractTag(xml, tagName) {
    const regex = new RegExp(`<${tagName}(?:[^>]*)>(.*?)<\/${tagName}>`, 's');
    const match = xml.match(regex);
    return match ? match[1].trim() : '';
}

// Function to generate URL-friendly ID from title
function generateArticleId(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
}

// Function to escape XML characters
function escapeXML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Function to extract excerpt from content
function extractExcerpt(content, maxLength = 200) {
    // Remove HTML tags
    let text = content.replace(/<[^>]*>/g, '');
    
    // Remove extra whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    // Get first sentence or truncate
    if (text.length > maxLength) {
        text = text.substring(0, maxLength);
        const lastSpace = text.lastIndexOf(' ');
        if (lastSpace > 0) {
            text = text.substring(0, lastSpace);
        }
        text += '...';
    }
    
    return text;
}

// Function to generate RSS XML
function generateRSS(articles) {
    const now = new Date().toUTCString();
    
    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel>
        <title>Frank Cozzolino - Blog &amp; Insights</title>
        <link>${SITE_URL}/</link>
        <description>Thoughts, ideas, and professional insights on technology, project management, and professional development</description>
        <language>en-us</language>
        <lastBuildDate>${now}</lastBuildDate>
        <ttl>60</ttl>
        <image>
            <url>${SITE_URL}/images/signature.png</url>
            <title>Frank Cozzolino</title>
            <link>${SITE_URL}/</link>
        </image>
        
`;

    articles.forEach(article => {
        const blogUrl = `${SITE_URL}/blog.html?article=${article.articleId}`;
        const categories = article.categories.map(cat => `            <category>${escapeXML(cat)}</category>`).join('\n');
        const excerpt = article.description || extractExcerpt(article.content);
        
        rss += `        <item>
            <title>${escapeXML(article.title)}</title>
            <link>${blogUrl}</link>
            <guid>${blogUrl}</guid>
            <pubDate>${article.pubDate}</pubDate>
            <dc:creator>${escapeXML(article.creator)}</dc:creator>
${categories}
            <description>${escapeXML(excerpt)}</description>`;
        
        // Add image element if available
        if (article.imageUrl) {
            rss += `
            <enclosure url="${escapeXML(article.imageUrl)}" type="image/jpeg" length="0"/>`;
        }
        
        rss += `
            <content:encoded><![CDATA[${article.content}]]></content:encoded>
        </item>
        
`;
    });

    rss += `    </channel>
</rss>`;

    return rss;
}

// Main function
async function main() {
    try {
        console.log('Fetching Medium RSS feed...');
        const xmlData = await fetchRSS(MEDIUM_RSS_URL);
        
        console.log('Parsing RSS feed...');
        const articles = parseRSS(xmlData);
        
        console.log(`Found ${articles.length} articles`);
        
        if (articles.length === 0) {
            console.log('No articles found. Exiting...');
            return;
        }
        
        // Log first few articles for verification
        console.log('\nFirst 3 articles:');
        articles.slice(0, 3).forEach((article, index) => {
            console.log(`${index + 1}. ${article.title}`);
            console.log(`   ID: ${article.articleId}`);
            console.log(`   Categories: ${article.categories.join(', ')}`);
            console.log(`   Date: ${article.pubDate}`);
            console.log(`   Image: ${article.imageUrl || 'No image found'}`);
            console.log('');
        });
        
        console.log('Generating RSS XML...');
        const rssXML = generateRSS(articles);
        
        console.log(`Writing RSS to ${OUTPUT_FILE}...`);
        fs.writeFileSync(OUTPUT_FILE, rssXML, 'utf8');
        
        console.log('RSS feed generated successfully!');
        console.log(`Articles included: ${articles.length}`);
        console.log(`RSS feed available at: ${SITE_URL}/rss.xml`);
        
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        process.exit(1);
    }
}

// Run the script
main(); 