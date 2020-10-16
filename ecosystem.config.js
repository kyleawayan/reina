module.exports = {
  apps: [
    {
      name: "reina",
      script: "index.js",
    },
  ],

  deploy: {
    production: {
      user: "ubuntu",
      host: "reina",
      ref: "origin/main",
      repo: "https://github.com/kyleawayan/reina",
      path: "/home/ubuntu/reina",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
    dev: {
      user: "ubuntu", // ok u can't really have a development server and a production server going at the same time, i thought it would just run the dev version if i told it to deploy. well i learned the hard way and it always deployed the main branch and not the "dev" branch and none of my changes applied.
      host: "reina", // so in reality the development server should be somewhere else
      ref: "origin/dev",
      repo: "https://github.com/kyleawayan/reina",
      path: "/home/ubuntu/reinadev",
      "pre-deploy-local": "",
      "post-deploy": "npm install && pm2 reload ecosystem.config.js --env dev",
      "pre-setup": "",
    },
  },
};
