if (typeof yp === 'undefined') var yp = {};

Game.registerMod("YP", {
    info: {
        name: "YouTube Player",
        description: "Adds the ability to use Youtube without leaving the Cookie Clicker tab (Needs a link)"
    },
    init: function() {
        if (l('youtubePlayerMod')) return;

        var modStyles = document.createElement('style');
        modStyles.innerHTML = `
            #youtubePlayerMod {
                position: relative;
                margin: 0;
                padding: 0;
                border: 1px solid #666;
                border-radius: 6px;
                width: 100%;
                height: 400px;
                background: #111;
                overflow: hidden;
            }
            #youtubeIframe {
                width: 100%;
                height: 100%;
                border: none;
                display: block;
            }
            #youtubePlayerOverlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%);
                color: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: monospace;
                text-align: center;
                z-index: 10;
                padding: 25px;
                opacity: 1;
                transition: opacity 0.5s ease;
                text-shadow: 0px 0px 6px #000, 0px 0px 10px #000;
            }
            .youtube-input-form {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;
                width: 100%;
                max-width: 480px;
                margin-top: 10px;
            }
            .youtube-input-form input {
                flex: 1;
                padding: 10px 12px;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid #999;
                border-radius: 4px;
                color: #fff;
                font-family: monospace;
                font-size: 15px;
                box-sizing: border-box;
                outline: none;
                transition: border 0.2s ease, background 0.2s ease;
            }
            .youtube-input-form input:focus {
                border-color: #fff;
                background: rgba(255, 255, 255, 0.15);
            }
            .youtube-input-form input::placeholder {
                color: #bbb;
            }
            .youtube-button {
                padding: 10px 18px;
                background: #333;
                color: #fff;
                border: 1px solid #777;
                border-radius: 4px;
                cursor: pointer;
                font-family: monospace;
                font-size: 15px;
                text-decoration: none;
                transition: background 0.2s ease, border 0.2s ease;
            }
            .youtube-button:hover {
                background: #555;
                border-color: #aaa;
            }
            .youtube-title {
                font-size: 26px;
                margin-bottom: 15px;
                font-weight: bold;
            }
            .youtube-message {
                margin-bottom: 15px;
                font-size: 14px;
                opacity: 0.9;
            }
        `;
        document.head.appendChild(modStyles);

        var youtubeDiv = document.createElement('div');
        youtubeDiv.id = 'youtubePlayerMod';

        var iframe = document.createElement('iframe');
        iframe.id = 'youtubeIframe';
        iframe.src = '';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;

        var overlay = document.createElement('div');
        overlay.id = 'youtubePlayerOverlay';

        var title = document.createElement('div');
        title.className = 'youtube-title';
        title.innerHTML = 'YouTube Player';

        var message = document.createElement('div');
        message.className = 'youtube-message';
        message.innerText = 'Enter a YouTube video link and click Play.';

        var inputForm = document.createElement('div');
        inputForm.className = 'youtube-input-form';

        var linkPrompt = document.createElement('input');
        linkPrompt.type = 'text';
        linkPrompt.placeholder = 'Paste YouTube link...';

        var submitButton = document.createElement('a');
        submitButton.className = 'youtube-button';
        submitButton.innerText = 'Play';

        var changeButton = document.createElement('a');
        changeButton.className = 'youtube-button';
        changeButton.innerText = 'Change Video';
        changeButton.style.display = 'none';
        changeButton.style.marginTop = '15px';

        function playVideo() {
            let link = linkPrompt.value;
            if (!link) {
                message.innerText = "Please enter a valid YouTube link.";
                return;
            }

            let videoId = '';
            try {
                let url = new URL(link);
                if (url.hostname.includes("youtube.com")) {
                    if (url.pathname.startsWith('/shorts/')) videoId = url.pathname.split('/')[2];
                    else videoId = url.searchParams.get("v");
                } else if (url.hostname.includes("youtu.be")) {
                    videoId = url.pathname.split('/')[1];
                }
            } catch (err) {
                videoId = '';
            }

            if (!videoId) {
                message.innerText = "Invalid YouTube link. Please try again.";
                return;
            }

            iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
                changeButton.style.display = 'inline-block';
            }, 500);
        }

        function showInputForm() {
            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            message.innerText = "Enter a YouTube video link and click Play.";
            linkPrompt.value = '';
            changeButton.style.display = 'none';
        }

        AddEvent(submitButton, 'click', playVideo);
        AddEvent(changeButton, 'click', showInputForm);

        inputForm.appendChild(linkPrompt);
        inputForm.appendChild(submitButton);

        overlay.appendChild(title);
        overlay.appendChild(message);
        overlay.appendChild(inputForm);

        youtubeDiv.appendChild(iframe);
        youtubeDiv.appendChild(overlay);
        youtubeDiv.appendChild(changeButton);

        var buildingsContainer = l('buildingsMaster');
        var centerArea = l('centerArea');
        if (buildingsContainer && centerArea) {
            centerArea.insertBefore(youtubeDiv, buildingsContainer.nextSibling);
        }
    }
});
