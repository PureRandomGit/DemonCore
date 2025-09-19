# Server Security Guide: Securing a Dorm Server with iptables and Tailscale

## Introduction
- Importance of securing a dorm server.
- Overview of iptables and Tailscale as security tools.

## Understanding iptables
### What is iptables?
- Explanation of iptables as a firewall utility.
- Role of iptables in network security.

### Basic Concepts
- Chains (INPUT, OUTPUT, FORWARD).
- Tables (filter, nat, mangle).
- Rules and Targets (ACCEPT, DROP, REJECT).

## Step-by-Step iptables Guide
### Step 1: Setting Default Policies
- Explanation of default policies.
- Command Example:
  ```bash
  iptables -P INPUT DROP
  iptables -P FORWARD DROP
  iptables -P OUTPUT ACCEPT
  ```

### Step 2: Allowing Established Connections
- Importance of allowing established connections.
- Command Example:
  ```bash
  iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
  ```

### Step 3: Allowing SSH Access
- Explanation of SSH and its importance for management.
- Command Example:
  ```bash
  iptables -A INPUT -p tcp --dport 22 -j ACCEPT
  ```

### Step 4: Allowing Tailscale Traffic
- Overview of Tailscale and its purpose.
- Command Example:
  ```bash
  iptables -A INPUT -p tcp --dport 41641 -j ACCEPT
  ```

### Step 5: Testing and Saving iptables Rules
- Importance of testing and saving rules.
- Commands to save rules:
  ```bash
  iptables-save > /etc/iptables/rules.v4
  ```

## Safety Measures to Avoid Lockout
- Recommendations for avoiding accidental lockouts.
- Using a secondary access method.
- Setting a timeout for rules.

## Testing Procedures
### Step 1: Verifying Active Rules
- Command to list current iptables rules:
  ```bash
  iptables -L -v
  ```

### Step 2: Testing Connectivity
- Methods to test connectivity (ping, SSH).

## Conclusion
- Recap of the importance of securing servers.
- Encouragement to regularly review and update security measures.