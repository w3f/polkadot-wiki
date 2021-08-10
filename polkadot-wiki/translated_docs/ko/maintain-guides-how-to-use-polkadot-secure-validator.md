---
id: maintain-guides-how-to-use-polkadot-secure-validator
title: How to use Polkadot Secure Validator Setup
sidebar_label: How to use Polkadot Secure Validator Setup
---

The following guide will walk you through using [polkadot secure validator](https://github.com/w3f/polkadot-secure-validator) to deploy your validator in a secure way. It will work for Kusama (and later Polkadot) out of the box, and if you're using another Substrate-based chain, should work with some tweaking. We assume you will be deploying on Kusama.

It uses Terraform for defining and managing your infrastructure. Ansible, an automation tool, is used for setting up the VPN, Firewall, and the validator node. It supports a few different cloud providers such as AWS, Microsoft Azure, GCP, and Packet. The code is publicly hosted on GitHub, so please file an [issue](https://github.com/w3f/polkadot-secure-validator/issues) if you would like to make a feature request or report a bug.

## Dependencies

The next step is to install the software dependencies for running the secure validator scripts. We will need to acquire NodeJS, Yarn, Terraform, and Ansible. Usually these are readily available using your operating system's package manager. Instructions may vary depending on which system you are on, the instructions below demonstrate the commands for a user of a Debian or Ubuntu based system.

### NodeJS

We recommend using [nvm](https://github.com/nvm-sh/nvm) as a tool to manage different NodeJS versions across projects.

```
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install nodejs
node -v  (Check your node version)
```

### Yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```

### Terraform

```
sudo apt-get install unzip
wget https://releases.hashicorp.com/terraform/0.12.16/terraform_0.12.16_linux_amd64.zip
unzip terraform_0.12.16_linux_amd64.zip
sudo mv terraform /usr/local/bin/
terraform --version  (Check whether it is configured properly)
```

### Ansible

```
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible -y
sudo apt-get install python -y
```

## Deployment

### Step One: Clone the repository

The first step is to clone the `polkadot-secure-validator` guide locally.

```zsh
$ git clone git@github.com:w3f/polkadot-secure-validator.git
```

Now you can `cd` into the `polkadot-secure-validator` directory and start to change the configurations to match your custom deployment. However, before we start tweaking those, let's start by creating two new SSH keys that we (or rather, the ansible playbooks) will use to access the machines.

### Step Two: Generate the SSH keys

We will use [SSH](https://en.wikipedia.org/wiki/Secure_Shell), a remote shell tool, to access our validator and public sentry nodes. You will first use the `ssh-keygen` command to generate two keys, one for your validator and one for the sentry nodes.

```zsh
$ ssh-keygen -m pem -f id_rsa_validator
$ ssh-keygen -m pem -f id_rsa_public
```

Be sure to add these keys to your SSH agent. First make sure your SSH agent is evaluated, then add the keys to them.

```zsh
$ eval $(ssh-agent)
$ ssh-add id_rsa_validator
$ ssh-add id_rsa_public
```

For this tutorial we will not set a passphrase for the SSH key, although usually that would be recommended.

### Configuration

After you have installed all the required software and made your ssh keys, you can start to configure your infrastructure deployment by following the instructions. Start by cloning the `polkadot-secure-validator` repository locally, and installing the package dependencies. Then customize the configuration how you want it.

First run yarn to install the NodeJS dependencies:

```zsh
$ yarn
```

Now you can copy the configuration sample and start to cutomize it.

```zsh
$ cp config/main.sample.json config/main.json
# now you should customize config/main.json
```

Under `validators` and `publicNodes`, specify which cloud provider you want to use, the type of machine specification, the number of validators you are going to deploy, the machine location, and the user to use for SSH.

#### Getting the authorization keys

The secure validator set up supports Google Cloud, AWS, Microsoft Azure, and Packet. For this tutorial we will be using Google Cloud.

##### Log in to the Google Cloud console

You will need to log in to the google cloud console in order to access your authorization keys.

In the IAM&Admin panel you will navigate to service accounts. Download JSON for service account key.

Make sure to also auth into your account like so:

```zsh
$ gcloud auth login
```

And don't forget to enable the compute engine!

#### Configuration Options

The other options can be mostly self explanatory. Here's some tips on what they are and how you can use them:

In the `additionalFlags` option, configure any of the additional flags you want to run for your validator. If you want to run with a specific name, this is where you would enter it.

Under the `polkadotBinary.url` field you can provide the release that is hosted in the [W3F repository](https://github.com/w3f/polkadot/releases) or use an alternate one that you build and publish yourself.

By enabling the `nodeExporter`, Ansible will install and configure the [node_exporter](https://github.com/prometheus/node_exporter), which will expose hardware-level metrics of your node in a format compatible with Prometheus.

The field `machineType:` will configure the machine's hardware specifications, check [here](https://cloud.google.com/compute/docs/machine-types) for the configuration options for GCP. The other hosting providers should have similar pages in their documentation.

Under `provider` the option are `gcp` (Google Cloud Provider), `aws` (AWS), `azure` (Microsoft Azure) and `packet` for Packet.

The field `count` is the number of instances you would like to create.

The `location` and `zone` fields are for the location of the machine, for GCP check [here](https://cloud.google.com/compute/docs/regions-zones/), other cloud providers will have similar documentation.

The `telemetryUrl` field will send your node's information to a specific telemetry server. You could send all your nodes' data (e.g. IP address) to the public endpoint, but it is highly recommended that that you set up your own telemetry server to protect your validator’s data from being exposed to the public. If you want to do that, see [substrate telemetry source](https://github.com/paritytech/substrate-telemetry).

> NOTE: If you decided to send your node’s information to public telemetry, the name for your validator and public node that is displayed on the telemetry would look something like `PROJECT_NAME-sv-public-0` / `PROJECT_NAME-sv-validator-0`.

Configure `projectId` to be the name of the project you want to use in GCP.

Configure `sshUser` to be the user that manages your machine.

For different cloud providers, you need to set the corresponding credentials as environment variables, for example, on GCP you only need to set `GOOGLE_APPLICATION_CREDENTIALS`. This variable is the path to the JSON file containing the credentials of the service account you wish to use; this service account needs to have write access to compute and network resources if you use GCP. For others, you can check that by referring to the [README](https://github.com/w3f/polkadot-secure-validator#prerequisites).

Besides that, you need two additional environment variables that will allow Ansible to connect to the created machines. These values of these variables will be the keys that you generated at the beginning of the guide.

> `SSH_ID_RSA_PUBLIC` - Path to private SSH key you want to use for the public nodes.

> `SSH_ID_RSA_VALIDATOR` - Path to private SSH key you want to use for the validator.

> NOTE: You will need to configure the Compute Engine API and enable billing on your GCP accounts to properly run these scripts.

After everything is configured properly, you can start to run the deployment with:

```zsh
$ scripts/deploy.sh
```

> NOTE: Certain steps of the process may hang, however the scripts are idempotent so you simply need to re-run them and

When the deployment and configuration is completed, you should see some output that looks like what's below. You are able to find the validator’s session keys by searching for "show rotateKeys output".

```
TASK [polkadot-validator-session-info : retrieve session info] *****************

ok: [34.80.70.172]


PLAY RECAP *********************************************************************

34.80.224.231              : ok=41   changed=1    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0

34.80.70.172               : ok=49   changed=1    unreachable=0    failed=0    skipped=14   rescued=0    ignored=0

35.189.183.66              : ok=41   changed=1    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0

Done
Done in 131.85s.
```

Also you can use `sshUser` to access one of the created instances that shows above.

```
TASK [polkadot-validator : show rotateKeys output] *****************************

ok: [34.80.70.172] => {
    "rotate_keys": {
        "changed": false,
        "connection": "close",
        "content_length": "295",
        "content_type": "application/json; charset=utf-8",
        "cookies": {},
        "cookies_string": "",
        "date": "Sun, 24 Nov 2019 12:13:42 GMT",
        "elapsed": 0,
        "failed": false,
        "json": {
            "id": 1,
            "jsonrpc": "2.0",
            "result": "0xf126b68841f51988b37780fa5b224b2aa86888a8d3962a63595dbc4d85baac2dee7c9900c8ddfad1991a8884e58273f06d5c1dbfc3dc6000c037185ccead9d692a3b3396cdd7e2def520682d65ad7e8ca234fb17630b428752e6150462998b4362a2b7e201657c8084ae8215bd142458ccd69506d08b18925dc897fb95f54249"
        },
        "msg": "OK (295 bytes)",
        "redirected": false,
        "status": 200,
        "url": "http://localhost:9933"
    }
}
```

The result "0xf126b68841f5…..95f54249" is your session key. Set this to your controller account in [polkadot-js Apps](https://polkadot.js.org/apps/#/staking/actions).

After accessing one of the machines through SSH, you can keep track of the node’s status by running `journalctl --follow -u polkadot`, which will show the latest synced block information.

Every time you change something in `main.json`, you can simply run `./scripts/deploy.sh` to update it.

Congratulations! You have successfully deployed a secure validator. Free feel to open an issue if you have any suggestions.
