# ROBOFRONT Intelligence Landing Page

Static landing page for **robofront.io**.

## Files
- `index.html` — landing page markup
- `styles.css` — complete ROBOFRONT visual system styling
- `script.js` — mobile navigation and reveal animations
- `assets/favicon.svg` — favicon

## GitHub Pages deployment
1. Create a new GitHub repository, for example `robofront-io`.
2. Upload all files in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose `main` branch and `/root`, then save.
6. Point `robofront.io` DNS to GitHub Pages:
   - `A` records for apex domain to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Optional `CNAME` for `www` to `<your-github-username>.github.io`

## Contact emails used in page
The page uses these placeholder addresses:
- `partners@robofront.io`
- `editorial@robofront.io`
- `access@robofront.io`

Set these up in your domain email provider or replace them in `index.html`.
