---
layout: post
title: "Three to Go!"
author: Colin Tester
summary: Multiple Go apps from one Digital Ocean droplet with their own domain/sub-domain.
headerImage: three-to-go-header.jpg
---

In planning a project with a need to abstract out some of its operations to separate, self-contained services, it seems sensible to utilise the benefits of containerisation. Sometimes, however, this approach might appear overly complex, particularly for a project that begins its life with fewer demands on technical resources.

With that in mind, I was interested to understand what was involved in setting multiple web-based Go apps running on one server; each operating from their own domain/sub-domain.

My server provider for this exercise is Digital Ocean who provide plenty of content to help with setting up numerous server configurations, and it is from some of their content that I found a solution.

### Introduction

In this post, I assume that a Digital Ocean account and droplet (Linux) has been created along with a non-root user for connecting into the server using a secure shell (ssh). Plus, [nginx](https://en.wikipedia.org/wiki/Nginx) is installed on the droplet and you have your own domain name which can be pointed to the Digital Ocean droplet.

Please see the following Digital Ocean articles on how to prepare for the preceding assumptions.

- [Initial Server Setup with Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
- [How to Set Up SSH Keys on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804)
- [How To Install Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
- [How To Set Up a Host Name with DigitalOcean](https://www.digitalocean.com/docs/networking/dns/)

I intend to run three separate Go apps and make them accessible from their own domain; one from the main domain, and the remaining two from sub-domains:

1. First app – example.com
2. Second app – second.example.com
3. Third app – third.example.com

### Local development environment

Let's set up the local working space. In a terminal window navigate to your working space and create a new project folder.

{% highlight cli %}
$ mkdir three-to-go && cd three-to-go
{% endhighlight %}

Let's create the First simple Go app file within its own folder.

{% highlight cli %}
$ mkdir -p src/first && touch src/first/main.go
{% endhighlight %}

Open the main.go file in a code editor and save into it the following code:

{% highlight go %}
package main

import (
  "fmt"
  "net/http"
)

func main() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

    // http response text:
    fmt.Fprintf(w, "Hello from the [ First ] Go app.")
  })
  
  http.ListenAndServe(":9991", nil)
}
{% endhighlight %}

Each of the three Go apps will listen to http requests on a unique port number. The <em>First</em> Go app will listen on port number: <strong>9991</strong>. The <em>Second</em> and <em>Third</em> Go apps will listen on port numbers <strong>9992</strong> and <strong>9993</strong> respectively.

Now, repeat the above steps to create a main.go file and content for the two other Go apps, each within their own folder.

{% highlight cli %}
$ mkdir -p src/second && touch src/second/main.go
$ mkdir -p src/third && touch src/third/main.go
{% endhighlight %}

Open each main.go file and save to it the same code as in the First Go app, changing the http response text and http port number.

For the <em>Second</em> Go app:
{% highlight go %}
package main

import (
  "fmt"
  "net/http"
)

func main() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

    // http response text:
    fmt.Fprintf(w, "Hello from the [ Second ] Go app.")
  })
  
  http.ListenAndServe(":9992", nil)
}
{% endhighlight %}

For the <em>Third</em> Go app:
{% highlight go %}
package main

import (
  "fmt"
  "net/http"
)

func main() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

    // http response text:
    fmt.Fprintf(w, "Hello from the [ Third ] Go app.")
  })
  
  http.ListenAndServe(":9993", nil)
}
{% endhighlight %}

### App binary build and deployment

The plan is to deploy the Go apps to the server as executable binaries, so let's build those first, locally.

Go's compiler facilitates building a binary for many different operating systems and architecture and we can specify those options with the `go build` command.

To build a executable to run on Ubuntu we need to select Linux as the operating system and `amd64` as the architecture. That is done by setting environment variables: `GOOS=linux GOARCH=amd64`.

{% highlight cli %}
$ GOOS=linux GOARCH=amd64 go build -o bin/first/main src/first/main.go
{% endhighlight %}

Using the `-o` flag, sets the output file path and filename of the compiled executable file <em>main</em> into the local <em>bin</em> folder.

Repeat for the other two apps (Second and Third):

{% highlight cli %}
$ GOOS=linux GOARCH=amd64 go build -o bin/second/main src/second/main.go
$ GOOS=linux GOARCH=amd64 go build -o bin/third/main src/third/main.go
{% endhighlight %}

The plan is to store the Go apps within the <em>home</em> folder of the server's non-root user, in a sub-folder labelled: ‘go’.

Open a new terminal window and connect to your server via a secure shell (ssh).

{% highlight cli %}
$ ssh non-root-user@server-ip-address
{% endhighlight %}

Substitute your own non-root user name for the <em>non-root-user</em> part of the ssh string, and substitute your server's IP address for <em>server-ip-address</em>.

When connected, create the folder where the executable binaries will be stored.

{% highlight cli %}
$ mkdir go
{% endhighlight %}

We can now copy the binaries securely to the Digital Ocean server. There are two ways that can be done, using either the <em>scp</em> or <em>rsync</em> command line utility.

Back in the terminal window of the working project folder. Again, substitute your own non-root user name and your server's IP address for those in the following command strings.

{% highlight cli %}
$ scp -r bin/ non-root-user@server-ip-address:/home/non-root-user/go
{% endhighlight %}

Using the `-r` flag to recursively copy folders and files from the local <em>bin</em> folder.

Alternatively, use [<em>rsync</em>](https://rsync.samba.org/) to synchronise the local files with the server – better and faster, particularly if there is a need to push updates to the server later.

{% highlight cli %}
$ rsync -avz -e ssh bin/ non-root-user@server-ip-address:/home/non-root-user/go
{% endhighlight %}

Using flags as `-avz`:

- `-a` Archive mode, recursively: preserving permissions, modification times, symlinks, etc
- `-v` Increase verbosity
- `-z` Compress file data

Plus `-e` specify the remote shell to use.

The <em>rsync</em> command will synchronise all folders and files in the local <em>bin</em> folder over to the <em>go</em> folder we created earlier in the non-root user's <em>home</em> folder on the server.

The executable binaries should now be in the <em>go</em> folder on the server. You can check this by listing, recursively,   the contents of the <em>go</em> folder.

Via the terminal window with the secure shell connection (ssh) to your server:

{% highlight cli %}
$ ls -R go
go:
first  second  third

go/first:
main

go/second:
main

go/third:
main
{% endhighlight %}

### Domain name setup

If you have followed the steps in the article [How To Set Up a Host Name with DigitalOcean](https://www.digitalocean.com/docs/networking/dns/), you should have your own domain name set up on your Digital Ocean account. You will also need to point your domain and sub-domains to the droplet you are using for your Go apps.

Please see [how to manage DNS records](https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/) in the Digital Ocean docs section, where you can set the <em>WILL DIRECT TO</em> option to point your domain/sub-domain to your droplet instance.

### Setup Nginx to serve multiple Go apps

As stated in the [Introduction](2019/three-to-go#introduction), I assume that nginx has been installed onto your droplet. You can check if it is running by visiting the server's IP address in your browser.

{% include figure-element.html picture="nginx-welcome.png" alt="nginx welcome content." dims="520x220" %}

On the server, nginx is to be set up as a [reverse-proxy](https://en.wikipedia.org/wiki/Reverse_proxy) to which a client (browser) will connect. The proxy represents the three apps' individual http server, connecting to them via port-forwarding.

Remember, that each of the three apps, when running, will listen for http requests on a unique port number. So, we need to create an nginx configuration file for each of the apps, defining the domain name and the location of the end server (a Go app) which the proxy represents.

Nginx retains site configuration files in its <em>sites-available</em> folder in which the configuration file for the First Go app will be created.

The Vim text editor will be used to create and edit the configuration file, as it will be installed already for your droplet.

Within the terminal window with the ssh connection to your server, type:

{% highlight cli %}
$ sudo vi /etc/nginx/sites/sites-available/first-app
{% endhighlight %}

As we are logged in as a non-root user, we need to prefix the `vi` command with the special <em>sudo</em> (super user do) unix command to allow our non-root user to have elevated privileges. The command <em>vi</em> opens Vim, creating the file <em>first-app</em> at the path to <em>sites-available</em>.

In Vim, press the ‘i’ key to enter `-- INSERT --` mode and add the following to the file.

{% highlight nginx %}
server {
  server_name example.com www.example.com
  
  location / {
    proxy_pass http://localhost:9991;
  }
}
{% endhighlight %}

In the configuration file, we are specifying a server definition for the domain names we wish to catch, and the location of the end server to which the proxy will pass the requests.

<strong>Note:</strong> the <em>proxy_pass</em> value includes the port number (9991), that being the port number the First Go app is listening on.

Substitute your own domain name for <em>example.com</em>. Note that we have included the <em>www</em> sub-domain in the <em>server_name</em> value, defining that either of the two domain variants are to be captured.

Exit Vim's `-- INSERT --`  mode by pressing the <strong>ESC</strong> key, then save the configuration file by typing <strong>:wq</strong> – the Vim command to write (w) changes to the file and then quit (q).

Now that we have a configuration file for the First Go app, we can create one each – using Vim – for the Second and Third Go apps.

For the Second Go app:

{% highlight cli %}
$ sudo vi /etc/nginx/sites/sites-available/second-app
{% endhighlight %}

Enter the following in Vim's `-- INSERT --` mode (i) …

{% highlight nginx %}
server {
  server_name second.example.com
  
  location / {
    proxy_pass http://localhost:9992;
  }
}
{% endhighlight %}

…then save the file <strong>ESC</strong>, <strong>:wq</strong>

<strong>Note:</strong> that the <em>server_name</em> value is now set with the sub-domain name and the <em>proxy_pass</em> value points to a location using the port number the Second Go app is listening on (9992).

For the Third go app:

{% highlight cli %}
$ sudo vi /etc/nginx/sites/sites-available/third-app
{% endhighlight %}

Enter the following… then save the file.

{% highlight nginx %}
server {
  server_name third.example.com
  
  location / {
    proxy_pass http://localhost:9993;
  }
}
{% endhighlight %}

Now that we have configuration files for each of the three Go apps in nginx's <em>sites-available</em>, we now need to enable each individual site. That is done by creating a [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link) in nginx's <em>sites-enabled</em> folder, linking to each Go app configuration file created in <em>sites-available</em>.

Create a symlink for each of the three Go apps:

{% highlight cli %}
$ sudo ln -s /etc/nginx/sites-available/first-app \
/etc/nginx/sites-enabled/first-app

$ sudo ln -s /etc/nginx/sites-available/second-app \
/etc/nginx/sites-enabled/second-app

$ sudo ln -s /etc/nginx/sites-available/third-app \
/etc/nginx/sites-enabled/third-app
{% endhighlight %}

Check that the symlinks have been created as expected by using the unix <em>list</em> command:

{% highlight cli %}
$ sudo ls -l /etc/nginx/sites-enabled
...
... first-app -> /etc/nginx/sites-available/first-app
... second-app -> /etc/nginx/sites-available/second-app
... third-app -> /etc/nginx/sites-available/third-app
{% endhighlight %}

The `-l` flag will display in long listing format and show how the symlinks are connected, e.g. link_file -> source_file.

To get nginx to read the configuration files, we need to instruct it to reload.

{% highlight cli %}
$ sudo nginx -s reload
{% endhighlight %}

The `-s reload` flag sends a signal to the master process running nginx; telling it to ‘reload’.

As a test, let's run the First Go app executable and see what loads in a browser for the main domain name (example.com).

Run the First Go app (from the server session terminal window).

{% highlight cli %}
$ ./go/first/main
{% endhighlight %}

With the First Go app running, point a browser to the app's domain name, e.g. http://example.com – substitute your own domain name.

In the browser window, the following should be loaded: <strong>Hello from the [ First ] Go app.</strong>

Ok, that should be working ok, so let's stop the First Go app by returning to the server terminal window and pressing the CTRL + C keys. Then, let's also test if the Second and Third apps configurations are running as expected.

Run the Second Go app.

{% highlight cli %}
$ ./go/second/main
{% endhighlight %}

Visit http://second.example.com – substitute your own domain name – in a browser, we should see: <br><strong>Hello from the [ Second ] Go app.</strong>

In the server session terminal window, press CTRL + C to stop the Second Go app, then repeat a test for the Third Go app.

{% highlight cli %}
$ ./go/third/main
{% endhighlight %}

Visit http://third.example.com we should see: <strong>Hello from the [ Third ] Go app.</strong>

Press CTRL + C to stop the Third Go app.

### Automatically run our apps when the server boots

We want to run multiple (three) Go apps and, crucially, we need the apps to run automatically without the need for manual intervention. For that to work we will use the Linux <em>systemd</em> facility.

The [<em>systemd</em> suite](https://en.wikipedia.org/wiki/Systemd) comprises basic building blocks of the Linux system and facilitates a system and service manager from which we will use `.service` files to define system services, and the command utility <em>systemctl</em> to manage those services.

We are going to create three `.service` files, one for each of the three Go apps.

Back in the server session terminal window, use Vim to create the First `.service` file.

{% highlight cli %}
$ sudo vi /lib/systemd/system/first-app.service
{% endhighlight %}

Enter the following into the `.service` file as the minimum to define a service:

{% highlight .service %}
[Unit]
Description=Go app running under example.com

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/home/non-root-user/go/first/main
WorkingDirectory=/home/non-root-user/go/first

[Install]
WantedBy=multi-user.target
{% endhighlight %}

In the `.service` file, the <em>service</em> specifics are defined under the `[Service]` section. Crucial options are:

- Restart – service shall be restarted after it exits or is killed.
- ExecStart – The command to run, points to a Go app.
- WorkingDirectory – The absolute path from where the ExecStart command is to run.

Remember to substitute your own domain name in the <em>Description</em> and non-root user name in the <em>ExecStart</em> and <em>WorkingDirectory</em> paths.

Save the file and repeat for the other two Go apps.

For the Second Go app service…

{% highlight cli %}
$ sudo vi /lib/systemd/system/second-app.service
{% endhighlight %}

{% highlight .service %}
[Unit]
Description=Go app running under second.example.com

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/home/non-root-user/go/second/main
WorkingDirectory=/home/non-root-user/go/second

[Install]
WantedBy=multi-user.target
{% endhighlight %}

… and the Third Go app service…

{% highlight cli %}
$ sudo vi /lib/systemd/system/third-app.service
{% endhighlight %}

{% highlight .service %}
[Unit]
Description=Go app running under third.example.com

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/home/non-root-user/go/third/main
WorkingDirectory=/home/non-root-user/go/third

[Install]
WantedBy=multi-user.target
{% endhighlight %}

Now, we can set each of our three services to start automatically at server boot by <em>enabling</em> them. We use the systemd `systemctl` command to do that.

{% highlight cli %}
$ sudo systemctl enable first-app.service
$ sudo systemctl enable second-app.service
$ sudo systemctl enable third-app.service
{% endhighlight %}

If we want to, we can also get our services, and subsequently our apps, to run now with systemctl:

{% highlight cli %}
$ sudo systemctl start first-app.service
$ sudo systemctl start second-app.service
$ sudo systemctl start third-app.service
{% endhighlight %}

The final test: let's see if the services we've set up, now start automatically after a server reboot:

{% highlight cli %}
$ sudo shutdown -r now
{% endhighlight %}

The above `shutdown` command will instruct the server to `shutdown` and restart `-r`.

After a few moments, reload the three apps via their domain variants in your browser – they should all be running!

### Summary

We have managed to: 

1. Create three Go apps.
2. Deploy executable binaries of each app to a Digital Ocean server.
3. Set up an nginx reverse-proxy to route domain specific traffic to each Go app.
4. Set up system services to make sure the apps start automatically when the server is rebooted.

In the next post I will detail how to serve the Go apps using TLS.



Links to reference articles and tutorials:

- [Initial Server Setup with Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
- [How to Set Up SSH Keys on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804)
- [How To Install Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
- [Nginx documentation](https://nginx.org/en/docs/)
- [How To Set Up a Host Name with DigitalOcean](https://www.digitalocean.com/docs/networking/dns/)
- [How To Use Systemctl to Manage Systemd Services and Units](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units)
