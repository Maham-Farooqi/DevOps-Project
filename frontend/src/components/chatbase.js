export const initializeChatbase = (current_user) => {
    if (typeof window !== "undefined") {
      const crypto = window.crypto || window.msCrypto; // Web Crypto API (for browsers)
  
      const secret = "zierevwln5pa8r5pbw4a2bgo6zrzi89m"; // Your secret key, should be kept safe on the server
    //   const userId = current_user.id;
  
      const encoder = new TextEncoder();
      const data = encoder.encode(secret);
  
      // Hash userId with Web Crypto API
      crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
        const hash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex string

        window.chatbaseUserConfig = {
        //   user_id: userId,
          user_hash: hash, 
          user_metadata: {
            "name": "Maham",
            "email": "k224831@nu.edu.pk",
            "company": "mahan",
          }
        };
  
        // Embed Chatbase script dynamically and handle errors
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "zC2XUBQwjoj_0lTOYC18m";
        script.domain = "www.chatbase.co";
        script.onload = () => {
          // Ensure chatbase is initialized only after the script has loaded
          if (window.chatbase) {
            console.log("Chatbase successfully initialized.");
          } else {
            console.error("Chatbase initialization failed.");
          }
        };
  
        script.onerror = (e) => {
          console.error("Failed to load Chatbase script", e);
        };
  
        document.body.appendChild(script);
  
        // Add initialization code to ensure chatbase is set up after loading
        const chatbaseInitScript = document.createElement("script");
        chatbaseInitScript.innerHTML = `
          (function() {
            if (!window.chatbase || window.chatbase("getState") !== "initialized") {
              window.chatbase = (...arguments) => {
                if (!window.chatbase.q) { window.chatbase.q = []; }
                window.chatbase.q.push(arguments);
              };
              window.chatbase = new Proxy(window.chatbase, {
                get(target, prop) {
                  if (prop === "q") { return target.q; }
                  return (...args) => target(prop, ...args);
                }
              });
            }
  
            const onLoad = function() {
              const script = document.createElement("script");
              script.src = "https://www.chatbase.co/embed.min.js";
              script.id = "zC2XUBQwjoj_0lTOYC18m";
              script.domain = "www.chatbase.co";
              document.body.appendChild(script);
            };
  
            if (document.readyState === "complete") {
              onLoad();
            } else {
              window.addEventListener("load", onLoad);
            }
          })();
        `;
        document.body.appendChild(chatbaseInitScript);
      });
    }
  };
  