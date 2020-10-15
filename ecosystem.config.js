module.exports = {
  apps: [
    {
      script: "index.js",
      watch: ".",
    },
    {
      script: "./service-worker/",
      watch: ["./service-worker"],
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
  },
};
