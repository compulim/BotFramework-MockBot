import { TurnContext } from 'botbuilder-core';

const name = 'Citation';
const help = () => ({
  citation: 'Show a Markdown message with citations'
});

async function processor(context: TurnContext) {
  await context.sendActivity({
    type: 'message',
    text: `Sure, you should override the default proxy settings[1]\u200B[2], when your proxy server requires authentication[3].

[1]: https://support.microsoft.com/en-us/windows/use-a-proxy-server-in-windows-03096c53-0554-4ffe-b6ab-8b1deee8dae1 "Use a proxy server in Windows"
[2]: https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-proxy-server-settings "Configure proxy server settings - Windows Server"
[3]: cite:1 "Introduction Configuring proxy settings is a fundamental aspect..."
[4]: cite:2 "This citation has no name"
`,
    entities: [
      {
        '@context': 'https://schema.org',
        '@id':
          'https://support.microsoft.com/en-us/windows/use-a-proxy-server-in-windows-03096c53-0554-4ffe-b6ab-8b1deee8dae1',
        '@type': 'Claim',
        type: 'https://schema.org/Claim',

        claimInterpreter: {
          '@type': 'Project',
          slogan: 'Surfaced with Azure OpenAI'
        },
        name: 'Use a proxy server in Windows'
      },
      {
        '@context': 'https://schema.org',
        '@id':
          'https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-proxy-server-settings',
        '@type': 'Claim',
        type: 'https://schema.org/Claim',

        claimInterpreter: {
          '@type': 'Project',
          slogan: 'Surfaced with Azure OpenAI'
        },
        name: 'Configure proxy server settings - Windows Server'
      },
      {
        '@context': 'https://schema.org',
        '@id': 'cite:1',
        '@type': 'Claim',
        claimInterpreter: {
          '@type': 'Project',
          slogan: 'Surfaced with Azure OpenAI'
        },
        type: 'https://schema.org/Claim',

        name: 'Introduction Configuring proxy settings is a fundamental aspect...',
        text: `Aute Lorem id laboris Lorem do dolor mollit. Officia dolore dolor do culpa nostrud velit officia magna ut aute pariatur excepteur ut cupidatat. Minim minim sunt enim pariatur incididunt eiusmod esse adipisicing do do nulla consequat minim. Exercitation enim adipisicing esse non pariatur duis deserunt eu magna enim amet irure veniam. Minim labore aliquip velit exercitation Lorem exercitation minim excepteur.

## Introduction

*Configuring* **proxy** _settings_ __is__ a fundamental aspect of \`network\` and [system administration](http://example.com). Proxies serve as intermediaries between a user's device and the internet, providing various benefits such as improved security, anonymity, and network performance. In this guide, we will delve into the intricacies of configuring Proxy Auto-Discovery (PAD) proxy settings. We'll explore what PAD is, why it's essential, and how to configure it effectively. []
> This is a block quote!

1. first
1. second
1. third

- unordered A
- unordered B
- unordered C

***

## Understanding Proxy Auto-Discovery (PAD)

Proxy Auto-Discovery, often abbreviated as PAD, is a mechanism that simplifies the process of configuring proxy settings for network-connected devices. Its primary purpose is to automate the discovery of proxy servers and settings without manual intervention. PAD relies on a specific protocol called Web Proxy Auto-Discovery (WPAD).

## The Importance of Configuring PAD Proxy Settings

Configuring PAD proxy settings is crucial for several reasons:

- Efficiency: PAD eliminates the need for users or administrators to manually configure proxy settings on individual devices. This automation saves time and reduces the risk of configuration errors.
- Scalability: In large organizations with numerous devices, configuring proxies manually can be a daunting task. PAD simplifies this process, making it manageable even in complex network environments.
- Consistency: Automated configuration ensures that all devices in the network use consistent proxy settings, reducing potential discrepancies and ensuring uniform security measures.
- Security: Properly configured proxy settings can enhance network security by filtering and monitoring traffic, blocking malicious websites, and protecting against threats like malware and phishing.
- Anonymity: For users who require anonymity when browsing, PAD can route traffic through anonymous proxies, safeguarding their identity online.

## Configuring PAD Proxy Settings

Now, let's delve into the steps to configure PAD proxy settings effectively:

- Identify Your Proxy Server: Before configuring PAD, you need to identify the proxy server(s) you want to use. This could be an in-house proxy server or a third-party service.
- Ensure WPAD Support: Verify that your network environment supports the Web Proxy Auto-Discovery (WPAD) protocol. This typically involves setting up a WPAD server or ensuring that your existing DHCP and DNS servers can provide WPAD information.
- Create a PAC File: A PAC (Proxy Auto-Configuration) file contains instructions for the device to determine when and how to use the proxy server. You can create a PAC file using a text editor, and it should be hosted on a web server accessible to all devices in your network.
- Configure DHCP: If your network uses DHCP (Dynamic Host Configuration Protocol), you can configure it to provide the URL of the PAC file to client devices. This simplifies the configuration process as devices will automatically fetch the PAC file.
- Configure DNS: Similarly, DNS (Domain Name System) can be configured to resolve the WPAD host (e.g., wpad.yourdomain.com) to the location of the PAC file. This allows devices to locate the PAC file without manual intervention.
- Test Configuration: After configuring DHCP and DNS, it's essential to test the configuration to ensure that devices can access the PAC file correctly. You can do this by attempting to access the PAC file URL from a client device's web browser.
- Configure Devices: For devices that do not support DHCP or WPAD, you may need to configure proxy settings manually. This typically involves entering the PAC file URL or specifying the proxy server address and port in the device's settings.
- Monitor and Maintain: Regularly monitor your proxy configuration to ensure that it continues to function correctly. Update the PAC file as needed to reflect changes in your network or proxy server settings.

## Common Challenges and Troubleshooting

While configuring PAD proxy settings, you may encounter some common challenges:

- Firewall Issues: Ensure that your network's firewall rules permit traffic to and from the PAC file server and proxy server(s).
- DNS Resolution Problems: Verify that DNS is correctly configured to resolve the WPAD host to the PAC file's location.
- PAC File Errors: Carefully review the PAC file for syntax errors or incorrect instructions that could disrupt the proxy configuration.
- Device Compatibility: Some devices may not fully support WPAD, requiring manual configuration. Be prepared to address these exceptions.
- Security Concerns: Maintain robust security measures to prevent unauthorized access to your PAC file or proxy servers.

## Conclusion

Configuring Proxy Auto-Discovery (PAD) proxy settings is a vital task for network administrators seeking to streamline the proxy configuration process and enhance network security. By automating the discovery and configuration of proxy servers, PAD ensures efficiency, consistency, and scalability in network environments. However, it is essential to follow the recommended steps carefully and be prepared to troubleshoot common challenges to maintain a smooth proxy configuration process. Ultimately, a well-configured PAD proxy setup contributes to a more secure, efficient, and user-friendly network environment.
`
      },
      {
        '@context': 'https://schema.org',
        '@id': 'cite:2',
        '@type': 'Claim',
        claimInterpreter: {
          '@type': 'Project',
          slogan: 'Surfaced with Azure OpenAI'
        },
        type: 'https://schema.org/Claim',

        name: 'This citation has no name',
        text: 'Here is some plain text without any Markdown formatting in it.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'VoteAction',
        type: 'https://schema.org/VoteAction',

        actionOption: 'upvote'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'VoteAction',
        type: 'https://schema.org/VoteAction',

        actionOption: 'downvote'
      }
    ]
  });
}

export { help, name, processor };
