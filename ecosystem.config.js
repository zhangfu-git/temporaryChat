module.exports = {
  apps : [

    // First application
    {
      name      : 'chat',
      script    : 'app.js',
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production'
      },
      port: '3000',
      "log_date_format" : "YYYY-MM-DD HH:mm Z",
      "log_file"  : "/var/log/pm2/chat.log",
      "error_file": "/var/log/pm2/chat.log",
      "out_file"  : "/var/log/pm2/chat.log"
    }
  ]
};
