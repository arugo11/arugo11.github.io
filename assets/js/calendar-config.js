document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek",
    },
    views: {
      dayGridMonth: {
        titleFormat: { year: "numeric", month: "long" },
      },
    },
    validRange: {
      start: new Date(),
      end: new Date().setMonth(new Date().getMonth() + 3),
    },
    themeSystem: "bootstrap5",
    height: "auto",
    firstDay: 0,
    locale: "ja",
    buttonText: {
      today: "今日",
      month: "月",
      week: "週",
    },
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    events: [
      {
        title: "サンプル予定",
        start: "2024-11-21T13:00:00",
        end: "2024-11-21T15:00:00",
        location: "オンライン",
        description: "これはサンプルの予定です",
        color: "#4A3D39",
      },
    ],
    eventColor: "#4A3D39",
    eventTextColor: "#FFFFFF",
    dayMaxEvents: true,
    eventClick: function (info) {
      var modal = document.getElementById("eventModal");
      if (!modal) {
        return;
      }

      var titleEl = modal.querySelector(".modal-title");
      if (titleEl) {
        titleEl.textContent = info.event.title;
      }

      var timeText = info.event.start.toLocaleString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      if (info.event.end) {
        timeText +=
          " - " +
          info.event.end.toLocaleString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
      }

      var timeEl = modal.querySelector(".event-time");
      if (timeEl) {
        timeEl.textContent = timeText;
      }

      var locationEl = modal.querySelector(".event-location");
      if (locationEl) {
        if (info.event.extendedProps.location) {
          locationEl.textContent = "場所: " + info.event.extendedProps.location;
          locationEl.style.display = "block";
        } else {
          locationEl.style.display = "none";
        }
      }

      var descriptionEl = modal.querySelector(".event-description");
      if (descriptionEl) {
        if (info.event.extendedProps.description) {
          descriptionEl.textContent = info.event.extendedProps.description;
          descriptionEl.style.display = "block";
        } else {
          descriptionEl.style.display = "none";
        }
      }

      var bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    },
  });
  calendar.render();
});
