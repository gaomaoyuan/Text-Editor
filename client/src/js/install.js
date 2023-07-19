const butInstall = document.getElementById('buttonInstall');

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  butInstall.style.display = 'none';
  if(window.deferredPrompt) {
    const promptEvent = window.deferredPrompt;
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    window.deferredPrompt = null;
    console.log(`User response to the prompt: ${result.outcome}`);
  } else {
    console.error('Deferred prompt not found.');
  }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  window.deferredPrompt = null;
});
