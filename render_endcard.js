const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set viewport to vertical 1080p (9:16)
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          width: 1080px;
          height: 1920px;
          background-color: #ffffff;
          font-family: 'Outfit', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          box-sizing: border-box;
        }

        /* Top Third - Main Logo */
        .top-logo {
          margin-top: 250px; /* Positioned near the top third intersection */
          width: 550px;
          height: auto;
          object-fit: contain;
        }

        /* Middle Third - Text */
        .middle-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          font-weight: 900;
          font-size: 85px;
          line-height: 1.05;
          color: #0f172a;
          text-transform: uppercase;
          width: 900px;
          letter-spacing: -0.02em;
        }

        .middle-text .highlight {
          color: #004AAD;
        }

        /* Bottom Third - Delicious Logo */
        .bottom-logo {
          position: absolute;
          bottom: 250px;
          width: 450px;
          height: auto;
          object-fit: contain;
          opacity: 0.9;
        }
      </style>
    </head>
    <body>
      <img src="file:///Users/christopherreeder/Desktop/Buongiorno!/logos/Buongiorno_TShirt_Logo.png" class="top-logo" />
      
      <div class="middle-text">
        What should we<br><span class="highlight">give away next?</span>
      </div>

      <img src="file:///Users/christopherreeder/Desktop/Buongiorno!/logos/Buongiorno_Back_Text_Blue.png" class="bottom-logo" />
    </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  // Wait a moment for fonts to render
  await new Promise(r => setTimeout(r, 1000));

  const outputPath = '/Users/christopherreeder/.gemini/antigravity/brain/9be1ac3a-a772-45b0-a485-e549e5809ff0/buongiorno_end_card.png';
  await page.screenshot({ path: outputPath });

  await browser.close();
  console.log('Saved to', outputPath);
})();
