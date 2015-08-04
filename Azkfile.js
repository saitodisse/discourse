/* globals systems path sync persistent */
/*eslint camelcase: [2, {properties: "never"}]*/

/**
 * discourse
 */

systems({

  /////////////////////////////////////////////////
  /// discourse
  /// ----------------------
  /// ruby 2.0
  /////////////////////////////////////////////////
  discourse: {
    depends: ["postgres", "redis", "mail"],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/ruby:2.0"},
    // Steps to execute before running instances
    provision: [
      "bundle install --path /azk/bundler",
      "bundle exec rake db:migrate"
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    command: "rm /azk/discourse/tmp/pids/server.pid; bundle exec rails s",
    wait: 20,
    mounts: {
      "/azk/#{manifest.dir}": sync("."),
      "/azk/bundler": persistent("#{manifest.dir}/bundler"),
      "/azk/#{manifest.dir}/tmp": persistent("#{manifest.dir}/tmp"),
      "/azk/#{manifest.dir}/log": path("#{manifest.dir}/log"),
      "/azk/#{manifest.dir}/.bundle": path("#{manifest.dir}/.bundle")
    },
    scalable: {"default": 1},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    ports: {
      // exports global variables
      http: "3000/tcp"
    },
    envs: {
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it"s also the same
      // if you"re setting it in a .env file
      RUBY_ENV: "development",
      BUNDLE_APP_CONFIG: "/azk/bundler",
      DISCOURSE_DEVELOPER_EMAILS: "admin@example.com",
      DISCOURSE_HOSTNAME: "#{system.name}.#{azk.default_domain}"
    }
  },

  /////////////////////////////////////////////////
  /// discourse-sidekiq
  /// ----------------------
  /// sidekiq worker
  /////////////////////////////////////////////////
  "discourse-sidekiq": {
    extends: "discourse",
    scalable: { default: 1, limit: 1 },
    http: null,
    ports: null,
    wait: undefined,
    command: "bundle exec sidekiq -c 3 -v"
  },

  /////////////////////////////////////////////////
  /// postgres
  /// ----------------------
  /// postgres:9.3
  /////////////////////////////////////////////////
  postgres: {
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/postgres:9.3"},
    shell: "/bin/bash",
    wait: 20,
    mounts: {
      "/var/lib/postgresql/data": persistent("postgresql"),
      "/var/log/postgresql": path("./log/postgresql")
    },
    ports: {
      // exports global variables
      data: "5432/tcp"
    },
    envs: {
      // set instances variables
      POSTGRESQL_USER: "azk",
      POSTGRESQL_PASS: "azk",
      POSTGRESQL_DB: "postgres_development"
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: "postgres://#{envs.POSTGRESQL_USER}:#{envs.POSTGRESQL_PASS}@#{net.host}:#{net.port.data}/${envs.POSTGRESQL_DB}"
    }
  },

  /////////////////////////////////////////////////
  /// redis
  /// ----------------------
  /// database
  /////////////////////////////////////////////////
  redis: {
    image: {"docker": "redis"},
    ports: {
      // exports global variables
      data: "6379/tcp"
    },
    export_envs: {
      "REDIS_HOST": "#{net.host}",
      "REDIS_PORT": "#{net.port.data}",
      "REDIS_URL": "redis://#{net.host}:#{net.port.data}",
      "OPENREDIS_URL": "redis://#{net.host}:#{net.port.data}",
      "DISCOURSE_REDIS_HOST": "#{net.host}",
      "DISCOURSE_REDIS_PORT": "#{net.port.data}"
    }
  },

  /////////////////////////////////////////////////
  /// mail
  /// ----------------------
  /// mailcatcher
  /////////////////////////////////////////////////
  mail: {
    depends: [],
    image: {"docker": "schickling/mailcatcher"},
    http: {
      domains: [
        "#{system.name}.#{azk.default_domain}"
      ]
    },
    ports: {
      http: "1080/tcp",
      smtp: "1025/tcp"
    },
    export_envs: {
      // exports global variables
      DISCOURSE_SMTP_ADDRESS: "#{net.host}",
      DISCOURSE_SMTP_PORT: "#{net.port.smtp}"
    }
  }

});

/**
 *
 *  ---------------------------------
 *  More about azk
 *  ---------------------------------
 *  + Site
 *      http://azk.io
 *
 *  + Github
 *      https://github.com/azukiapp/azk
 *
 *  + Documentation
 *      http://docs.azk.io
 *
 *  + Images directory created by the azk team
 *      http://images.azk.io
 *
 *
 *  ---------------------------------
 *  Contribute to azk
 *  ---------------------------------
 *  + Star azk on Github
 *      https://github.com/azukiapp/azk
 *
 *  + Report an issue
 *      https://github.com/azukiapp/azk/issues/new
 *
 *  + Help solving a reported issue
 *      https://github.com/azukiapp/azk/issues
 *
 *  + Check out our awesome sponsors
 *      http://azk.io/#sponsors
 *
 *
 *  ---------------------------------
 *  Stay in touch with the azk team
 *  ---------------------------------
 *  + Sign up the weekly digest
 *      http://www.azk.io/#newsletter
 *
 *  + Follow the blog
 *      https://medium.com/azuki-news
 *
 *  + Talk to our support (chat)
 *      https://gitter.im/azukiapp/azk (English) ehttps://gitter.im/azukiapp/azk/pt (Português)
 *
 *  + Facebook
 *      https://www.facebook.com/azukiapp
 *
 *  + Twitter
 *      http://twitter.com/azukiapp
 *
 */
