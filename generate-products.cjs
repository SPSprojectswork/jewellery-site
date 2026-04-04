const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, 'public', 'website_product');
try {
  const folders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());
  const data = folders.map(f => ({
    category: f,
    items: fs.readdirSync(path.join(baseDir, f))
      .filter(i => /\.(jpg|jpeg|png|gif)$/i.test(i))
      .map(i => ({
        name: i.replace(/\.\w+$/, ''),
        path: `website_product/${f}/${i}`
      }))
  }));
  fs.writeFileSync(path.join(__dirname, 'src', 'products.json'), JSON.stringify(data, null, 2));
  console.log('Products JSON generated successfully.');
} catch (e) {
  console.error('Error:', e.message);
}
