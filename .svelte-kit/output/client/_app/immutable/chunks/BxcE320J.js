function s(t,a="avataaars"){t.name||t.email;const e=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);return`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(e)}&backgroundColor=b6e3f4&size=128`}function r(t){const n=`
    <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" fill="#6366f1" rx="64"/>
      <text x="64" y="80" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">${(t.name||t.email||"User").split(" ").map(i=>i[0]).join("").toUpperCase().slice(0,2)}</text>
    </svg>
  `;return`data:image/svg+xml;base64,${btoa(n)}`}export{r as a,s as g};
