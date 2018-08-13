const LINUX_DL_REGEX = /^.+\.AppImage$/
const MACOS_DL_REGEX = /^.+\.dmg$/
const WIN_DL_REGEX = /^.+\.exe$/

$(document).ready(function(){
    $.ajax({
        url: 'https://api.github.com/repos/WesterosCraftCode/ElectronLauncher/releases',
        success: (json) => {
            
            var pre = null;
            var rel = null;

            for(var i=0; i<json.length; i++){
                const ob = json[i];
                // Only operate if not a draft.
                if(ob.draft === false){
                    // If latest prerelease is not yet found.
                    if(pre == null){
                        // Release found first, do not link to obsolete build.
                        if(rel != null){
                            pre = rel;
                            break;
                        }
                        if(ob.prerelease === true){
                            pre = ob;
                        }
                    }
                    // If latest release is not yet found.
                    if(rel == null){
                        if(ob.prerelease === false){
                            rel = ob;
                        }
                    }
                }

                if(rel != null && pre != null){
                    break;
                }
            }

            // If we do not yet have a release available,
            // use the prerelease.
            if(rel == null){
                rel = pre;
            }

            // Do stuff with the release and prerelease.
            //$('#latestReleaseLink').attr('href', rel.html_url);
            //$('#latestPreReleaseLink').attr('href', pre.html_url);

            var preWinDL = null, preMacDL = null, preLinuxDL = null;
            var relWinDL = null, relMacDL = null, relLinuxDL = null;

            for(var i=0; i<pre.assets.length; i++){
                const ob = pre.assets[i];
                if(LINUX_DL_REGEX.test(ob.name)){
                    preLinuxDL = ob.browser_download_url;
                } else if(MACOS_DL_REGEX.test(ob.name)){
                    preMacDL = ob.browser_download_url;
                } else if(WIN_DL_REGEX.test(ob.name)){
                    preWinDL = ob.browser_download_url;
                }
            }
            if(pre === rel){
                relWinDL = preWinDL;
                relMacDL = preMacDL;
                relLinuxDL = preLinuxDL;
            } else {
                for(var i=0; i<rel.assets.length; i++){
                    const ob = rel.assets[i];
                    if(LINUX_DL_REGEX.test(ob.name)){
                        relLinuxDL = ob.browser_download_url;
                    } else if(MACOS_DL_REGEX.test(ob.name)){
                        relMacDL = ob.browser_download_url;
                    } else if(WIN_DL_REGEX.test(ob.name)){
                        relWinDL = ob.browser_download_url;
                    }
                }
            }

            // Platform download links

            console.log(preWinDL, preMacDL, preLinuxDL)
            console.log(relWinDL, relMacDL, relLinuxDL)
            $('.download-btn').attr('href', relWinDL);
            $('.mac-dl').attr('href', relMacDL);
            $('.lin-dl').attr('href', relLinuxDL);

        },
        timeout: 2500
    });
});