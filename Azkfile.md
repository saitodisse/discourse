# Discourse :: Azkfile.js

## Start azk

#### [Install azk](http://docs.azk.io/en/installation/README.html)

```sh
# easy install
curl -Ls http://azk.io/install.sh | bash
```

#### start all systems

```sh
# easy start
azk start
```

> Attention 1: if you are running for the first time the `azk start` command may take several minutes. This is because it will download all images and provision all systems.

> Attention 2: this is a dev only version. To test production or several instances in cloud use this instructions: https://github.com/discourse/discourse/blob/master/docs/INSTALL-cloud.md

--------------------

### Systems

#### discourse

- main rails web site (http://discourse.dev.azk.io)

#### discourse-sidekiq

- run jobs, like send emails

#### postgres

- database

#### redis

- database

#### mail

- mailcatcher (http://mail.dev.azk.io)

#### deploy

- deploy your app to Digital Ocean

To deploy just add your Digital Ocean token.
Go to https://cloud.digitalocean.com/settings/applications and choose "Generate new token". Then create an `.env` file:

```sh
# this command may take several minutes
$ echo DEPLOY_API_TOKEN=DIGITAL_OCEAN_TOKEN >> .env
```

> do not forget to remove the droplet if are not using anymore to prevent aditional charges.

--------------------

### Use a real SMTP server instead mailcatcher

Just create an `.env` file on root folder:

```sh
DISCOURSE_SMTP_ADDRESS=smtp.mandrillapp.com
DISCOURSE_SMTP_PORT=587
DISCOURSE_SMTP_USER_NAME=xxxss@gmail.com
DISCOURSE_SMTP_PASSWORD=xxxxxxxxxxxxxxxxxxxxxxxxx
```

--------------------

### Other azk commands

#### stop all containers

```sh
$ azk stop
```

#### restart all container

```sh
$ azk restart
```

#### restart and reprovision all container (very usefull)

```sh
$ azk restart -Rvv
```

#### check logs

```sh
$ azk logs
```

#### info on containers

```sh
$ azk info
```

--------------------

----------- ![azk](http://www.azk.io/assets/images/logo-azk-v2.png "azk") -----------

- Official Site
  http://azk.io
- Github
  https://github.com/azukiapp/azk
- Documentation
  http://docs.azk.io
- Troubleshooting
  http://docs.azk.io/en/troubleshooting
- Images directory created by the azk team
  http://images.azk.io

### Contribute to azk

- Star azk on Github
  https://github.com/azukiapp/azk
- Report an issue
  https://github.com/azukiapp/azk/issues/new
- Help solving a reported issue
  https://github.com/azukiapp/azk/issues
- Check out our awesome sponsors
  http://azk.io/#sponsors

### Stay in touch with the azk team

- Sign up the weekly digest
  http://www.azk.io/#newsletter
- Follow the blog
  https://medium.com/azuki-news
- Talk to our support (chat)
  https://gitter.im/azukiapp/azk (English) e https://gitter.im/azukiapp/azk/pt (Português)
- Facebook
  https://www.facebook.com/azukiapp
- Twitter
  http://twitter.com/azukiapp
