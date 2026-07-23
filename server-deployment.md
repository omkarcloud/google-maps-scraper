Here is guide to deploy the Google Maps Extractor on AWS EC2, although same can work on any cloud provider like Google Cloud, Azure, or DigitalOcean. Just Ensure the VM has Debian/Ubuntu-based OS.

### How to deploy on AWS EC2?

### 1. Reserve a Static IP Address

First, we'll reserve an Elastic IP address. An Elastic IP ensures your EC2 instance is always reachable at the same IP address.

1. Create an [AWS Account](https://signin.aws.amazon.com/signup?request_type=register) if you don't already have one.
   ![AWS-signup](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/aws-signup.png)

2. Go to the [Elastic IP addresses](https://console.aws.amazon.com/ec2/home?#Addresses:) page.
   ![Elastic IP addresses page](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/aws-elastic-ip-addresses-page.png)

3. Click the "Allocate Elastic IP address" button.
   ![Allocate Elastic IP address button](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/aws-allocate-elastic-ip-address-button.png)

4. Keep the default settings and click "Allocate"
   ![Allocate Elastic IP address dialog](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/aws-allocate-elastic-ip-address-dialog.png)

This creates an Elastic IP address that you'll use to access your app. You will assign this IP to your EC2 instance in the next step.

   
### 2. Create an AWS EC2 Instance

1. Go to the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home#Instances:) and click "Launch Instance"
![Launch Instance button](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/aws-launch-instance-button.png)

2. Configure your instance with these recommended settings. You may change the Machine Type and Boot Disk Size based on your scraping needs:

   *   **Name and tags**
       *   **Name:** `gmaps`
   *   **Application and OS Images (AMI)**
       *   **Amazon Machine Image (AMI):** `Ubuntu Server 24.04 LTS`
       *   *Note: A `.deb` installer requires a Debian-based OS like Ubuntu.*
   *   **Instance type**
       *   **Instance type:** `t3.medium`
       *   *Note: 2 vCPU, 4 GB memory. Change based on needs.*
   *   **Key pair (login)**
       *   **Key pair name:** `Create new key pair > RSA (.pem)`
       *   *Note: Required for SSH access.*
   *   **Network settings**
       *   **Allow SSH traffic from:** ✓
       *   *Note: Required for terminal access.*
       *   **Allow HTTP traffic from the internet:** ✓
       *   *Note: Required for accessing API via HTTP.*
       *   **Allow HTTPS traffic from the internet:** ✓
       *   *Note: Required for accessing API via HTTPS.*
   *   **Configure storage**
       *   **Storage:** `80 GiB - Magnetic`
       *   *Note: **Magnetic** is the cheapest disk type.*

   ![deploy-vm](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/deploy-vm-ec2.gif)

3. If you're scraping data for your own needs, enable Spot Instances as they are 70-90% cheaper than On-Demand instances. Enable them with these settings:

   *   **Advanced details**
       *   **Purchasing option:** `Spot Instances`
       *   *Note: Enables Spot Instances.*
   *   **Customize Spot instance options**
       *   **Request type:** `Persistent`
       *   **Interruption behavior:** `Stop`

**Don't use Spot VMs for customer-facing APIs or mission-critical applications, as they can be stopped by AWS at any time if the resources are needed elsewhere.**


4. Click **Launch instance**.

5. Now, associate the Elastic IP:
   - Go to [Elastic IPs](https://console.aws.amazon.com/ec2/v2/home#Addresses:)
   - Select your previously created Elastic IP
   - Click **Actions** > **Associate Elastic IP address**
   - Select your newly created instance and click **Associate**

   ![Associate Elastic IP](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/aws-associate-elastic-ip.gif)

6. Connect to your instance via SSH:
   - Go to [EC2 Instances](https://console.aws.amazon.com/ec2/v2/home#Instances:)
   - Select your instance
   - Click **Connect** > **EC2 Instance Connect**
   - Click the **Connect** button

   ![AWS SSH Connect](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/aws-ssh-connect.gif)


### 3. Installing Your Desktop App

Now that your EC2 instance is ready, let's install your Botasaurus Desktop API.

1. First, install the necessary packages on your instance by running the command below. This script installs Botasaurus CLI and the Apache web server to manage requests to your app.

   ```bash
   curl -sL https://raw.githubusercontent.com/omkarcloud/botasaurus/master/vm-scripts/install-bota-desktop.sh | bash
   ```
   ![Install scraper](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/install-packages-ec2.gif)

2. Next, install the desktop application on the EC2 instance.

   To get your `AUTH_TOKEN`, sign up for a free account at [omkar.cloud](https://www.omkar.cloud) and visit [this page](https://www.omkar.cloud/tools/google-maps-extractor/about) and see the "What is my auth token?" FAQ, which gives you your auth token. Once you have your auth token, replace `AUTH_TOKEN` with your actual token in the command below.

   ```bash
   python3 -m bota install-desktop-app --debian-installer-url python3 -m bota install-desktop-app --debian-installer-url https://www.omkar.cloud/l/deb --custom-args "--auth-token AUTH_TOKEN"
   ```

   ![Install scraper](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/install-desktop-scraper-ec2.gif)


When the installation completes, you'll see a **link** to your API documentation. Visit it see the api.

![vm-success](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/vm-success-ec2.png)

### How to Delete the EC2 Instance and Avoid Incurring Further Charges?

:::warning[Backup Your Data]
Before deleting the instance, download any important data to avoid permanent loss.
:::

To prevent ongoing costs, you must delete both the EC2 instance and release the Elastic IP address as follows:

1. **Cancel the Spot Request** *(Spot VMs only)*
   If you have enabled Spot Instances, cancel the Spot request before deleting the instance. Otherwise, they will keep respawning, again and again. To cancel the Spot request:

   - Go to [Spot Requests](https://console.aws.amazon.com/ec2/v2/home#SpotInstances:)
   - Select your Spot request
   - Click **Actions** > **Cancel request**
   - Click **Confirm** to cancel

   ![Cancel Spot Request](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/cancel-spot-request-ec2.gif)

2. **Terminate the EC2 Instance**

   - Go to [EC2 Instances](https://console.aws.amazon.com/ec2/v2/home#Instances:)
   - Select your instance
   - Click **Instance state** > **Terminate (delete) instance**
   - Click **Terminate (delete)** to confirm

   ![Delete VM](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/delete-vm-ec2.gif)

3. **Release the Elastic IP Address**

   - Go to [Elastic IPs](https://console.aws.amazon.com/ec2/v2/home#Addresses:)
   - Select your Elastic IP
   - Click **Actions** > **Release Elastic IP address**
   - Click **Release** to confirm

   ![Delete IP](https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/aws/delete-ip-ec2.gif)

That's it! You have successfully deleted the EC2 instance and released the Elastic IP. You will not incur any further charges.

### How to add Domain Name and SSL to Api?   
Please follow the steps mentioned in this [guide](https://www.omkar.cloud/botasaurus/docs/botasaurus-desktop/botasaurus-desktop-api/adding-domain-and-ssl).
