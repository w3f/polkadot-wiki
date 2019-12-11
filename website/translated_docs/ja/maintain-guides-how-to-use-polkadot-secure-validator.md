---
id: maintain-guides-how-to-use-polkadot-secure-validator
title: How to use Polkadot Secure Validator Setup
sidebar_label: How to use Polkadot Secure Validator Setup
---

This guide will walk you through how to use [polkadot secure validator](https://github.com/w3f/polkadot-secure-validator) to deploy your validator in a secure way and run a Kusama validator. It uses Terraform for defining and managing your infrastructure, while Ansible is a automation tool that is used for setting up the VPN, Firewall, Validator, etc.. It supports multiple cloud providers such as AWS, Microsoft Azure, Google GCP and Packet. You can create an [issue](https://github.com/w3f/polkadot-secure-validator/issues) if you do not find a cloud provider that you want to use. We will use GCP to show as an example.


## Prerequisites
Since we will use ssh to access validator and public nodes, execute the command that shows as below to generate two keys (one for validator, another for public nodes) first.

```
ssh-keygen
```
- You may want to change the filename to something different than the default (ex. `id_rsa_validator` or `id_rsa_public_node`).
- For the sake of the tutorial we will not set a password for the SSH key, although usually it's recommended.

Also you need to install the following applications:

- NodeJS (recommend to use [nvm](https://github.com/nvm-sh/nvm)).

```
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install nodejs
node -v  (Check your node version)
```
- Yarn
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```
- Terraform
```
sudo apt-get install unzip
wget https://releases.hashicorp.com/terraform/0.12.16/terraform_0.12.16_linux_amd64.zip
unzip terraform_0.12.16_linux_amd64.zip
sudo mv terraform /usr/local/bin/
terraform --version  (Check whether it is configured properly)
```
- Ansible
```
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible -y
sudo apt-get install python -y
```

## Configuration

After you have installed all the required software, you can start to configure your infrastucture deploymenet by following the instructions:

```
git clone https://github.com/w3f/polkadot-secure-validator
cd secure-validator
yarn
cp config/main.sample.json config/main.json
# now you should customize config/main.json
```

Under `validators` and `publicNodes`, specify which cloud provider you are going to use, which type of machine spec, the number of validators you would like to deploy and machine location, etc..

`polkadotBinary=>url` - Polkadot binary under the [w3f repo](https://github.com/w3f/polkadot/releases).

`nodeExporter` - If defined Ansible will install and configure [node_exporter](https://github.com/prometheus/node_exporter) which will expose hardware-level metrics of your node in a format compatible with Prometheus.

`machineType:` - Machine's hardware spec, check this via https://cloud.google.com/compute/docs/machine-types.

`provider` - gcp = Google Cloud, aws = AWS, azure = Microsoft and packet.

`count` - The number of instnaces you would like to create.

`location` & `zone` - Machine location, for GCP check this via https://cloud.google.com/compute/docs/regions-zones/.

`telemetryUrl` - Send your nodes information to the specific telemetry server. You could send all your nodes data (e.g. IP address) to the public endpoint (that is, wss://telemetry.polkadot.io/submit/) but it is highly recommended that setting up your own telemetry server to protect your validator’s data from being exposed to the public. If you want to do that, check [substrate telemetry source](https://github.com/paritytech/substrate-telemetry) out.

*If you decided to send your node’s information to the public telemetry, the name for your validator and public node that shows on the telemetry would look something like `PROJECT_NAME-sv-public-0` / `PROJECT_NAME-sv-validator-0`.

`projectId` - The name of the project you want to use in the GCP.

`sshUser` - An user to manage your machine.

For different cloud providers, you need to set the corresponding credentials as environment variable, for example, you only need to set `GOOGLE_APPLICATION_CREDENTIALS`. This is the path to the JSON file containing the credentials of the service account you wish to use; this service account needs to have write access to compute and network resources if you use GCP. For others, you can check that by referring to the [README](https://github.com/w3f/polkadot-secure-validator#prerequisites).

Besides that, you need two additional environment variables to allow Ansible to connect to the created machines (The ones you generated in the beginning):

```
SSH_ID_RSA_PUBLIC - Path to private SSH key you want to use for the public nodes.

SSH_ID_RSA_VALIDATOR - Path to private SSH key you want to use for the validators.

```

After everything is configured properly, you can start to run the deployment with:

```
scripts/deploy.sh
```

When the deplyoment and configuration is completed, you should see something like below and find the validator’s session keys by searching for "show rotateKeys output".

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

The result "0xf126b68841f5…..95f54249" is your session key. Set this to your controller account in the [polkadot-js Apps](https://polkadot.js.org/apps/#/staking/actions).

After accessing one of the machines through SSH, you can keep track of the node’s status by running `journalctl --follow -u polkadot` which will shows the latest synced block information.

Moreover, every time you changed something in `main.json`, you can simply run `./scripts/deploy.sh` to update it.

Congratulations! You have successfully deployed a secure validation with best practices in place. We will keep update this repo to make sure that is stay up to date. Free feel to open an issue if you have any suggestions.
