chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    const formatGoogleDate = function(date) {
      return moment(date).format('YMMDDTHHmm00');
    };

    const eventDateArr = document
      .querySelectorAll('.uiList ._5xhk')[0]
      .getAttribute('content')
      .split(' to ');

    const eventTitle = encodeURIComponent(
      document.getElementById('seo_h1_tag').innerText
    );
    const eventStart = formatGoogleDate(eventDateArr[0]);
    const eventEnd = eventDateArr[1]
      ? formatGoogleDate(eventDateArr[1])
      : formatGoogleDate(moment(eventDateArr[0]).add(1, 'hours'));
    const eventDetails = encodeURIComponent(
      document.querySelectorAll(
        '[data-testid="event-permalink-details"] span'
      )[0].innerText
    );
    const eventUrl = window.location.href;
    const eventDetailParam = `Source:%20${eventUrl}%0A%0A${eventDetails}`;
    const eventLocation = `${document
      .querySelectorAll('.uiGrid ._5xhk')[1]
      .textContent.replace(/ /g, '+')},+${document
      .querySelectorAll('.uiGrid ._5xhp')[1]
      .textContent.replace(/ /g, '+')}`;
    const eventAddUrl = `https://calendar.google.com/calendar/r/eventedit?text=${eventTitle}&dates=${eventStart}/${eventEnd}&details=${eventDetailParam}&location=${eventLocation}&sf=true&output=xml&ctz=America/New_York`;

    chrome.runtime.sendMessage({ message: 'open_new_tab', url: eventAddUrl });
  }
});
