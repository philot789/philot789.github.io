'use strict';
// Store availability is deliberately explicit: never guess from device type or redirect visitors.
(async function () {
  try {
    const response = await fetch('assets/spatial-risk-lab/release-links.json', {cache: 'no-cache'});
    if (!response.ok) return;
    const data = await response.json();
    for (const [platform, host, label] of [
      ['ios', 'apps.apple.com', 'Download on the App Store'],
      ['android', 'play.google.com', 'Get it on Google Play']
    ]) {
      const release = data[platform];
      if (!release || release.available !== true) continue;
      const url = new URL(release.url);
      if (url.protocol !== 'https:' || url.hostname !== host) continue;
      const link = document.createElement('a');
      link.className = 'srl-store-button';
      link.id = platform + '-store';
      link.href = url.href;
      link.textContent = label;
      document.getElementById(link.id).replaceWith(link);
      document.getElementById(platform + '-status').textContent = 'Available now';
    }
    if (data.androidTest && data.androidTest.optInUrl) {
      const url = new URL(data.androidTest.optInUrl);
      if (url.protocol === 'https:' && url.hostname === 'play.google.com' && url.pathname.startsWith('/apps/testing/')) {
        const link = document.getElementById('android-test');
        link.href = url.href;
        link.hidden = false;
        document.querySelector('#android-beta p').textContent = 'Join the testing group first, then use the test link below with the same Google account. Group membership alone does not enrol you in the test.';
        const group = document.createElement('a');
        group.href = 'https://groups.google.com/g/spatialrisklab';
        group.textContent = 'Join the testing group';
        const paragraph = document.createElement('p');paragraph.append(group);
        link.before(paragraph);
      }
    }
  } catch (_) {
    // The static page and QR code remain useful without script or a working config request.
  }
})();
