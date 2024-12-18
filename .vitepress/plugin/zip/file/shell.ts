import * as path from 'node:path';
import { SelfExtractionConfiguration } from '../manifest';

/**
 * Creates the shell script for the given zipUrl and the given configuration.
 *
 * @param zipUrl the url where the zip file can be downloaded at
 * @param config the configuration of the shell script
 * @returns the contents of the shell script (which use utf8 characters!)
 */
export function createShellScript(
    zipUrl: URL,
    { post_user_commands }: SelfExtractionConfiguration,
): string {
    const folderName = path.basename(zipUrl.pathname, '.zip');

    const postUserCommands =
        post_user_commands.length > 0
            ? `

# Display further instructions
echo -e "\${YELLOW}👉 To continue, run the following commands:\${RESET}"
${post_user_commands.map((command) => `echo -e "\${BOLD}   ${command}\${RESET}"`).join('\n')}`
            : '';

    return `#!/bin/bash

# Define escape sequences for colors
RED='\\033[0;31m'
GREEN='\\033[0;32m'
BLUE='\\033[0;34m'
CYAN='\\033[0;36m'
YELLOW='\\033[0;33m'
BOLD='\\033[1m'
RESET='\\033[0m'

# URL of the ZIP archive
URL="${zipUrl}"

# the name of the zip file that has been downloaded
ZIP_FILE="${folderName}.zip"

# Hello World, I guess...
echo -e "\${CYAN}\${BOLD}👋 Welcome!\${RESET} Let's get your files ready to go! 🚀"

# Download the zip file
echo -e "\${BLUE}🔗 Downloading from $URL...\${RESET}"
curl -L -o "$ZIP_FILE" "$URL" && echo -e "\${GREEN}✅ Download complete!\${RESET}"

# Unzip the file
echo -e "\${BLUE}📂 Unzipping $ZIP_FILE...\${RESET}"
unzip "$ZIP_FILE" -d ${folderName} && rm "$ZIP_FILE"
echo -e "\${GREEN}✅ Unzipping complete!\${RESET}"${postUserCommands}

# End the script
echo -e "\${GREEN}✅ Goodbye! 👋\${RESET}"`;
}
