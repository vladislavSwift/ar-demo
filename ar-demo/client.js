const modelViewer = document.getElementById('mv');
const arBtn = document.getElementById('arBtn');

// List of avatars
const avatars = [
  'assets/avatar01.usdz',
  'assets/avatar02.usdz',
  'assets/avatar03.usdz',
  'assets/avatar04.usdz',
  'assets/avatar05.usdz',
  'assets/avatar06.usdz',
  'assets/avatar07.usdz',
  'assets/avatar08.usdz',
  'assets/avatar09.usdz',
  'assets/avatar10.usdz',
  'assets/avatar11.usdz',
  'assets/avatar12.usdz'
  'assets/avatar13.usdz'
  'assets/avatar14.usdz'
];

// Choose random avatar
function getRandomAvatar() {
  const index = Math.floor(Math.random() * avatars.length);
  return avatars[index];
}

// AR button
arBtn.addEventListener('click', async () => {
  // Force model-viewer AR mode
  modelViewer.enterAR();

  // Once AR is loaded, place the island
  modelViewer.addEventListener('ar-status', () => {
    if (modelViewer.ar) {
      // Add island inside portal
      const island = document.createElement('model-viewer');
      island.src = 'assets/island.usdz';
      island.iosSrc = 'assets/island.usdz';
      island.setAttribute('scale', '0.5 0.5 0.5'); // adjust scale
      island.setAttribute('position', '0 0 0'); // relative to portal
      modelViewer.appendChild(island);

      // Add avatar on top of island
      const avatar = document.createElement('model-viewer');
      avatar.src = getRandomAvatar();
      avatar.iosSrc = getRandomAvatar();
      avatar.setAttribute('scale', '0.3 0.3 0.3'); // adjust avatar size
      avatar.setAttribute('position', '0 0 0'); // center of island
      avatar.setAttribute('animation-name', 'idle'); // optional if animation exists
      avatar.setAttribute('reveal', 'interaction');

      // Tap to animate
      avatar.addEventListener('click', () => {
        avatar.animationName = 'dance'; // or 'wave' if your USDZ supports it
        avatar.play();
      });

      modelViewer.appendChild(avatar);
    }
  });
});
